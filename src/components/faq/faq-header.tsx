"use client"
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
interface FAQHeaderProps {
    title?: string;
    description?: string;
}
export function FAQHeader({ title, description }: FAQHeaderProps) {
    return (
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm text-primary">Questions fréquentes</span>
            </div>
            <h2 className="text-h2-mobile md:text-h2 font-semibold text-primary mb-4">
                {title}
            </h2>
            <p className="text-secondary text-base max-w-2xl mx-auto">
                {description}
            </p>
        </motion.div>
    );
}
