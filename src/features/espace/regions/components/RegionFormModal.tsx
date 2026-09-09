"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, PencilLine } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CrudModalHeader from "@/components/modals/CrudModalHeader";
import { createRegionSchema, CreateRegionRequest } from "@/validations/espace/region/regionSchema";
import { GetRegionResponse } from "@/types/regions/regionType";

type RegionFormModalProps = {
  open: boolean;
  mode: "create" | "edit";
  region: GetRegionResponse | null;
  onClose: () => void;
  onSubmit: (values: CreateRegionRequest) => Promise<void> | void;
  isPending?: boolean;
};

export default function RegionFormModal({
  open,
  mode,
  region,
  onClose,
  onSubmit,
  isPending = false,
}: RegionFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegionRequest>({
    resolver: zodResolver(createRegionSchema),
    defaultValues: { name: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) return;
    reset({ name: region?.name ?? "" });
  }, [open, region, reset]);

  const title = mode === "create" ? "Créer une région" : "Modifier une région";
  const description =
    mode === "create"
      ? "Ajoutez une nouvelle région à la liste."
      : "Mettez à jour le nom de la région sélectionnée.";
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
              <label htmlFor="region-name" className="text-xs font-semibold text-secondary">
                Nom de la région
              </label>
              <input
                id="region-name"
                {...register("name")}
                placeholder="Ex: Mamoudzou"
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
