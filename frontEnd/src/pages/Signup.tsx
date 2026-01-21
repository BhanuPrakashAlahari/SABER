import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [otp, setOtp] = useState(['', '', '', '']);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('otp');
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyParams = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation of verification
        console.log("Verified OTP:", otp.join(''));
        navigate('/login'); // Go to login after success
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-8">
            <header className="flex items-center justify-between mb-12">
                <button
                    onClick={() => step === 'otp' ? setStep('details') : navigate('/')}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium tracking-wide text-white uppercase">
                    {step === 'details' ? 'Create Account' : 'Verification'}
                </span>
                <div className="w-5" />
            </header>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full"
            >
                {step === 'details' ? (
                    <>
                        <div className="mb-10">
                            <h1 className="text-3xl font-bold tracking-tighter mb-2">Join SABER</h1>
                            <p className="text-zinc-500 font-light">Start your visual career journey today.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSignup}>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-zinc-200 transition-colors mt-4">
                                Create Profile
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-zinc-500 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-white hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter mb-2">Enter OTP</h1>
                            <p className="text-zinc-500 font-light">
                                We sent a code to <span className="text-white">email@domain.com</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerifyParams} className="space-y-8">
                            <div className="flex justify-center gap-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpInputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-14 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-2xl font-bold text-white focus:outline-none focus:border-white/40 focus:bg-zinc-800 transition-all caret-white"
                                    />
                                ))}
                            </div>

                            <button className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                                Verify & Continue
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <div className="text-center">
                                <button type="button" className="text-sm text-zinc-500 hover:text-white transition-colors">
                                    Resend Code
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default Signup;
