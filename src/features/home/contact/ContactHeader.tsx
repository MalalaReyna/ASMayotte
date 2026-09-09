"use client"
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export function ContactHeader() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="text-sm  text-primary">Contactez-nous</span>
      </div>
      <h2 className="text-h2-mobile md:text-h2 font-bold text-primary mb-4">
        Démarrez votre projet aujourd&apos;hui
      </h2>
      <p className="text-secondary text-base font-light max-w-2xl mx-auto">
        Remplissez le formulaire ci-dessous et recevez une consultation gratuite sous 24h
      </p>
    </motion.div>
  );
}
