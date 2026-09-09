import { DashboardStat } from "../../../types/dashboard/dashboardTypes";

const accentClasses: Record<DashboardStat["accent"], { bg: string; text: string }> = {
  green: { bg: "bg-[#E9F8EF]", text: "text-[#16A34A]" },
  orange: { bg: "bg-[#FFF5E5]", text: "text-[#D97706]" },
  blue: { bg: "bg-[#EEF2FF]", text: "text-[#4F46E5]" },
  purple: { bg: "bg-[#F3EEFF]", text: "text-[#7C3AED]" },
};

const trendClasses: Record<DashboardStat["trend"], string> = {
  up: "text-[#16A34A]",
  down: "text-[#DC2626]",
  neutral: "text-[#9A816D]",
};

type DashboardStatsProps = {
  items: DashboardStat[];
};

export default function DashboardStats({ items }: DashboardStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const accent = accentClasses[item.accent];
        return (
          <div key={item.id} className="rounded-2xl border border-[#E8DDD3] bg-white px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#9A816D]">
                {item.label}
              </p>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                {item.icon}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-2xl font-semibold text-[#1C1002]">{item.value}</p>
            </div>
            <p className={`mt-2 text-xs font-medium ${trendClasses[item.trend]}`}>{item.helper}</p>
          </div>
        );
      })}
    </div>
  );
}
