import { motion, Variants } from "framer-motion"

export default function JuryIllustrationCard() {
  const DELAY = 0.08
  const parentVariant: Variants = {
    initial: { y: 180, opacity: 0 },
    whileInView: {
      y: 0, opacity: 1, transition: {
        type: "spring",
        bounce: 0.1,
        duration: 0.8, staggerChildren: DELAY
      }
    },
  };
  const childrenVariant: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      y: 0, opacity: 0.2, transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }

  };
  const balanceVariant: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      y: 0, opacity: 0.8, transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }

  };

  return (
    <motion.svg
      width="494"
      height="280"
      viewBox="0 0 494 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="juryClip" clipPathUnits="userSpaceOnUse">
          <rect width="494" height="280" rx="50" />
        </clipPath>
      </defs>

      {/* Fond */}
      <rect width="494" height="280" rx="50" fill="#6B3B09" />
      <g clipPath="url(#juryClip)">
        <motion.g
          variants={parentVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}>
          {/* Carte beige */}
          <motion.path
            d="M70 126C70 110.536 82.536 98 98 98H395.969C411.432 98 423.969 110.536 423.969 126V280H70V126Z"
            fill="#EBE0D6"
          />
          {/* Lignes animées */}
          {[
            { x: 210, y: 115, w: 196, delay: 0.1 },
            { x: 211, y: 146, w: 32, delay: 0.15 },
            { x: 251, y: 146, w: 155, delay: 0.2 },
            { x: 210, y: 177, w: 78, delay: 0.25 },
            { x: 291, y: 177, w: 115, delay: 0.3 },
            { x: 211, y: 208, w: 151, delay: 0.35 },
            { x: 89, y: 239, w: 69, delay: 0.4 },
            { x: 165, y: 239, w: 161, delay: 0.45 },
            { x: 333, y: 239, w: 73, delay: 0.5 },
            { x: 367, y: 208, w: 39, delay: 0.55 },
          ].map((rect, i) => (
            <motion.rect
              key={i}
              x={rect.x}
              y={rect.y}
              width={rect.w}
              height="24"
              rx="12"
              fill="#9C846D"
              variants={childrenVariant}
            />
          ))}

          {/* Balance animée */}
          <motion.g
            variants={balanceVariant}
          >
            <path d="M148.583 145.718C153.329 144.043 157.126 140.246 158.801 135.5H176.5L159.75 174.583C159.75 183.852 168.516 191.333 179.292 191.333C190.067 191.333 198.833 183.852 198.833 174.583L182.083 135.5H187.667C190.75 135.5 193.25 133 193.25 129.917C193.25 126.833 190.75 124.333 187.667 124.333H158.801C156.512 117.801 150.314 113.167 143 113.167C135.686 113.167 129.488 117.801 127.199 124.333H98.3332C95.2496 124.333 92.7498 126.833 92.7498 129.917C92.7498 133 95.2496 135.5 98.3332 135.5H103.917L87.1665 174.583C87.1665 183.852 95.9323 191.333 106.708 191.333C117.484 191.333 126.25 183.852 126.25 174.583L109.5 135.5H127.199C128.874 140.246 132.671 144.043 137.417 145.718V190.364C137.417 200.15 129.483 208.083 119.697 208.083H92.7498C89.6662 208.083 87.1665 210.583 87.1665 213.667C87.1665 216.75 89.6662 219.25 92.7498 219.25H193.25C196.333 219.25 198.833 216.75 198.833 213.667C198.833 210.583 196.333 208.083 193.25 208.083H166.302C156.516 208.083 148.583 200.15 148.583 190.364V145.718ZM189.07 173.039C189.384 173.77 188.848 174.583 188.052 174.583H170.531C169.735 174.583 169.199 173.77 169.513 173.039L179.292 150.24L189.07 173.039ZM116.487 173.039C116.8 173.77 116.264 174.583 115.469 174.583H97.9473C97.1521 174.583 96.6161 173.77 96.9295 173.039L106.708 150.24L116.487 173.039ZM143 135.5C139.929 135.5 137.417 132.988 137.417 129.917C137.417 126.846 139.929 124.333 143 124.333C146.071 124.333 148.583 126.846 148.583 129.917C148.583 132.988 146.071 135.5 143 135.5Z" fill="#9C846D" />

          </motion.g>
        </motion.g>
      </g>
    </motion.svg>
  )
}