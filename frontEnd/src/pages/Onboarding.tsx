import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService, type User } from "../services/auth";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

const Onboarding = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);
    const [missingProviders, setMissingProviders] = useState<string[]>([]);
    const hasCalledLink = useRef(false);
    const isMounted = useRef(true);

    // Helper to determine what is missing
    const calculateMissing = (userData: User): string[] => {
        // Backend might not return auth_provider, so we fallback to what we stored during Login
        const provider = userData.auth_provider || localStorage.getItem('auth_provider');

        // If we don't know the provider, we can't determine what's missing, so we assume EVERYTHING is missing or we block.
        // Returning empty array would cause redirect. Returning dummy string prevents redirect.
        if (!provider) return ['unknown_provider_wait'];

        const linked = userData.linked_providers || [];

        // The provider we logged in with is implicitly "linked"
        const effectiveLinked = provider ? [...linked, provider] : linked;

        let required: string[] = [];

        if (provider === 'google') {
            required = ['github', 'linkedin'];
        } else if (provider === 'github') {
            required = ['linkedin'];
        } else if (provider === 'linkedin') {
            required = ['github'];
        }

        // Filter out ones that are already linked
        return required.filter(p => !effectiveLinked.includes(p));
    };

    // Handle OAuth Linking Callback
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (code && state && state.endsWith("_link") && !hasCalledLink.current) {
            hasCalledLink.current = true;
            const provider = state.replace("_link", "");
            handleLinkProvider(provider, code);
        }
    }, [location]);

    // Verify session on mount
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const userData = await authService.me();
                if (!isMounted.current) return;
                setUser(userData);

                // CRITICAL: Ensure we persist the auth provider if the backend gives it to us
                if (userData.auth_provider) {
                    localStorage.setItem('auth_provider', userData.auth_provider);
                }

                const missing = calculateMissing(userData);
                setMissingProviders(missing);

                // If nothing missing, we can proceed
                if (missing.length === 0) {
                    navigate("/feed");
                }
            } catch (e) {
                console.error("Failed to fetch user:", e);
                setError("Failed to load session. Please refresh.");
            } finally {
                if (isMounted.current) setIsLoading(false);
            }
        };
        verifyUser();

        return () => { isMounted.current = false; };
    }, []);

    const handleLinkProvider = async (provider: string, code: string) => {
        setIsLoading(true);
        setError(null);
        window.history.replaceState({}, document.title, window.location.pathname);

        try {
            const redirectUri = "https://saber-api-backend.vercel.app/api/auth/oauth/callback";
            await authService.linkProvider(provider, code, redirectUri);
            setSuccessMessage(`Successfully linked ${provider}!`);

            // Re-evaluate
            const updatedUser = await authService.me();
            setUser(updatedUser);
            const missing = calculateMissing(updatedUser);
            setMissingProviders(missing);

            if (missing.length === 0) {
                setTimeout(() => navigate("/feed"), 1500);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || `Failed to link ${provider}`);
        } finally {
            setIsLoading(false);
        }
    };

    const initiateLink = (provider: string) => {
        const redirectUri = "https://saber-api-backend.vercel.app/api/auth/oauth/callback";
        const state = `${provider}_link`;
        let authUrl = "";

        if (provider === "github") {
            const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || "Ov23lijOpMktUNXB6FYD";
            const scope = "read:user user:email public_repo";
            authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;
        } else if (provider === "linkedin") {
            const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || "86v3erqkn6uuka";
            const scope = "openid profile email";
            const responseType = "code";
            authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;
        }

        if (authUrl) window.location.href = authUrl;
    };

    // Determine which buttons to show using consistent logic
    const authProvider = user?.auth_provider || localStorage.getItem('auth_provider');
    const linkedProviders = user?.linked_providers || [];
    // Ensure we count the auth provider as linked
    const isLinked = (p: string) => linkedProviders.includes(p) || authProvider === p || localStorage.getItem(p + '_linked') === 'true';

    const isGoogleLogin = authProvider === 'google';

    // Show buttons if they are required by the logic (even if already linked, so we can show 'Connected' state)
    // Google -> Github + LinkedIn
    // Github -> LinkedIn
    // LinkedIn -> Github
    const showGithub = isGoogleLogin || authProvider === 'linkedin';
    const showLinkedin = isGoogleLogin || authProvider === 'github';

    const isGithubLinked = isLinked('github');
    const isLinkedinLinked = isLinked('linkedin');

    // --- UI STATE FOR STORIES ---
    const [currentStep, setCurrentStep] = useState(0);

    // Determine sequence of steps based on requirements
    // If showGithub && showLinkedin -> [Github, LinkedIn]
    // If only one -> [ThatOne]

    // We compute this derived state:
    const steps = [];
    if (showGithub) steps.push('github');
    if (showLinkedin) steps.push('linkedin');

    const activeProvider = steps[currentStep];

    const isCurrentLinked = activeProvider === 'github' ? isGithubLinked : isLinkedinLinked;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            // If we are at the end, and everything is linked, we should be redirecting automatically via the effect.
            // But if we are legally allowed to proceed (maybe logic is checking), we wait.
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-purple-900/20 via-zinc-900/10 to-transparent blur-3xl pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center items-center w-full px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm"
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                            {steps.length > 1 ? `Step ${currentStep + 1} of ${steps.length}` : 'Final Step'}
                        </h1>
                        <p className="text-zinc-500">
                            {missingProviders.length > 0 ? "Connect your accounts to verify skills." : "All set! verified."}
                        </p>
                    </div>

                    {/* Progress Bar (Story style) */}
                    {steps.length > 1 && (
                        <div className="flex gap-2 mb-8">
                            {steps.map((_, idx) => (
                                <div key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${idx <= currentStep ? 'bg-white' : 'bg-zinc-800'}`} />
                            ))}
                        </div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    {isLoading && !successMessage && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                            <p className="text-zinc-600 text-sm tracking-wide">CONNECTING...</p>
                        </div>
                    )}

                    {!isLoading && activeProvider === 'github' && (
                        <motion.div
                            key="github-card"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <button
                                onClick={() => !isGithubLinked && initiateLink("github")}
                                disabled={isGithubLinked}
                                className={`w-full group relative h-20 rounded-2xl border flex items-center justify-between px-6 transition-all duration-300 ${isGithubLinked
                                    ? "bg-green-500/10 border-green-500/20 cursor-default"
                                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isGithubLinked ? 'bg-green-500/20 text-green-500' : 'bg-black text-white'}`}>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                    <span className={`font-medium ${isGithubLinked ? 'text-green-500' : 'text-zinc-300'}`}>
                                        {isGithubLinked ? 'GitHub Connected' : 'Connect GitHub'}
                                    </span>
                                </div>
                                {isGithubLinked ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border border-zinc-700" />
                                )}
                            </button>
                        </motion.div>
                    )}

                    {!isLoading && activeProvider === 'linkedin' && (
                        <motion.div
                            key="linkedin-card"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <button
                                onClick={() => !isLinkedinLinked && initiateLink("linkedin")}
                                disabled={isLinkedinLinked}
                                className={`w-full group relative h-20 rounded-2xl border flex items-center justify-between px-6 transition-all duration-300 ${isLinkedinLinked
                                    ? "bg-green-500/10 border-green-500/20 cursor-default"
                                    : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLinkedinLinked ? 'bg-green-500/20 text-green-500' : 'bg-[#0077b5] text-white'}`}>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                        </svg>
                                    </div>
                                    <span className={`font-medium ${isLinkedinLinked ? 'text-green-500' : 'text-zinc-300'}`}>
                                        {isLinkedinLinked ? 'LinkedIn Connected' : 'Connect LinkedIn'}
                                    </span>
                                </div>
                                {isLinkedinLinked ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border border-zinc-700" />
                                )}
                            </button>
                        </motion.div>
                    )}

                    {/* Next Button - Only appears when current step is complete and there are more steps */}
                    {isCurrentLinked && currentStep < steps.length - 1 && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNext}
                            className="w-full mt-6 bg-white text-black font-bold h-14 rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            Next
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Onboarding;
