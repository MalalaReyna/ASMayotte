"use client";

import { useMemo, useState } from "react";
import NotificationFilters from "./NotificationFilters";
import NotificationModal from "./NotificationModal";
import NotificationSection from "./NotificationSection";
import { NotificationItem } from "@/types/notification/notificationTypes";
type NotificationListProps = {
  notifications: NotificationItem[];
};

export default function NotificationList({ notifications }: NotificationListProps) {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [items, setItems] = useState<NotificationItem[]>(notifications);
  const [active, setActive] = useState<NotificationItem | null>(null);

  const unreadCount = useMemo(() => items.filter((item) => !item.isRead).length, [items]);

  const filteredItems = useMemo(() => {
    if (filter === "read") return items.filter((item) => item.isRead);
    if (filter === "unread") return items.filter((item) => !item.isRead);
    return items;
  }, [filter, items]);

  const grouped = useMemo(() => {
    return {
      today: filteredItems.filter((item) => item.group === "today"),
      yesterday: filteredItems.filter((item) => item.group === "yesterday"),
      lastWeek: filteredItems.filter((item) => item.group === "lastWeek"),
    };
  }, [filteredItems]);

  const handleSelect = (item: NotificationItem) => {
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)));
    setActive(item);
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#2A1B12]">Notifications</h3>
        <NotificationFilters
          filter={filter}
          onFilterChange={setFilter}
          onMarkAllRead={markAllRead}
          total={items.length}
          unreadCount={unreadCount}
        />
      </div>

      <div className="space-y-3">
        <NotificationSection title="Aujourd'hui" items={grouped.today} onSelect={handleSelect} />
        <NotificationSection title="Hier" items={grouped.yesterday} onSelect={handleSelect} />
        <NotificationSection title="La semaine dernière" items={grouped.lastWeek} onSelect={handleSelect} />
      </div>

      <NotificationModal
        notification={active}
        open={Boolean(active)}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
