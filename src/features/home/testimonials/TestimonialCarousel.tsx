'use client';

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
} from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from './testimonialsData';
import { Testimonial } from '@/interfaces/testimonial';

export type TestimonialsCarouselHandle = {
  scroll: (direction: -1 | 1) => void;
  goToIndex?: (index: number) => void;
};

export const TestimonialsCarousel = forwardRef<
  TestimonialsCarouselHandle,
  { testimonials: Testimonial[] }
>(function TestimonialsCarousel({ testimonials }, ref) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gap = 32;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerView(width < 768 ? 1 : 2);

      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = useMemo(() => {
    if (!itemsPerView || !sliderWidth) return 0;
    return (sliderWidth - gap * (itemsPerView - 1)) / itemsPerView;
  }, [itemsPerView, sliderWidth]);

  const step = cardWidth + gap;

  const totalWidth =
    testimonials.length * cardWidth + gap * (testimonials.length - 1);

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

  const goToIndex = (index: number) => {
    if (!step) return;

    const total = testimonials.length;

    // boucle infinie
    const newIndex = (index + total) % total;

    setCurrentIndex(newIndex);

    animate(x, clamp(-newIndex * step), {
      type: 'spring',
      stiffness: 180,
      damping: 28,
    });
  };

  const scroll = (direction: -1 | 1) => {
    goToIndex(currentIndex + direction);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToIndex(currentIndex + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, step]);

  // expose scroll() to the parent
  useImperativeHandle(ref, () => ({
    scroll,
    goToIndex,
  }));

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div ref={sliderRef} className="overflow-hidden">
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          className="flex gap-8 cursor-grab active:cursor-grabbing"
          onDragEnd={() => {
            const snapped = snapToNearest(x.get());
            animate(x, snapped, {
              type: 'spring',
              stiffness: 180,
              damping: 28,
            });
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{ width: cardWidth }}
              className="flex-shrink-0"
            >
              <TestimonialCard testi={testimonial} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});