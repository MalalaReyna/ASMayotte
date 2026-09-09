"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";
import { CreateAdminFileRequest } from "@/validations/espace/adminFiles/adminFilesSchema";
import {
  createAdminFile,
  deleteAdminFile,
  getAdminFiles,
  updateAdminFile,
} from "@/services/adminFiles/adminFilesService";
import FileAdminToolbar from "./components/FileAdminToolbar";
import FileAdminTable from "./components/FileAdminTable";
import FileAdminFormModal from "./components/FileAdminFormModal";
import FileAdminDeleteModal from "./components/FileAdminDeleteModal";

const DEFAULT_PAGE_SIZE = 8;

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default function FichierAdminPageClient() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedFile, setSelectedFile] = useState<GetAdminFileResponse | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GetAdminFileResponse | null>(null);

  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-files", debouncedSearch, page, pageSize],
    queryFn: () =>
      getAdminFiles({
        search: debouncedSearch || undefined,
        page,
        limit: pageSize,
      }),
  });

  const files = data?.data ?? [];
  const totalCount = data?.meta?.total ?? files.length;
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
    mutationFn: async (values: CreateAdminFileRequest) => createAdminFile(values),
    onMutate: () => toast.info("Création en cours..."),
    onSuccess: async () => {
      toast.success("Prestation créé avec succès.");
      setFormOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-files"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string; values: CreateAdminFileRequest }) =>
      updateAdminFile(payload.id, payload.values),
    onMutate: () => toast.info("Mise à jour en cours..."),
    onSuccess: async () => {
      toast.success("Prestation modifié avec succès.");
      setFormOpen(false);
      setSelectedFile(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-files"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la modification.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteAdminFile(id),
    onMutate: () => toast.info("Suppression en cours..."),
    onSuccess: async () => {
      toast.success("Prestation supprimé avec succès.");
      setDeleteOpen(false);
      setDeleteTarget(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-files"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression.");
    },
  });

  const openCreate = () => {
    setFormMode("create");
    setSelectedFile(null);
    setFormOpen(true);
  };

  const openEdit = (file: GetAdminFileResponse) => {
    setFormMode("edit");
    setSelectedFile(file);
    setFormOpen(true);
  };

  const openDelete = (file: GetAdminFileResponse) => {
    setDeleteTarget(file);
    setDeleteOpen(true);
  };

  const handleSubmitForm = async (values: CreateAdminFileRequest) => {
    if (formMode === "create") {
      await createMutation.mutateAsync(values);
      return;
    }

    if (!selectedFile) return;
    await updateMutation.mutateAsync({ id: selectedFile.id, values });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Gestion des prestations</h2>
        <p className="text-[#6F6A64]">
          Créez, modifiez et supprimez les prestations utilisés dans l’espace.
        </p>
      </div>

      <FileAdminToolbar search={search} onSearchChange={setSearch} onCreate={openCreate} />

      <FileAdminTable
        files={files}
        isLoading={isLoading || isFetching}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        onPageChange={setPage}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <FileAdminFormModal
        open={formOpen}
        mode={formMode}
        file={selectedFile}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitForm}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <FileAdminDeleteModal
        open={deleteOpen}
        file={deleteTarget}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </section>
  );
}