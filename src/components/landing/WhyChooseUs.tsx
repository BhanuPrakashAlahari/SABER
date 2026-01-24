import { motion } from 'framer-motion';

const stats = [
    { value: "0s", label: "Setup time" },
    { value: "100%", label: "Direct Access" },
    { value: "No", label: "Cover Letters" },
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 px-8 bg-black border-t border-zinc-900">
            <div className="grid grid-cols-1 gap-12">
                <div className="mb-8">
                    <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-2">Philosophy</h2>
                    <p className="text-xl text-zinc-300 font-light">
                        We believe job hunting shouldn't feel like work. It should be intuitive, transparent, and human.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                        >
                            <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
