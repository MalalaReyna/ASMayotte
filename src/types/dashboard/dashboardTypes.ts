import type { ReactNode } from "react";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  helper: string;
  trend: "up" | "down" | "neutral";
  icon: ReactNode;
  accent: "green" | "orange" | "blue" | "purple";
};

export type DashboardChartPoint = {
  label: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  accent: "green" | "orange" | "blue";
};

export type PriorityDossier = {
  id: string;
  client: string;
  dueLabel: string;
  status: "Urgent" | "Eleve" | "Normal";
};
