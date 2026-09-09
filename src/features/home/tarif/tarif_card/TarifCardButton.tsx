import { Button } from '@/components/ui/button';

interface TarifCardButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export function TarifCardButton({ label, onClick, className }: TarifCardButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-primary hover:bg-primary-800 text-white font-semibold rounded-full h-12 transition-colors"
    >
      {label}
    </Button>
  );
}
