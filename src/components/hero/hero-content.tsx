"use client"
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
interface HeroContentProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}
export function HeroContent({ title, subtitle, children }: HeroContentProps) {
  return (
    <div className="flex flex-col items-center 2xl:items-start justify-start gap-8 px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-h1-mobile sm:text-h1-mobile lg:text-h1 font-bold text-primary text-start text-balance leading-tight pt-10 max-w-300 not-2xl:text-center">
        {title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="font-medium text-h4-mobile sm:text-h4 text-dark text-start leading-relaxed max-w-240 not-2xl:text-center not-2xl:text-balance">
        {subtitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}>
        {children}
      </motion.div>
    </div>
  );
}
