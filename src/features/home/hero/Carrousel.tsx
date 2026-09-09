import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CardData {
  id: number;
  title: string;
  subtitle?: string;
}

interface CardsCarouselProps {
  cards?: CardData[];
  autoplayInterval?: number;
  visibleRange?: number;
  className?: string;
}

const defaultCards: CardData[] = [
  { id: 1, title: "Carte 1", subtitle: "Première carte" },
  { id: 2, title: "Carte 2", subtitle: "Deuxième carte" },
  { id: 3, title: "Carte 3", subtitle: "Troisième carte" },
  { id: 4, title: "Carte 4", subtitle: "Quatrième carte" },
  { id: 5, title: "Carte 5", subtitle: "Cinquième carte" },
  { id: 6, title: "Carte 6", subtitle: "Sixième carte" },
  { id: 7, title: "Carte 7", subtitle: "Septième carte" },
];

export function useResponsiveMetrics() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return useMemo(() => {
    const cardW = Math.min(Math.max(width * 0.3, 190), 460);
    const cardH = cardW * 1.25;
    const gapX = cardW * 0.6;
    const stepY = cardH * 0.02;
    const rotateStep = width < 640 ? 3 : 2;
    return { gapX, stepY, cardW, cardH, rotateStep };
  }, [width]);
}

export function getCarrouselStackHeight(
  metrics: { cardH: number; stepY: number },
  visibleRange: number
) {
  return metrics.cardH + metrics.stepY * visibleRange;
}

function wrappedOffset(index: number, activeIndex: number, length: number) {
  let diff = index - activeIndex;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export default function Carrousel({
  cards = defaultCards,
  autoplayInterval = 5000,
  visibleRange = 3,
  className = "",
}: CardsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);
  const metrics = useResponsiveMetrics();
  const count = cards.length;

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!autoplayInterval || isHoveringTrack) return;
    timerRef.current = setInterval(goNext, autoplayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplayInterval, goNext, isHoveringTrack]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 180,
    damping: 24,
    mass: 0.8,
  };

  return (
    <div
      className={`relative max-h-screen w-full flex items-center mt-55 justify-center select-none ${className}`}
      style={{
        height: metrics.stepY * visibleRange - 60,
      }}
      onMouseEnter={() => setIsHoveringTrack(true)}
      onMouseLeave={() => setIsHoveringTrack(false)}
    >
      <div className="relative w-full h-full" style={{ perspective: 1200 }}>
        {cards.map((card, index) => {
          const offset = wrappedOffset(index, activeIndex, count);
          const distance = Math.abs(offset);

          if (distance > visibleRange) return null;

          const isActive = offset === 0;

          const x = offset * metrics.gapX;
          const y = distance * metrics.stepY;
          const scale = Math.max(1 - distance * 0.14, 0.45);
          const rotate =
            offset === 0 ? 0 : (offset < 0 ? -1 : 1) * metrics.rotateStep * distance;
          const opacity = distance > visibleRange - 0.5 ? 0 : 1 - distance * 0.12;
          const zIndex = count - distance;

          return (
            <motion.div
              key={card.id}
              className="absolute top-1/3 left-1/2 cursor-pointer"
              style={{ zIndex }}
              initial={false}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y}px)`,
                scale,
                rotate,
                opacity,
              }}
              transition={springTransition}
              whileHover={{
                scale: scale * 1.06,
                y: `calc(-50% + ${y - 10}px)`,
              }}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={[
                  "rounded-2xl border shadow-xl flex flex-col items-center justify-center text-center p-6",
                  "transition-colors duration-500",
                  isActive
                    ? "bg-white border-neutral-200 shadow-2xl"
                    : "bg-neutral-100 border-neutral-200/70 shadow-md",
                ].join(" ")}
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                }}
              >
                <span
                  className={
                    isActive
                      ? "text-xl font-semibold text-neutral-900"
                      : "text-base font-medium text-neutral-500"
                  }
                >
                  {card.title}
                </span>
                {card.subtitle && (
                  <span
                    className={
                      isActive
                        ? "mt-2 text-sm text-neutral-500"
                        : "mt-2 text-xs text-neutral-400"
                    }
                  >
                    {card.subtitle}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
