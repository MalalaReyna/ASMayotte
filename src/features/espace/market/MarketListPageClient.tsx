"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteMarket, getMarkets } from "@/services/market/marketService";
import { GetMarketResponse } from "@/types/market/marketType";
import MarketToolbar from "./components/MarketToolbar";
import MarketTable from "./components/MarketTable";
import MarketDeleteModal from "./components/MarketDeleteModal";

const DEFAULT_PAGE_SIZE = 8;

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default function MarketListPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GetMarketResponse | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["markets", debouncedSearch, page, pageSize],
    queryFn: () =>
      getMarkets({
        search: debouncedSearch || undefined,
        page,
        limit: pageSize,
        hasExpired: true,
      }),
  });

  const markets = data?.data ?? [];
  const totalCount = data?.meta?.total ?? markets.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  useEffect(() => {
    if (!isLoading && !isFetching && page > totalPages) {
      setPage(totalPages);
    }
  }, [isLoading, isFetching, page, totalPages]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteMarket(id),
    onMutate: () => toast.info("Suppression en cours..."),
    onSuccess: async () => {
      toast.success("Appel d'offre supprimé avec succès.");
      setDeleteOpen(false);
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ["markets"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression.");
    },
  });

  const openDelete = (market: GetMarketResponse) => {
    setDeleteTarget(market);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Gestion des appels d'offre</h2>
        <p className="text-[#6F6A64]">Créez, modifiez et supprimez les appels d'offre de votre espace.</p>
      </div>

      <MarketToolbar
        search={search}
        onSearchChange={setSearch}
        onCreate={() => router.push("/espace/market/create")}
      />

      <MarketTable
        markets={markets}
        isLoading={isLoading || isFetching}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        onPageChange={setPage}
        onOpen={(market) => router.push(`/espace/market/${market.id}`)}
        onEdit={(market) => router.push(`/espace/market/${market.id}/edit`)}
        onDelete={openDelete}
      />

      <MarketDeleteModal
        open={deleteOpen}
        market={deleteTarget}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </section>
  );
}
