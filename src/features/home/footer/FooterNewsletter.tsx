'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <h3 className="font-medium text-primary mb-4">Abonnez-vous à notre newsletter</h3>
      <p className="text-secondary text-sm mb-4">
        Seule ressource valable, sans blabla
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-row w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Saisissez votre adresse e-mail"
          required
          className="p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1 min-w-0"
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-all flex-shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </form>
    </div>
  );
}
