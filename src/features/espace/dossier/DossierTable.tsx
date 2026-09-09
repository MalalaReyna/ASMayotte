"use client";

import { DossierItem } from "@/types/dossier/dossierTypes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
type DossierTableProps = {
  dossiers: DossierItem[];
  totalCount: number;
};

function statusClass(status: DossierItem["status"]) {
  switch (status) {
    case "Valide":
      return "bg-[#E4F8E9] text-[#15803D]";
    case "En attente client":
      return "bg-[#FFF5E7] text-[#D97706]";
    case "Urgent":
      return "bg-[#FFEAEA] text-[#DC2626]";
    default:
      return "bg-[#E8EEFF] text-[#1D4ED8]";
  }
}

function urgencySymbol(urgency: DossierItem["urgency"]) {
  if (urgency === "haute") return "▲";
  if (urgency === "moyenne") return "◆";
  return "▾";
}

function urgencyClass(urgency: DossierItem["urgency"]) {
  if (urgency === "haute") return "text-[#DC2626]";
  if (urgency === "moyenne") return "text-[#D97706]";
  return "text-[#16A34A]";
}

export default function DossierTable({ dossiers, totalCount }: DossierTableProps) {
  const router = useRouter();

  const handleRowNavigate = (id: string) => {
    router.push(`/espace/dossier/${id}`);
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRowNavigate(id);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8DDD3] bg-white">
      <div className="block sm:hidden">
        {dossiers.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-[#9A816D]">
            Aucun dossier trouve avec ces filtres.
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {dossiers.map((dossier) => (
              <button
                key={dossier.id}
                type="button"
                onClick={() => handleRowNavigate(dossier.id)}
                className="w-full rounded-2xl border border-[#EFE5DD] bg-[#FBF8F5] p-4 text-left transition hover:bg-[#F7F2EC]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-[#2C2015]">{dossier.title}</p>
                    <p className="mt-1 text-xs text-[#6E5A4A]">{dossier.reference}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${statusClass(dossier.status)}`}>
                    {dossier.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-[#6E5A4A]">
                  <div>
                    <p className="uppercase tracking-wide text-[#9A816D]">Client</p>
                    <p className="mt-1 text-sm text-[#2C2015]">{dossier.client}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide text-[#9A816D]">Territoire</p>
                    <p className="mt-1 text-sm text-[#2C2015]">{dossier.territory}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide text-[#9A816D]">Urgence</p>
                    <p className={`mt-1 text-sm font-semibold ${urgencyClass(dossier.urgency)}`}>
                      {urgencySymbol(dossier.urgency)}
                    </p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wide text-[#9A816D]">Création</p>
                    <p className="mt-1 text-sm text-[#2C2015]">{dossier.createdAt}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-[#FBF8F5] text-xs font-semibold uppercase tracking-wide text-[#9A816D]">
            <tr className="border-b border-[#EFE5DD]">
              <th scope="col" className="px-5 py-3 text-left">Nom du dossier</th>
              <th scope="col" className="px-5 py-3 text-left">Client</th>
              <th scope="col" className="px-5 py-3 text-left">Statut</th>
              <th scope="col" className="px-5 py-3 text-left">Territoire</th>
              <th scope="col" className="px-5 py-3 text-left">Urgence</th>
              <th scope="col" className="px-5 py-3 text-left">Date de creation</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dossiers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#9A816D]">
                  Aucun dossier trouve avec ces filtres.
                </td>
              </tr>
            ) : (
              dossiers.map((dossier) => (
                <tr
                  key={dossier.id}
                  className="hover:cursor-pointer border-b border-[#F2E9E2] transition hover:bg-[#FBF8F5] focus-within:bg-[#FBF8F5]"
                  onClick={() => handleRowNavigate(dossier.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, dossier.id)}
                  role="link"
                  tabIndex={0}
                  aria-label={`Ouvrir dossier ${dossier.title}`}
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#2C2015]">{dossier.title}</p>
                    <p className="text-xs text-[#6E5A4A]">{dossier.reference}</p>
                  </td>
                  <td className="px-5 py-4 text-[#2C2015]">{dossier.client}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusClass(dossier.status)}`}>
                      {dossier.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#2C2015]">{dossier.territory}</td>
                  <td className={`px-5 py-4 font-semibold ${urgencyClass(dossier.urgency)}`}>
                    {urgencySymbol(dossier.urgency)}
                  </td>
                  <td className="px-5 py-4 text-[#2C2015]">{dossier.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#EFE5DD] bg-[#FBF8F5] px-5 py-3 text-xs text-[#9A816D]">
        <p>
          Affichage de 1 à {dossiers.length} sur {totalCount} dossiers
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-x-3">
          <select className="rounded-lg border border-[#E8DDD3] bg-white px-3 py-1">
            <option value="5">5 par page</option>
            <option value="10">10 par page</option>
            <option value="25">25 par page</option>
            <option value="50">50 par page</option>
            <option value="100">100 par page</option>
          </select>
          <button className="hover:bg-[#7A430D] hover:text-white hover:cursor-pointer border border-[#E8DDD3] rounded-lg bg-white px-3 py-1">
            <ArrowLeft size={16} className="transition" />
          </button>
          <button className="hover:bg-[#7A430D] hover:text-white hover:cursor-pointer border border-[#E8DDD3] rounded-lg bg-white px-3 py-1">
            <ArrowRight size={16} className="transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
