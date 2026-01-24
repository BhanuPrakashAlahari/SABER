import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Loader2, Github, Linkedin, DollarSign, MapPin } from 'lucide-react';
import { userService } from '../services/user';
import { authService } from '../services/auth';
import { useAuthStore } from '../store/useAuthStore';

// Helper to check if a provider is connected
const isConnected = (accounts: any[] = [], provider: string) => {
    return accounts?.some(acc => acc.provider === provider);
};

const Onboarding = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, updateUser } = useAuthStore();

    // Determine initial step based on existing data
    // If we have intent but no constraints -> constraints
    // If we have constraints but onboarding is true -> connections
    // Default -> intent
    const getInitialStep = () => {
        if (user?.constraints_json && user?.intent_text) return 'connections';
        if (user?.intent_text) return 'constraints';
        return 'intent';
    };

    const [step, setStep] = useState<'intent' | 'constraints' | 'connections'>(getInitialStep());
    const [loading, setLoading] = useState(false);
    const linkingRef = useRef(false);

    // Intent State
    const [intentText, setIntentText] = useState(user?.intent_text || '');
    const [whyText, setWhyText] = useState(user?.why_text || '');

    // Constraints State
    const [salary, setSalary] = useState(user?.constraints_json?.preferred_salary?.toString() || '');
    const [remoteOnly, setRemoteOnly] = useState(user?.constraints_json?.remote_only || false);
    const [location, setLocation] = useState(user?.constraints_json?.location_preference || '');

    const BACKEND_REDIRECT_URI = "https://saber-api-backend.vercel.app/api/auth/oauth/callback";

    // Handle OAuth Linking Callback
    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (code && state && state.startsWith('link_') && !linkingRef.current) {
            linkingRef.current = true;
            handleLinkProvider(code, state);
        }
    }, [searchParams]);

    const handleLinkProvider = async (code: string, state: string) => {
        const provider = state.replace('link_', '');
        try {
            setLoading(true);
            await authService.linkProvider(provider, code, BACKEND_REDIRECT_URI);

            // Re-fetch user to get updated accounts and onboarding status
            const updatedUser = await authService.getMe();
            updateUser(updatedUser);

            // Clean URL
            navigate('/onboarding', { replace: true });

            // Check if onboarding is complete
            if (!updatedUser.onboarding) {
                navigate('/feed');
            } else {
                setStep('connections');
            }

        } catch (error) {
            console.error("Link failed:", error);
            alert("Failed to link account. Please try again.");
            navigate('/onboarding', { replace: true });
        } finally {
            setLoading(false);
            linkingRef.current = false;
        }
    };

    const handleIntentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.setIntent(intentText, whyText);
            // Optimistic update
            updateUser({ intent_text: intentText, why_text: whyText });
            setStep('constraints');
        } catch (error) {
            console.error("Failed to set intent:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConstraintsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const constraints = {
                preferred_salary: parseInt(salary) || 0,
                remote_only: remoteOnly,
                location_preference: location
            };
            await userService.setConstraints(constraints);

            updateUser({ constraints_json: constraints });
            setStep('connections');
        } catch (error) {
            console.error("Failed to set constraints:", error);
        } finally {
            setLoading(false);
        }
    };

    const initiateOAuth = (provider: string) => {
        const state = provider;
        let authUrl = '';
        const redirectUri = BACKEND_REDIRECT_URI;
        // Use environment variables or hardcode for now based on previous files
        const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const linkedinClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

        if (provider === 'github') {
            const scope = 'read:user user:email public_repo';
            authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;
        } else if (provider === 'linkedin') {
            const scope = 'openid profile email';
            authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${linkedinClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;
        }

        window.location.href = authUrl;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                    <p className="text-zinc-500">Processing update...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
            <header className="absolute top-8 left-8">
                <h1 className="text-xl font-bold tracking-tight uppercase">Saber Signal</h1>
            </header>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md w-full"
            >
                {step === 'intent' && (
                    <form onSubmit={handleIntentSubmit} className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Define your Intent</h2>
                            <p className="text-zinc-500">What are you looking for in your next role?</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-zinc-500 mb-2">My Intent</label>
                                <textarea
                                    required
                                    value={intentText}
                                    onChange={(e) => setIntentText(e.target.value)}
                                    placeholder="e.g. Looking for founding engineer roles in AI/SaaS..."
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-white/20 min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-zinc-500 mb-2">The "Why" (Context)</label>
                                <textarea
                                    required
                                    value={whyText}
                                    onChange={(e) => setWhyText(e.target.value)}
                                    placeholder="e.g. I thrive in 0-to-1 environments..."
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-white/20 min-h-[100px]"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            Next: Constraints <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}

                {step === 'constraints' && (
                    <form onSubmit={handleConstraintsSubmit} className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Hard Constraints</h2>
                            <p className="text-zinc-500">Filter out noise. What are your non-negotiables?</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-zinc-500 mb-2">Minimum Salary (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="number"
                                        required
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder="150000"
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 p-4 text-white focus:outline-none focus:border-white/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wide text-zinc-500 mb-2">Location Preference</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        required
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="San Francisco, New York, etc."
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 p-4 text-white focus:outline-none focus:border-white/20"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl cursor-pointer" onClick={() => setRemoteOnly(!remoteOnly)}>
                                <span className="text-sm font-medium">Remote Roles Only</span>
                                <div className={`w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center transition-colors ${remoteOnly ? 'bg-white border-white' : ''}`}>
                                    {remoteOnly && <Check className="w-4 h-4 text-black" />}
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
                        >
                            Next: Connect Accounts
                        </button>
                    </form>
                )}

                {step === 'connections' && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">Complete your Signal</h2>
                            <p className="text-zinc-500">SABER matches you based on deep signals from your code and network. GitHub & LinkedIn are mandatory.</p>
                        </div>

                        <div className="space-y-4">
                            {/* GitHub Button */}
                            <button
                                onClick={() => !isConnected(user?.oauth_accounts, 'github') && initiateOAuth('github')}
                                disabled={isConnected(user?.oauth_accounts, 'github')}
                                className={`w-full p-5 rounded-xl border flex items-center justify-between transition-all ${isConnected(user?.oauth_accounts, 'github')
                                    ? 'bg-zinc-900/50 border-green-500/50 text-green-400 cursor-default'
                                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Github className="w-6 h-6" />
                                    <div className="text-left">
                                        <div className="font-bold">GitHub</div>
                                        <div className="text-xs text-zinc-500">For code quality analysis</div>
                                    </div>
                                </div>
                                {isConnected(user?.oauth_accounts, 'github') ? <Check className="w-5 h-5" /> : <span className="text-xs font-bold uppercase tracking-wider">Connect</span>}
                            </button>

                            {/* LinkedIn Button */}
                            <button
                                onClick={() => !isConnected(user?.oauth_accounts, 'linkedin') && initiateOAuth('linkedin')}
                                disabled={isConnected(user?.oauth_accounts, 'linkedin')}
                                className={`w-full p-5 rounded-xl border flex items-center justify-between transition-all ${isConnected(user?.oauth_accounts, 'linkedin')
                                    ? 'bg-zinc-900/50 border-green-500/50 text-green-400 cursor-default'
                                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Linkedin className="w-6 h-6" />
                                    <div className="text-left">
                                        <div className="font-bold">LinkedIn</div>
                                        <div className="text-xs text-zinc-500">For professional validation</div>
                                    </div>
                                </div>
                                {isConnected(user?.oauth_accounts, 'linkedin') ? <Check className="w-5 h-5" /> : <span className="text-xs font-bold uppercase tracking-wider">Connect</span>}
                            </button>
                        </div>

                        {!user?.onboarding ? (
                            <button
                                onClick={() => navigate('/feed')}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors mt-8"
                            >
                                Go to Feed
                            </button>
                        ) : (
                            <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-center">
                                <p className="text-xs text-zinc-500 font-mono">
                                    Feed is locked until both connections are verified.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Onboarding;
