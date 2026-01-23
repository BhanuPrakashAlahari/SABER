import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [startZoom, setStartZoom] = useState(false);

    useEffect(() => {
        // Start the zoom effect after a short delay (e.g., loading time)
        const timer = setTimeout(() => {
            setStartZoom(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={
                    startZoom
                        ? { scale: 50, opacity: 0, filter: "blur(20px)" } // Smooth zoom out/fade
                        : { scale: 1, opacity: 1 }   // Normal state
                }
                transition={
                    startZoom
                        ? { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } // Premium cubic-bezier
                        : { duration: 0.8, ease: "easeOut" }
                }
                onAnimationComplete={() => {
                    if (startZoom) {
                        onComplete();
                    }
                }}
                className="flex items-center justify-center"
            >
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden p-4">
                    <img
                        src="/logo.png"
                        alt="SABER Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </motion.div>
        </div>
    );
};
