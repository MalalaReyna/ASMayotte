import { motion, Variants } from "framer-motion";

export default function DocumentOkIllustrationCard() {
    const DELAY = 0.05;

    const parentVariant: Variants = {
        initial: { y: 180, opacity: 0 },
        whileInView: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.1,
                duration: 0.8,
                staggerChildren: DELAY,
            },
        },
    };

    const childrenVariant: Variants = {
        initial: { opacity: 0, y: 20 },
        whileInView: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const transparentVariant: Variants = {
        initial: { opacity: 0, y: 20 },
        whileInView: {
            y: 0,
            opacity: 0.2,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
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
                <clipPath id="docClip" clipPathUnits="userSpaceOnUse">
                    <rect width="494" height="280" rx="50" />
                </clipPath>
            </defs>


            {/* Fond */}
            <rect width="494" height="280" rx="50" fill="#6B3B09" />
            <g clipPath="url(#docClip)">
                <motion.g
                    variants={parentVariant}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                >
                    <motion.path
                        d="M60.2598 142.917C60.2598 134.038 67.489 126.858 76.3674 126.917L415.845 129.202C424.639 129.261 431.737 136.407 431.737 145.202L431.737 279.309H60.2598L60.2598 142.917Z"
                        fill="#9C846D"
                        variants={childrenVariant}
                    />

                    <motion.path
                        d="M110.231 78.9257L407.559 98.464C422.714 99.46 434.192 112.553 433.196 127.708L423.741 271.596L71.5319 248.451L80.9871 104.563C81.983 89.4082 95.076 77.9299 110.231 78.9257Z"
                        fill="#EBE0D6"
                        stroke="white"
                        variants={childrenVariant}
                    />

                    <motion.path
                        d="M87.2763 95.8685L384.891 81.3552C400.061 80.6156 412.958 92.3134 413.698 107.483L420.722 251.51L68.1719 268.702L61.1484 124.675C60.4086 109.506 72.1065 96.6083 87.2763 95.8685Z"
                        fill="#EBE0D6"
                        stroke="white"
                        variants={childrenVariant}
                    />

                    <motion.path
                        d="M98 97.8091H395.969C411.156 97.8092 423.469 110.121 423.469 125.309V278.809H70.5V125.309C70.5 110.121 82.8122 97.8091 98 97.8091Z"
                        fill="#EBE0D6"
                        stroke="white"
                        variants={childrenVariant}
                    />
                    {[
                        { x: 210, y: 114.309, w: 196 },
                        { x: 211, y: 145.309, w: 32 },
                        { x: 251, y: 145.309, w: 155 },
                        { x: 210, y: 176.309, w: 78 },
                        { x: 291, y: 176.309, w: 115 },
                        { x: 211, y: 207.309, w: 151 },
                        { x: 89, y: 238.309, w: 69 },
                        { x: 165, y: 238.309, w: 161 },
                        { x: 333, y: 238.309, w: 73 },
                        { x: 367, y: 207.309, w: 39 },
                    ].map((rect, i) => (
                        <motion.rect
                            key={i}
                            x={rect.x}
                            y={rect.y}
                            width={rect.w}
                            height="24"
                            rx="12"
                            fill="#9C846D"
                            variants={transparentVariant}
                        />
                    ))}

                    <motion.g variants={childrenVariant}>
                        <path
                            d="M118.083 157.309L128.833 168.059L153.917 142.976M164.667 168.059C161.083 171.642 169.146 181.497 164.667 185.976C160.188 190.455 150.333 182.392 146.75 185.976C143.167 189.559 141.375 196.726 136 196.726C130.625 196.726 128.833 189.559 125.25 185.976C121.667 182.392 111.813 190.455 107.333 185.976C102.854 181.497 110.917 171.642 107.333 168.059C103.75 164.476 96.5835 162.684 96.5835 157.309C96.5835 151.934 103.75 150.142 107.333 146.559C110.917 142.976 102.854 133.122 107.333 128.642C111.813 124.163 121.667 132.226 125.25 128.642C128.833 125.059 130.625 117.892 136 117.892C141.375 117.892 143.167 125.059 146.75 128.642C150.333 132.226 160.188 124.163 164.667 128.642C169.146 133.122 161.083 142.976 164.667 146.559C168.25 150.142 175.417 151.934 175.417 157.309C175.417 162.684 168.25 164.476 164.667 168.059Z"
                            stroke="#9C846D"
                            strokeWidth="5.33333"
                        />
                    </motion.g>

                    <motion.path
                        d="M54.3179 198.53C53.6069 189.239 60.9536 181.309 70.2713 181.309H234C240.627 181.309 246 186.682 246 193.309C246 199.936 251.373 205.309 258 205.309H423.192C432.88 205.309 440.346 213.851 439.048 223.452L431.5 279.309H60.5L54.3179 198.53Z"
                        fill="#9C846D"
                        variants={parentVariant}
                    />
                </motion.g>
            </g>
        </motion.svg>
    );
}