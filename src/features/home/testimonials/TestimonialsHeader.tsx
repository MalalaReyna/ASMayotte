"use client"
import { motion } from 'framer-motion';
export function TestimonialsHeader() {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex gap-2 mb-4">
        <span className="text-sm text-primary">Client Feedback</span>
      </div>
      <h2 className="text-h2-mobile md:text-h2 md:text-4xl font-semibold text-foreground mb-4">
        Ils nous font confiance
      </h2>
      <p className="text-secondary text-base max-w-2xl">
        Découvrez les expériences de nos clients qui ont créé leur entreprise avec succès
      </p>
    </motion.div>
  );
}
