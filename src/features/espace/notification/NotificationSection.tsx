import { NotificationItem } from "@/types/notification/notificationTypes";
import NotificationRow from "./NotificationRow";
type NotificationSectionProps = {
  title: string;
  items: NotificationItem[];
  onSelect: (item: NotificationItem) => void;
};

export default function NotificationSection({ title, items, onSelect }: NotificationSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-white">
      <div className="border-b border-[#EFE5DD] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#9A816D]">
        {title}
      </div>
      <div>
        {items.map((item) => (
          <NotificationRow key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
