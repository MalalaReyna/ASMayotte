interface StepContentProps {
  number: number;
  title: string;
  description: string;
  iconBadge: string;
  duration: string;
}

export function StepContent({title, description, iconBadge,duration }: StepContentProps) {
  return (
    <div className="md:-col-span-5 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex-grow">
          <h3 className="text-h3-mobile md:text-h3 font-bold text-primary mb-2">{title}</h3>
          <p className="text-secondary md:text-h5 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-outline bg-opacity-10 px-3 py-1 rounded-full w-fit">
        <img src={iconBadge} alt="Icon Badge" className="w-3 h-3" />
        <span>{duration}</span>
      </div>
    </div>
  );
}
