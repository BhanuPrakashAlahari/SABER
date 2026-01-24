import { motion } from 'framer-motion';

export const GetStarted = () => {
    return (
        <section className="py-24 px-8 bg-black flex flex-col items-center text-center border-t border-zinc-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full"
            >
                <h2 className="text-3xl font-semibold text-white mb-6 tracking-tight">
                    Ready to scroll?
                </h2>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-zinc-100 text-black font-medium text-lg rounded-xl mb-4"
                >
                    Download SABER
                </motion.button>

                <p className="text-zinc-600 text-sm font-light">
                    Available on iOS and Android.
                </p>
            </motion.div>
        </section>
    );
};
