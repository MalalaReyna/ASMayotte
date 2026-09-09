'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQItem } from './faq-item';
import { IFAQItem } from '@/interfaces/faqItem';
interface FAQAccordionProps {
  faqItems: IFAQItem[]
}
export function FAQAccordion({ faqItems }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>("1");

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {(() => {
          const elements = [];
          for (let index = 0; index < faqItems.length; index++) {
            const item = faqItems[index];
            elements.push(
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <FAQItem
                  faqItem={item}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              </motion.div>
            );
          }
          return elements;
        })()}
      </motion.div>
    </motion.div>
  );
}
