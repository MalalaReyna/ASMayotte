type NotificationFiltersProps = {
  filter: "all" | "unread" | "read";
  onFilterChange: (value: "all" | "unread" | "read") => void;
  onMarkAllRead: () => void;
  total: number;
  unreadCount: number;
};

export default function NotificationFilters({
  filter,
  onFilterChange,
  onMarkAllRead,
  total,
  unreadCount,
}: NotificationFiltersProps) {
  const options: Array<{ value: "all" | "unread" | "read"; label: string }> = [
    { value: "all", label: `Tout (${total})` },
    { value: "unread", label: `Non lus (${unreadCount})` },
    { value: "read", label: `Lus (${Math.max(total - unreadCount, 0)})` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filter}
        onChange={(event) => onFilterChange(event.target.value as "all" | "unread" | "read")}
        className="rounded-lg border border-[#E8DDD3] bg-[#FBF8F5] px-3 py-2 text-sm text-[#6D5D4E]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onMarkAllRead}
        className="rounded-lg border border-[#E8DDD3] bg-white px-3 py-2 text-sm font-medium text-[#7A430D] hover:bg-[#F6EFE8]"
      >
        Tout marquer comme lu
      </button>
    </div>
  );
}
