"use client"
import { motion } from "framer-motion";
import Pattern from "./Pattern";

export function HeroIllustration() {

  return (
    <div className="relative w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center -mb-25 overflow-hidden">

      {/* Left card */}
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute left-1/2 -translate-x-[120%] w-72 h-44 lg:w-96 lg:h-56">
        <Pattern />
      </motion.div>
      {/* Center card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3,delay: 0.8}}
        className="relative z-10 w-72 h-55 lg:w-96 lg:h-80">
        <Pattern />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute left-1/2 translate-x-[20%] w-72 h-44 lg:w-96 lg:h-56">
        {/* Right card */}
        <Pattern />
      </motion.div>
    </div>
  );
}