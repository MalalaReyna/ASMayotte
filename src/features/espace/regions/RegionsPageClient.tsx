"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetRegionResponse } from "@/types/regions/regionType";
import { createRegion, deleteRegion, getRegions, updateRegion } from "@/services/region/regionService";
import RegionToolbar from "./components/RegionToolbar";
import RegionTable from "./components/RegionTable";
import RegionFormModal from "./components/RegionFormModal";
import RegionDeleteModal from "./components/RegionDeleteModal";
import { CreateRegionRequest } from "@/validations/espace/region/regionSchema";

// default page size
const DEFAULT_PAGE_SIZE = 8;

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default function RegionsPageClient() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedRegion, setSelectedRegion] = useState<GetRegionResponse | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GetRegionResponse | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["regions", debouncedSearch, page, pageSize],
    queryFn: () =>
      getRegions({
        search: debouncedSearch || undefined,
        page,
        limit: pageSize,
      }),
  });

  const regions = data?.data ?? [];
  const totalCount = data?.meta?.total ?? regions.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, pageSize]);

  useEffect(() => {
    if (!isLoading && !isFetching && page > totalPages) {
      setPage(totalPages);
    }
  }, [isLoading, isFetching, page, totalPages]);

  const createMutation = useMutation({
    mutationFn: async (values: CreateRegionRequest) => createRegion(values),
    onMutate: () => toast.info("Création en cours..."),
    onSuccess: async () => {
      toast.success("Région créée avec succès.");
      setFormOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string; values: CreateRegionRequest }) =>
      updateRegion(payload.id, payload.values),
    onMutate: () => toast.info("Mise à jour en cours..."),
    onSuccess: async () => {
      toast.success("Région modifiée avec succès.");
      setFormOpen(false);
      setSelectedRegion(null);
      await queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la modification.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteRegion(id),
    onMutate: () => toast.info("Suppression en cours..."),
    onSuccess: async () => {
      toast.success("Région supprimée avec succès.");
      setDeleteOpen(false);
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression.");
    },
  });

  const openCreate = () => {
    setFormMode("create");
    setSelectedRegion(null);
    setFormOpen(true);
  };

  const openEdit = (region: GetRegionResponse) => {
    setFormMode("edit");
    setSelectedRegion(region);
    setFormOpen(true);
  };

  const openDelete = (region: GetRegionResponse) => {
    setDeleteTarget(region);
    setDeleteOpen(true);
  };

  const handleSubmitForm = async (values: CreateRegionRequest) => {
    if (formMode === "create") {
      await createMutation.mutateAsync(values);
      return;
    }

    if (!selectedRegion) return;
    await updateMutation.mutateAsync({ id: selectedRegion.id, values });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Gestion des régions</h2>
        <p className="text-[#6F6A64]">
          Créez, modifiez et supprimez les régions utilisées dans le back-office.
        </p>
      </div>

      <RegionToolbar search={search} onSearchChange={setSearch} onCreate={openCreate} />

      <RegionTable
        regions={regions}
        isLoading={isLoading || isFetching}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={(n) => {
          setPageSize(n);
        }}
        onPageChange={setPage}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <RegionFormModal
        open={formOpen}
        mode={formMode}
        region={selectedRegion}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitForm}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <RegionDeleteModal
        open={deleteOpen}
        region={deleteTarget}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </section>
  );
}
