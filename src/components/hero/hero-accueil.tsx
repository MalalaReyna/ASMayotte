"use client"
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
interface HeroContentProps {
  title?: string;
  subtitle?: string;
  tags?: React.ReactNode[];
  children: React.ReactNode;
}

export function HeroAccueil({ title, subtitle, tags, children }: HeroContentProps) {
  const badges = ["Mayotte", "La Réunion", "DOM-TOM", "France"];
  return (
    <div className="flex flex-col items-center 2xl:items-start justify-start gap-1.5 px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mt-15">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-primary/20 bg-white/30 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
            >
              • {badge}
            </span>
          ))}
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-h1-mobile sm:text-h1-mobile lg:text-h1 font-bold text-primary text-start text-balance leading-tight max-w-300 not-2xl:text-center">
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

      {/* Tags */}
      {tags && tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex flex-wrap gap-2 mt-4"
        > 
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-lg font-semibold tracking-wide text-primary uppercase"
            >
              • {tag}
            </span>
          ))}
        </motion.div>
      )}

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
