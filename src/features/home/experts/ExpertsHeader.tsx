"use client"
import { motion } from 'framer-motion';

export function ExpertsHeader() {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-h2-mobile md:text-h2 font-semibold mb-4">
        Nos experts à votre service
      </h2>
      <p className="text-dark text-h5 max-w-2xl">
        Une équipe de professionnels certifiés pour vous accompagner dans votre projet
      </p>
    </motion.div>
  );
}
