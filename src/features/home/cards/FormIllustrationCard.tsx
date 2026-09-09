import { motion, Variants } from "framer-motion"

export default function FormIllustrationCard() {
    const DELAY = 0.1;
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
    return (
        <motion.svg
            width="494"
            height="280"
            viewBox="0 0 494 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath id="cardClip">
                    <rect width="494" height="280" rx="50" />
                </clipPath>
            </defs>
            {/* Fond marron foncé */}
            <rect width="494" height="280" rx="50" fill="#6B3B09" />
            <g clipPath="url(#cardClip)">
                <motion.g
                    variants={parentVariant}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}>
                    <motion.path
                        d="M70 126C70 110.536 82.536 98 98 98H395.969C411.432 98 423.969 110.536 423.969 126V280H70V126Z"
                        fill="#EBE0D6"
                    />
                    {/* Lignes */}
                    {[
                        { x: 87, y: 115, w: 319, },
                        { x: 87, y: 146, w: 123.179 },
                        { x: 216, y: 146, w: 190 },
                        { x: 87, y: 177, w: 201 },
                        { x: 291, y: 177, w: 115 },
                        { x: 89, y: 208, w: 273 },
                        { x: 89, y: 239, w: 69 },
                        { x: 165, y: 239, w: 161 },
                        { x: 333, y: 239, w: 73 },
                        { x: 367, y: 208, w: 39 },
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
                </motion.g>
            </g>
        </motion.svg>
    )
}