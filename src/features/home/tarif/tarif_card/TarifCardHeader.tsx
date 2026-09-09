'use client';

interface TarifCardHeaderProps {
  badge: string;
  price: number;
  currency?: string;
  description: string;
  subtitle?: string;
  isPopular?: boolean;
}

export function TarifCardHeader({
  badge,
  price,
  currency = '€',
  description,
  isPopular,
  subtitle,
}: TarifCardHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Price Section */}
      <div className={`rounded-4xl p-5 min-h-24 flex flex-col gap-y-10 ${
        isPopular 
          ? 'bg-gradient-to-br from-[#F3B472] to-[#C47727] text-white' 
          : 'bg-gradient-to-br from-outline to-outline/80'
      }`}>
        {/* Badge */}
        <div className="inline-block px-3 w-fit py-1 bg-white rounded-full">
          <span className="text-xs font-medium text-foreground text-primary">{badge}</span>
        </div>
        <div className="flex items-start gap-1">
          <span className={`text-h2 font-bold ${isPopular?'text-white':'text-primary'}`}>{price}</span>
          <span className={`text-xl font-semibold mt-2 ${isPopular?'text-white':'text-primary'}`}>{currency}</span>
        </div>
      </div>
      {/* Description */}
      <div className="space-y-1">
        <p className="text-foreground text-h5">{description}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
