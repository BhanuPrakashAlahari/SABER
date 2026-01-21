import { motion } from 'framer-motion';

const features = [
    {
        title: "The Feed",
        description: "Scroll through jobs like stories. Visual, engaging, and fast."
    },
    {
        title: "Instant Apply",
        description: "One tap is all it takes. Your profile does the rest."
    },
    {
        title: "Transparency",
        description: "Salaries and perks shown upfront. No hidden details."
    }
];

export const KeyFeatures = () => {
    return (
        <section className="py-24 px-8 bg-black">
            <div className="space-y-16">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                    >
                        <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-zinc-300 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-zinc-500 text-lg font-light leading-relaxed border-l-2 border-zinc-800 pl-4 group-hover:border-white transition-colors">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
