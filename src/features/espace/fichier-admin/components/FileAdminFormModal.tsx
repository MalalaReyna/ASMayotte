"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import CrudModalHeader from "@/components/modals/CrudModalHeader";
import {
  CreateAdminFileRequest,
  createAdminFileSchema,
} from "@/validations/espace/adminFiles/adminFilesSchema";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";

type FileAdminFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  file: GetAdminFileResponse | null;
  onClose: () => void;
  onSubmit: (values: CreateAdminFileRequest) => Promise<void> | void;
  isPending?: boolean;
};

export default function FileAdminFormModal({
  open,
  mode,
  file,
  onClose,
  onSubmit,
  isPending = false,
}: FileAdminFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAdminFileRequest>({
    resolver: zodResolver(createAdminFileSchema),
    defaultValues: { name: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) return;
    reset({ name: file?.name ?? "" });
  }, [open, file, reset]);

  const title = mode === "create" ? "Créer une préstation" : "Modifier une préstation";
  const description =
    mode === "create"
      ? "Ajoutez une nouvelle préstation à la liste."
      : "Mettez à jour le nom de la préstation sélectionné.";
  const Icon = mode === "create" ? Plus : PencilLine;

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? undefined : onClose())}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-hidden rounded-4xl border-outline bg-white p-6" showCloseButton>
        <form
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
          })}
          className="space-y-6"
        >
          <DialogHeader>
            <CrudModalHeader icon={Icon} title={title} description={description} />
            <DialogDescription className="sr-only">{description}</DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label htmlFor="file-admin-name" className="text-xs font-semibold text-secondary">
                Nom de la prestation
              </label>
              <input
                id="file-admin-name"
                {...register("name")}
                placeholder="Ex: Extrait Kbis"
                className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark focus:outline-none"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-outline px-5 text-dark"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
              disabled={isPending}
            >
              {isPending ? "Enregistrement..." : mode === "create" ? "Créer" : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}