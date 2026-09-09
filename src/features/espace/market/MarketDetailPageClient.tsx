"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ArrowLeft, PencilLine } from "lucide-react";
import { getMarketById } from "@/services/market/marketService";
import { Button } from "@/components/ui/button";

export default function MarketDetailPageClient() {
  const params = useParams<{ id: string }>();
  const marketId = String(params.id || "");

  const { data, isLoading } = useQuery({
    queryKey: ["market", marketId],
    queryFn: () => getMarketById(marketId),
    enabled: Boolean(marketId),
  });

  const tags = useMemo(() => {
    if (!data?.tags) return [];
    return data.tags
  }, [data]);

  if (isLoading) {
    return <p className="text-sm text-secondary">Chargement de l'appel d'offre...</p>;
  }

  if (!data) {
    return <p className="text-sm text-secondary">Appel d'offre introuvable.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link href="/espace/market" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-dark">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            <p className="text-[#6F6A64]">{data.buyer}</p>
          </div>
          <Link href={`/espace/market/${data.id}/edit`}>
            <Button type="button" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 text-white hover:bg-primary/90">
              <PencilLine size={16} />
              Modifier
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-secondary">Description</h3>
          <p className="mt-2 text-sm text-dark">{data.description}</p>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-secondary">Informations principales</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Type</dt>
              <dd className="text-dark">{data.typeMarket}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Localisation</dt>
              <dd className="text-dark">{data.location}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Date limite</dt>
              <dd className="text-dark">{new Date(data.limitDate).toLocaleDateString("fr-FR")}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Durée</dt>
              <dd className="text-dark">{data.duration} mois</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-secondary">Références</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Référence</dt>
              <dd className="text-dark">{data.reference}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Sigle</dt>
              <dd className="text-dark">{data.sigleReference}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Lot</dt>
              <dd className="text-dark">{data.lot}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-secondary">Prix affiché</dt>
              <dd className="text-dark">{data.displayPrice}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-secondary">Description de bas de page</h3>
          <p className="mt-2 text-sm text-dark">{data.footerDescription}</p>

          {tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {data.avisLink ? (
            <p className="mt-4 text-sm">
              <a href={data.avisLink} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
                Consulter l'avis du marché
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
