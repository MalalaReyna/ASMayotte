import Link from "next/link";
import { DossierMeta } from "../../../../types/dossier/dossierTypes";

type DossierHeaderProps = {
  meta: DossierMeta;
};

function StatusBadge({ status }: { status: DossierMeta["status"] }) {
  const classes: Record<DossierMeta["status"], string> = {
    "En revue": "bg-[#FFF5E5] text-[#D97706]",
    Valide: "bg-[#E9F8EF] text-[#16A34A]",
    Urgent: "bg-[#FFEAEA] text-[#DC2626]",
    "En attente": "bg-[#EEF2FF] text-[#4F46E5]",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${classes[status]}`}>
      {status}
    </span>
  );
}

export default function DossierHeader({ meta }: DossierHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold text-[#1C1002]">{meta.id}</h2>
        <StatusBadge status={meta.status} />
      </div>
      <p className="text-sm text-[#8B7F73]">Dossier envoyé le {meta.openedAt}</p>
    </div>
  );
}
