'use client';

import { IFAQItem } from '@/interfaces/faqItem';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// Utility function to sanitize the question for use as an ID
const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9-_]/g, '');

interface FAQItemProps {
  faqItem: IFAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ faqItem, isOpen, onToggle }: FAQItemProps) {
  const sanitizedId = sanitizeId(faqItem.question);

  return (
    <motion.div
      className="border border-gray-200 rounded-4xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center gap-5 bg-white"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${sanitizedId}`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 flex"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary" aria-hidden="true" />
          ) : (
            <Plus className="w-5 h-5 text-primary" aria-hidden="true" />
          )}
        </motion.div>
        <span className="font-medium text-primary pr-4">{faqItem.question}</span>
        <span className="border bg-outline px-2 py-1 rounded-full ml-auto text-sm text-primary">
          {faqItem.categoryName}
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div
          id={`faq-answer-${sanitizedId}`}
          className="px-10 py-3 bg-gray-50 text-secondary text-sm leading-relaxed"
        >
          {faqItem.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}