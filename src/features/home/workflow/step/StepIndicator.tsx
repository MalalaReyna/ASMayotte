export default function StepIndicator({ number }: { number: number }) {
  return (
    <div className="flex flex-col items-center h-full justify-center md:justify-start">
      <div className="w-13 h-13 md:w-15 not-md:border-5 not-md:absolute not-md:translate-y-[30%] not-md:-left-12 md:h-15 rounded-full z-10 bg-outline text-primary flex items-center justify-center font-bold text-sm border-10 border-white hover:bg-primary/90 hover:text-outline">
        {String(number).padStart(2, "0")}
      </div>
    </div>
  );
}