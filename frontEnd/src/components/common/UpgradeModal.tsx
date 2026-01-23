import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Zap, Crown } from 'lucide-react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { toast } from 'react-hot-toast';

interface UpgradeModalProps {
    onClose: () => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const UpgradeModal = ({ onClose }: UpgradeModalProps) => {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState<string | null>(null);

    const handleBuyPlan = async (plan: 'premium' | 'pro') => {
        try {
            setLoading(plan);

            // 1. Create Order
            const { data } = await api.post('/payments/create-order', { plan });

            // 2. Open Razorpay
            const options = {
                key: data.key_id,
                amount: data.amount,
                currency: "INR",
                name: "SABER",
                description: `Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
                order_id: data.order_id,
                handler: async function (response: any) {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await api.post('/payments/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            plan: plan
                        });

                        if (verifyRes.data.success) {
                            toast.success("Upgrade Successful! You're good to go.");
                            onClose();
                        }
                    } catch (verifyError) {
                        console.error("Payment verification failed", verifyError);
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email
                },
                theme: { color: "#10b981" }, // Emerald color
                modal: {
                    ondismiss: () => {
                        setLoading(null);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast.error(response.error.description || "Payment failed");
                setLoading(null);
            });
            rzp.open();

        } catch (error) {
            console.error("Failed to initiate payment", error);
            toast.error("Failed to initiate payment. Please try again.");
            setLoading(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-[#121212] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative"
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 text-center border-b border-white/5">
                    <h2 className="text-3xl font-bold text-white mb-2">Unlock More Swipes</h2>
                    <p className="text-zinc-400">You've reached your daily limit. Upgrade to keep connecting.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                    {/* Premium Plan */}
                    <div className="relative p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors flex flex-col">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Zap className="w-24 h-24 rotate-12" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Premium</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-white">₹20</span>
                            <span className="text-zinc-500 text-sm">/ day</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-zinc-300">
                                <span className="bg-emerald-500/10 text-emerald-500 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                50 Applications / Day
                            </li>
                            <li className="flex items-center gap-2 text-sm text-zinc-300">
                                <span className="bg-emerald-500/10 text-emerald-500 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                Priority Support
                            </li>
                        </ul>

                        <button
                            onClick={() => handleBuyPlan('premium')}
                            disabled={!!loading}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading === 'premium' ? 'Processing...' : 'Get Premium'}
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative p-6 bg-gradient-to-b from-emerald-900/10 to-transparent border border-emerald-500/20 rounded-2xl flex flex-col">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/20">
                            Best Value
                        </div>
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Crown className="w-24 h-24 rotate-12 text-emerald-500" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-3xl font-bold text-white">₹50</span>
                            <span className="text-zinc-500 text-sm">/ day</span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-zinc-300">
                                <span className="bg-emerald-500/10 text-emerald-500 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                100 Applications / Day
                            </li>
                            <li className="flex items-center gap-2 text-sm text-zinc-300">
                                <span className="bg-emerald-500/10 text-emerald-500 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                Priority Matching
                            </li>
                            <li className="flex items-center gap-2 text-sm text-zinc-300">
                                <span className="bg-emerald-500/10 text-emerald-500 p-1 rounded-full"><Check className="w-3 h-3" /></span>
                                Profile Highlight
                            </li>
                        </ul>

                        <button
                            onClick={() => handleBuyPlan('pro')}
                            disabled={!!loading}
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading === 'pro' ? 'Processing...' : 'Get Pro'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
