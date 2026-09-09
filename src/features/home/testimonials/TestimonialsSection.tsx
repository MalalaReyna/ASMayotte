"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { TestimonialsCarouselHandle, TestimonialsCarousel } from "./TestimonialCarousel";
import { TestimonialsHeader } from "./TestimonialsHeader";
import { Testimonial } from "@/interfaces/testimonial";

export function TestimonialsSection({testi}:{testi:Testimonial[]}) {
  const carouselRef = useRef<TestimonialsCarouselHandle | null>(null);

  return (
    <article
      className="py-16 sm:py-20 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto"
      aria-labelledby="testimonials-heading"
      id="temoignage"
    >
      {/* Top layout */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/3">
          <TestimonialsHeader />
        </div>

        <div className="md:w-2/3 w-full">
          <TestimonialsCarousel testimonials={testi} ref={carouselRef} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-start gap-4 mt-8 md:-mt-6">
        <Button
          type="button"
          onClick={() => carouselRef.current?.scroll(-1)}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <Button
          type="button"
          onClick={() => carouselRef.current?.scroll(1)}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </article>
  );
}