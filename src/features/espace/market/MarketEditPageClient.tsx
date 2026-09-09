"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { getMarketById, mapToUpdateMarketRequest, updateMarket } from "@/services/market/marketService";
import { CreateMarketRequest } from "@/validations/espace/market/marketSchema";
import MarketForm from "./components/MarketForm";

export default function MarketEditPageClient() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const marketId = String(params.id || "");

  const { data, isLoading } = useQuery({
    queryKey: ["market", marketId],
    queryFn: () => getMarketById(marketId),
    enabled: Boolean(marketId),
  });

  const initialValues = useMemo<CreateMarketRequest | undefined>(() => {
    if (!data) return undefined;

    const tags = data.tags

    return {
      title: data.title,
      description: data.description,
      footerDescription: data.footerDescription,
      idLocation: data.location,
      limitDate: data.limitDate.slice(0, 10),
      displayPrice: data.displayPrice,
      price: data.price,
      lot: data.lot,
      duration: data.duration,
      reference: data.reference,
      sigleReference: data.sigleReference,
      buyer: data.buyer,
      avisLink: data.avisLink || "",
      idTypeMarket: data.typeMarket,
      tags: tags,
    };
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async (values: CreateMarketRequest) => {
      const payload = mapToUpdateMarketRequest(values);
      return updateMarket(marketId, payload)
    },
    onMutate: () => toast.info("Mise à jour en cours..."),
    onSuccess: async () => {
      toast.success("Appel d'offre modifié avec succès.");
      await queryClient.invalidateQueries({ queryKey: ["markets"] });
      router.push("/espace/market");
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la modification.");
    },
  });

  if (isLoading) {
    return <p className="text-sm text-secondary">Chargement de l'appel d'offre...</p>;
  }

  if (!initialValues) {
    return <p className="text-sm text-secondary">Appel d'offre introuvable.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link href="/espace/market" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-dark">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h2 className="text-2xl font-semibold">Modifier un appel d'offre</h2>
        <p className="text-[#6F6A64]">Mettez à jour les informations de cet appel d'offre.</p>
      </div>

      <div className="rounded-3xl border border-outline bg-white p-6 shadow-sm">
        <MarketForm
          mode="edit"
          initialValues={initialValues}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync(values);
          }}
          isPending={updateMutation.isPending}
        />
      </div>
    </section>
  );
}
