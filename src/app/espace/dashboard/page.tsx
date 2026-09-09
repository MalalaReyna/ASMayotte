import { Folder, ShieldCheck, TimerReset, TrendingUp } from "lucide-react";
import DashboardStats from "@/features/espace/dashboard/DashboardStats";
import DashboardChart from "@/features/espace/dashboard/DashboardChart";
import DashboardActivities from "@/features/espace/dashboard/DashboardActivities";
import DashboardPriorityTable from "@/features/espace/dashboard/DashboardPriorityTable";
import { ActivityItem, DashboardChartPoint, DashboardStat, PriorityDossier } from "@/types/dashboard/dashboardTypes";
import { auth } from "@/auth";
import AccessError from "@/components/errors/AccessError";
import { ROLE_ADMIN } from "@/constants/userRoleConsts";

const stats: DashboardStat[] = [
  {
    id: "total",
    label: "Total dossiers",
    value: "1,248",
    helper: "+12% ce mois",
    trend: "up",
    accent: "blue",
    icon: <Folder size={16} />,
  },
  {
    id: "review",
    label: "En revue",
    value: "342",
    helper: "48h delai moyen",
    trend: "neutral",
    accent: "orange",
    icon: <TimerReset size={16} />,
  },
  {
    id: "validated",
    label: "Valides ce mois",
    value: "186",
    helper: "Stable vs mois dernier",
    trend: "neutral",
    accent: "green",
    icon: <TrendingUp size={16} />,
  },
  {
    id: "compliance",
    label: "Taux de conformite",
    value: "98.4%",
    helper: "+0.2% vs objectif",
    trend: "up",
    accent: "purple",
    icon: <ShieldCheck size={16} />,
  },
];

const chartDataYearly: DashboardChartPoint[] = [
  { label: "2016", value: 12 },
  { label: "2017", value: 18 },
  { label: "2018", value: 34 },
  { label: "2019", value: 52 },
  { label: "2020", value: 60 },
  { label: "2021", value: 38 },
  { label: "2022", value: 30 },
  { label: "2023", value: 40 },
  { label: "2024", value: 58 },
  { label: "2025", value: 68 },
];

const chartDataMonthly: DashboardChartPoint[] = [
  { label: "Jan", value: 14 },
  { label: "Fev", value: 18 },
  { label: "Mar", value: 26 },
  { label: "Avr", value: 32 },
  { label: "Mai", value: 40 },
  { label: "Jun", value: 44 },
  { label: "Jul", value: 38 },
  { label: "Aou", value: 35 },
  { label: "Sep", value: 48 },
  { label: "Oct", value: 55 },
  { label: "Nov", value: 52 },
  { label: "Dec", value: 60 },
];

const chartDataDaily: DashboardChartPoint[] = [
  { label: "Lun", value: 12 },
  { label: "Mar", value: 18 },
  { label: "Mer", value: 16 },
  { label: "Jeu", value: 22 },
  { label: "Ven", value: 28 },
  { label: "Sam", value: 20 },
  { label: "Dim", value: 14 },
];

const activities: ActivityItem[] = [
  {
    id: "act-1",
    title: "Dossier #LIT-202 valide",
    description: "Valide par Marie Lambert (Admin)",
    timeLabel: "il y a 4 heures",
    accent: "green",
  },
  {
    id: "act-2",
    title: "Modification du statut de conformite",
    description: "Dossier #CA-RP-91",
    timeLabel: "il y a 8 heures",
    accent: "blue",
  },
  {
    id: "act-3",
    title: "Reponse client recue",
    description: "Dossier #DEV-784",
    timeLabel: "hier",
    accent: "orange",
  },
];

const priorities: PriorityDossier[] = [
  {
    id: "#LIT-892",
    client: "TechNova SAS",
    dueLabel: "Aujourd'hui",
    status: "Urgent",
  },
  {
    id: "#CORP-104",
    client: "Groupe Media",
    dueLabel: "Demain",
    status: "Eleve",
  },
  {
    id: "#RH-223",
    client: "EcoLogik",
    dueLabel: "27 avr",
    status: "Normal",
  },
];

export default async function DashboardPage() {
  const session = await auth();
  if (session?.user.role !== ROLE_ADMIN) {
    return (<AccessError />)
  }
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Vue d'ensemble</h2>
        <p className="text-[#6F6A64]">Indicateurs cles de performance et activites recentes.</p>
      </div>

      <DashboardStats items={stats} />

      <DashboardChart
        yearly={chartDataYearly}
        monthly={chartDataMonthly}
        daily={chartDataDaily}
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <DashboardActivities items={activities} />
        <DashboardPriorityTable items={priorities} />
      </div>
    </div>
  );
}