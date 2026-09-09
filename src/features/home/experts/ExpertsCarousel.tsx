'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExpertCard } from './ExpertCard';
import { Button } from '@/components/ui/button';
import { IExpert } from '@/interfaces/expert';

export function ExpertsCarousel({experts}:{experts : IExpert[]}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gap = 32;

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768 || experts.length == 1) {
        setItemsPerView(1);
      } else if (width < 1024 || experts.length == 2) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }

      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card width
  const cardWidth = useMemo(() => {
    if (!itemsPerView || !sliderWidth) return 0;
    return (sliderWidth - gap * (itemsPerView - 1)) / itemsPerView;
  }, [itemsPerView, sliderWidth]);

  const step = cardWidth + gap;

  const totalWidth =
    experts.length * cardWidth + gap * (experts.length - 1);

  const maxDrag = Math.max(totalWidth - sliderWidth, 0);

  const clamp = (v: number) => {
    if (v > 0) return 0;
    if (v < -maxDrag) return -maxDrag;
    return v;
  };

  const snapToNearest = (rawX: number) => {
    if (!step) return 0;
    const index = Math.round(-rawX / step);
    return clamp(-index * step);
  };

  // Infinite loop logic
  const goToIndex = (index: number) => {
    if (!step) return;

    const total = experts.length;

    const newIndex = (index + total) % total;

    setCurrentIndex(newIndex);

    animate(x, clamp(-newIndex * step), {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    });
  };

  const scroll = (direction: -1 | 1) => {
    goToIndex(currentIndex + direction);
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      goToIndex(currentIndex + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, step]);

  return (
    <div className="w-full">
      <div ref={sliderRef} className="overflow-hidden">
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          className="flex gap-8 cursor-grab active:cursor-grabbing"
          onDragEnd={() => {
            const snapped = snapToNearest(x.get());
            const index = Math.round(-snapped / step);
            setCurrentIndex(index);
            animate(x, snapped, {
              type: 'spring',
              stiffness: 200,
              damping: 30,
            });
          }}
        >
          {experts.map((expert, index) => (
            <div
              key={index}
              style={{ width: cardWidth }}
              className="flex-shrink-0"
            >
              <ExpertCard expert={expert}/>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          onClick={() => scroll(-1)}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => scroll(1)}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}