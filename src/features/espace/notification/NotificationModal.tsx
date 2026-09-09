"use client";

import { X } from "lucide-react";
import { NotificationItem } from "@/types/notification/notificationTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

type NotificationModalProps = {
  notification: NotificationItem | null;
  open: boolean;
  onClose: () => void;
};

export default function NotificationModal({ notification, open, onClose }: NotificationModalProps) {
  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? undefined : onClose())}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md rounded-3xl border-[#E8DDD3] bg-white p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F6EFE8] text-[#6A4A2C]"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9A816D]">Notification</p>
        <DialogTitle className="mt-2 text-lg font-semibold text-[#2A1B12]">
          {notification.title}
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm text-[#6F5E4C]">
          {notification.description}
        </DialogDescription>
        <p className="mt-4 text-xs text-[#9A816D]">{notification.timeLabel}</p>
      </DialogContent>
    </Dialog>
  );
}
