"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@/components/ui/dialog";

type CrudModalHeaderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function CrudModalHeader({
  icon: Icon,
  title,
  description,
  className,
}: CrudModalHeaderProps) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-primary">
        <Icon size={20} />
      </div>
      <div className="space-y-1">
        <DialogTitle className="text-xl font-semibold text-dark">{title}</DialogTitle>
        <p className="text-sm text-secondary">{description}</p>
      </div>
    </div>
  );
}
