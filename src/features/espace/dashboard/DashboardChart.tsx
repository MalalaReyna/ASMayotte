"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardChartPoint } from "../../../types/dashboard/dashboardTypes";

type DashboardChartProps = {
  yearly: DashboardChartPoint[];
  monthly: DashboardChartPoint[];
  daily: DashboardChartPoint[];
};

const periodOptions = [
  { value: "yearly", label: "Annuel", subtitle: "Suivi annuel des performances" },
  { value: "monthly", label: "Mensuel", subtitle: "Suivi mensuel des performances" },
  { value: "daily", label: "Journalier", subtitle: "Suivi journalier des performances" },
] as const;

type PeriodValue = (typeof periodOptions)[number]["value"];

export default function DashboardChart({ yearly, monthly, daily }: DashboardChartProps) {
  const [period, setPeriod] = useState<PeriodValue>("yearly");

  const active = useMemo(
    () => periodOptions.find((option) => option.value === period) ?? periodOptions[0],
    [period]
  );

  const data = useMemo(() => {
    if (period === "monthly") return monthly;
    if (period === "daily") return daily;
    return yearly;
  }, [daily, monthly, period, yearly]);

  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#2A1B12]">Evolution des dossiers</p>
          <p className="text-xs text-[#9A816D]">{active.subtitle}</p>
        </div>
        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value as PeriodValue)}
          className="rounded-lg border border-[#E8DDD3] bg-[#FBF8F5] px-3 py-1.5 text-xs text-[#6D5D4E]"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="dossierGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B3B09" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#6B3B09" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F2E9E2" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9A816D" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9A816D" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                borderRadius: 12,
                border: "1px solid #E8DDD3",
                fontSize: 12,
              }}
              labelStyle={{ color: "#6E5A4A" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6B3B09"
              strokeWidth={2}
              fill="url(#dossierGradient)"
              dot={{ r: 4, strokeWidth: 2, stroke: "#FFFFFF", fill: "#6B3B09" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
