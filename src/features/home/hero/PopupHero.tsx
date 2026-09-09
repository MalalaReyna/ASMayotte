"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";

export function PopupHero() {
  const [visible, setVisible] = useState(true);

  const arrowVariants = {
  initial: { x: 0 },
  animate: { x: 5 } 
};

  if (!visible) return null;

  return (
    <div className="relative z-40 bg-surface border-b border-outline text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-3 text-sm">
        <div></div>
        <div className="flex items-center gap-2">
            <p className="text-center truncate">
            <span className="hidden sm:inline">Réponse aux marchés publics — </span>
            <span className="font-semibold">A&amp;S Mayotte </span> vous accompagne de l&apos;analyse du
            DCE jusqu&apos;au dépôt de votre offre.
            </p>
            <motion.div
            initial="initial"
            whileHover="animate"
            className="inline-block"
            >
            <Link
                href="/reponse-marche-public"
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-dark text-white px-3 py-1 text-xs font-medium hover:bg-primary transition-colors flex-shrink-0"
            >
                Découvrir 
                
                <motion.div 
                variants={arrowVariants} 
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                <ArrowRight className="size-3" />
                </motion.div>
            </Link>
            </motion.div>
        </div>
        <button
          aria-label="Fermer le bandeau"
          onClick={() => setVisible(false)}
          className="shrink-0 text-secondary hover:text-dark transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
