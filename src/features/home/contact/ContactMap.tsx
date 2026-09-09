'use client';

import { motion } from 'framer-motion';

export function ContactMap() {
  return (
    <motion.div
      className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
        <iframe
          title='Localisation As Mayotte'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5059439419806!2d45.19975397483845!3d-12.810549187490192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x220a0d690040bba1%3A0xd0aaa011df9b850!2sCABINET%20AS%20MAYOTTE!5e0!3m2!1sfr!2smg!4v1772695106506!5m2!1sfr!2smg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />
      </div>
    </motion.div>
  );
}
