"use client";

import { NotificationItem } from "@/types/notification/notificationTypes";
import { AlertTriangle, CheckCircle2, FileText, MessageSquareText } from "lucide-react";
type NotificationRowProps = {
  item: NotificationItem;
  onSelect: (item: NotificationItem) => void;
};

function iconForKind(kind: NotificationItem["kind"]) {
  switch (kind) {
    case "success":
      return { icon: CheckCircle2, bg: "bg-[#E9F8EF]", color: "text-[#16A34A]" };
    case "warning":
      return { icon: AlertTriangle, bg: "bg-[#FFF5E5]", color: "text-[#D97706]" };
    case "file":
      return { icon: FileText, bg: "bg-[#EEF2FF]", color: "text-[#4338CA]" };
    default:
      return { icon: MessageSquareText, bg: "bg-[#EEF2FF]", color: "text-[#2563EB]" };
  }
}

export default function NotificationRow({ item, onSelect }: NotificationRowProps) {
  const { icon: Icon, bg, color } = iconForKind(item.kind);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex w-full flex-col items-start justify-between gap-3 border-b border-[#EFE5DD] px-4 py-3 text-left last:border-b-0 hover:bg-[#FCFAF7] sm:flex-row sm:gap-4"
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full ${bg} ${color}`}>
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#2A1B12]">{item.title}</p>
          <p className="text-xs text-[#7A6B5B]">{item.description}</p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-2 text-xs text-[#7A6B5B] sm:w-auto sm:flex-col sm:items-end">
        <span>{item.timeLabel}</span>
        {!item.isRead ? <span className="h-2 w-2 rounded-full bg-[#4F46E5]" /> : null}
      </div>
    </button>
  );
}
