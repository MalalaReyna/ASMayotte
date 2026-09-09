"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ArrowLeft, PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDevisById } from "@/services/devis/devisService";

export default function DevisDetailPageClient() {
  const params = useParams<{ id: string }>();
  const devisId = String(params.id || "");

  const { data, isLoading } = useQuery({
    queryKey: ["devis", devisId],
    queryFn: () => getDevisById(devisId),
    enabled: Boolean(devisId),
  });

  const activitySectors = useMemo(() => data?.activitySectors ?? [], [data]);
  const adminFiles = useMemo(() => data?.adminFiles ?? [], [data]);

  if (isLoading) {
    return <p className="text-sm text-secondary">Chargement du devis...</p>;
  }

  if (!data) {
    return <p className="text-sm text-secondary">Devis introuvable.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link href="/espace/devis" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-dark">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">{data.enterpriseName}</h2>
            <p className="text-[#6F6A64]">Créé le {new Date(data.createdAt).toLocaleDateString("fr-FR")}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-secondary">Responsable</h3>
          <p className="mt-2 text-sm text-dark">{data.responsableName}</p>
        </div>
        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-secondary">Prestations demandées</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {adminFiles.length > 0 ? adminFiles.map((file) => (
              <span key={file.adminFileName} className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-surface">
                {file.adminFileName}
              </span>
            )) : <p className="text-sm text-secondary">Aucune pièce jointe.</p>}
          </div>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-secondary">Coordonnées</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-secondary">Téléphone</dt><dd>{data.phone}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-secondary">Email</dt><dd>{data.email}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-secondary">SIRET</dt><dd>{data.siret}</dd></div>
          </dl>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-secondary">Indicateurs</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-secondary">DCE téléchargé</dt><dd>{data.hasDownloadedDCE ? "Oui" : "Non"}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-secondary">Accompagnement dépôt</dt><dd>{data.wantsAccompagnementDepot ? "Oui" : "Non"}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-secondary">Réponse express</dt><dd>{data.wantsExpressResponse ? "Oui" : "Non"}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-secondary">Pièces admin</dt><dd>{data.hasAdminFiles ? "Oui" : "Non"}</dd></div>
          </dl>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-secondary">Secteurs</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {activitySectors.map((sector) => (
              <span key={sector} className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-secondary">
                {sector}
              </span>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
