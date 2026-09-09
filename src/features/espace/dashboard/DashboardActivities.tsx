import { ActivityItem } from "../../../types/dashboard/dashboardTypes";

const accentClasses: Record<ActivityItem["accent"], { bg: string; text: string }> = {
  green: { bg: "bg-[#E9F8EF]", text: "text-[#16A34A]" },
  orange: { bg: "bg-[#FFF5E5]", text: "text-[#D97706]" },
  blue: { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" },
};

type DashboardActivitiesProps = {
  items: ActivityItem[];
};

function ActivityRow({ item }: { item: ActivityItem }) {
  const accent = accentClasses[item.accent];
  return (
    <div className="flex items-start gap-3 border-b border-[#F2E9E2] py-3 last:border-b-0">
      <span className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
        ●
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[#2A1B12]">{item.title}</p>
        <p className="text-xs text-[#7A6B5B]">{item.description}</p>
      </div>
      <p className="text-xs text-[#9A816D]">{item.timeLabel}</p>
    </div>
  );
}

export default function DashboardActivities({ items }: DashboardActivitiesProps) {
  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#2A1B12]">Activites recentes</p>
        <button type="button" className="text-xs font-semibold text-[#6B3B09] hover:underline">
          Voir tout
        </button>
      </div>
      <div className="mt-2">
        {items.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
