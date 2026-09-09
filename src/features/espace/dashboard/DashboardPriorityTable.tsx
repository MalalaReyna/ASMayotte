import { PriorityDossier } from "../../../types/dashboard/dashboardTypes";

const statusClasses: Record<PriorityDossier["status"], string> = {
  Urgent: "bg-[#FFEAEA] text-[#DC2626]",
  Eleve: "bg-[#FFF5E5] text-[#D97706]",
  Normal: "bg-[#E9F8EF] text-[#16A34A]",
};

type DashboardPriorityTableProps = {
  items: PriorityDossier[];
};

function PriorityRow({ item }: { item: PriorityDossier }) {
  return (
    <div className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr] gap-2 border-b border-[#F2E9E2] py-3 text-xs last:border-b-0">
      <p className="text-[#2A1B12]">{item.id}</p>
      <p className="text-[#6E5A4A]">{item.client}</p>
      <p className="text-[#6E5A4A]">{item.dueLabel}</p>
      <span className={`inline-flex w-fit rounded-full px-2 py-1 text-[11px] font-semibold ${statusClasses[item.status]}`}>
        {item.status}
      </span>
    </div>
  );
}

export default function DashboardPriorityTable({ items }: DashboardPriorityTableProps) {
  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#2A1B12]">Dossiers prioritaires</p>
        <span className="text-xs text-[#9A816D]">Filtre</span>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr] gap-2 pb-2 text-[10px] font-semibold uppercase tracking-wide text-[#9A816D]">
          <p>Ref</p>
          <p>Client</p>
          <p>Echeance</p>
          <p>Statut</p>
        </div>
        <div>
          {items.map((item) => (
            <PriorityRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
