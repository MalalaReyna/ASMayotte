"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { createMarket, mapToCreateMarketRequest } from "@/services/market/marketService";
import { CreateMarketRequest } from "@/validations/espace/market/marketSchema";
import MarketForm from "./components/MarketForm";

export default function MarketCreatePageClient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: async (values: CreateMarketRequest) => {
      const payload = mapToCreateMarketRequest(values);
      return createMarket(payload)
    },
    onMutate: () => toast.info("Création en cours..."),
    onSuccess: async () => {
      toast.success("Appel d'offre créé avec succès.");
      await queryClient.invalidateQueries({ queryKey: ["markets"] });
      router.push("/espace/market");
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création.");
    },
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link href="/espace/market" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-dark">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h2 className="text-2xl font-semibold">Créer un appel d'offre</h2>
        <p className="text-[#6F6A64]">Renseignez les informations de votre nouvel appel d'offre.</p>
      </div>

      <div className="rounded-3xl border border-outline bg-white p-6 shadow-sm">
        <MarketForm
          mode="create"
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
          }}
          isPending={createMutation.isPending}
        />
      </div>
    </section>
  );
}
