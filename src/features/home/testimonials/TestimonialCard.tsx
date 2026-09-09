import { Testimonial } from '@/interfaces/testimonial';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  testi: Testimonial
}

export function TestimonialCard({ testi }: TestimonialCardProps) {
  return (
    <div
      className="bg-surface rounded-lg p-6 border border-none h-full flex flex-col justify-between"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testi.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-primary text-primary"
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="text-dark text-sm leading-relaxed mb-6 flex-grow">
        {testi.comment}
      </p>

      <div className="flex items-center gap-3">
        <Image
          src={testi.imageUrl || "https://png.pngtree.com/png-vector/20250512/ourmid/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png"}
          alt={testi.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
          unoptimized
        />
        <div>
          <p className="font-semibold text-foreground text-sm">{testi.name}</p>
          <p className="text-secondary text-xs">{testi.occupation}</p>
        </div>
      </div>
    </div>
  );
}
