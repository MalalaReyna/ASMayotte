import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type LegalFormCardProps = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export default function LegalFormCard({ title, href, icon: Icon }: LegalFormCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-outline bg-surface p-5 md:p-6 flex items-center justify-between gap-4 hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-primary opacity-30">
          <Icon size={40}/>
        </span>
        <span className="text-base md:text-lg font-semibold text-foreground ">{title}</span>
      </div>

      <ArrowRight
        size={18}
        className="text-primary shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}