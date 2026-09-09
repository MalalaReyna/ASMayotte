import { InfoIcon } from "lucide-react";

interface PublicTenderFooterProps {
  description: string;
}
export default function PublicTenderFooter({ description }: PublicTenderFooterProps) {
  return (
    <div className="mt-6 rounded-3xl border border-outline bg-surface p-5">
      <div className="flex gap-x-2">
        <InfoIcon size={20} className="text-primary" />
        <p className="text-sm font-semibold text-dark">Conseil A&S Mayotte</p>
      </div>
      <p className="mt-2 text-sm text-secondary">
        {description}
      </p>
    </div>
  );
}