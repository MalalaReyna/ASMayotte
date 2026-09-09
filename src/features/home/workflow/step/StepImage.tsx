/* import Image from "next/image";

interface StepImageProps {
  alt: string;
  image: string;
}

export function StepImage({ alt, image }: StepImageProps) {
  return (
    <Image
      src={image}
      alt={alt}
      className="w-full h-auto rounded-lg object-cover"
      width={400}
      height={300}
    />
  );
} */


interface StepImageProps {
  children?: React.ReactNode;
}

export function StepImage({ children }: StepImageProps) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}
