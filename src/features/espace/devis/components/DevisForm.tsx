"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  DevisFormValues,
  defaultDevisFormValues,
  deviseFormSchema,
} from "@/validations/espace/devis/devisSchema";
import { CreateDevisRequest, GetDevisResponse } from "@/types/devis/devisType";

type DevisFormProps = {
  initialValues?: GetDevisResponse | null;
  onSubmit: (values: CreateDevisRequest) => Promise<void> | void;
  isPending?: boolean;
};

function splitToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function DevisForm({ initialValues, onSubmit, isPending = false }: DevisFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DevisFormValues>({
    resolver: zodResolver(deviseFormSchema),
    defaultValues: defaultDevisFormValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (!initialValues) return;
    reset({
      enterpriseName: initialValues.enterpriseName,
      responsableName: initialValues.responsableName,
      siret: initialValues.siret,
      phone: initialValues.phone,
      email: initialValues.email,
      activitySectorsText: initialValues.activitySectors.join(", "),
      adminFilesText: initialValues.adminFiles.join(", "),
      hasDownloadedDCE: initialValues.hasDownloadedDCE,
      wantsAccompagnementDepot: initialValues.wantsAccompagnementDepot,
      wantsExpressResponse: initialValues.wantsExpressResponse,
      hasAdminFiles: initialValues.hasAdminFiles,
    });
  }, [initialValues, reset]);

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          idMarket: initialValues?.idMarket ?? "",
          enterpriseName: values.enterpriseName,
          responsableName: values.responsableName,
          siret: values.siret,
          phone: values.phone,
          email: values.email,
          activitySectors: splitToArray(values.activitySectorsText),
          adminFiles: splitToArray(values.adminFilesText || ""),
          hasDownloadedDCE: values.hasDownloadedDCE,
          wantsAccompagnementDepot: values.wantsAccompagnementDepot,
          wantsExpressResponse: values.wantsExpressResponse,
          hasAdminFiles: values.hasAdminFiles,
        });
      })}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-secondary">Nom du devis</label>
          <input
            {...register("enterpriseName")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.enterpriseName ? <p className="mt-1 text-xs text-red-600">{errors.enterpriseName.message}</p> : null}
        </div>

        <div>
          <label className="text-xs font-semibold text-secondary">Responsable</label>
          <input
            {...register("responsableName")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.responsableName ? <p className="mt-1 text-xs text-red-600">{errors.responsableName.message}</p> : null}
        </div>

        <div>
          <label className="text-xs font-semibold text-secondary">SIRET</label>
          <input
            {...register("siret")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.siret ? <p className="mt-1 text-xs text-red-600">{errors.siret.message}</p> : null}
        </div>

        <div>
          <label className="text-xs font-semibold text-secondary">Téléphone</label>
          <input
            {...register("phone")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="text-xs font-semibold text-secondary">Email</label>
          <input
            {...register("email")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-secondary">Secteurs d'activité (séparés par virgules)</label>
          <input
            {...register("activitySectorsText")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.activitySectorsText ? <p className="mt-1 text-xs text-red-600">{errors.activitySectorsText.message}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-secondary">Pièces admin (séparées par virgules)</label>
          <input
            {...register("adminFilesText")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark">
          <input type="checkbox" {...register("hasDownloadedDCE")} className="accent-primary" />
          DCE téléchargé
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark">
          <input type="checkbox" {...register("wantsAccompagnementDepot")} className="accent-primary" />
          Accompagnement dépôt
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark">
          <input type="checkbox" {...register("wantsExpressResponse")} className="accent-primary" />
          Réponse express
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark">
          <input type="checkbox" {...register("hasAdminFiles")} className="accent-primary" />
          Pièces admin disponibles
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" className="rounded-full bg-primary px-5 text-white hover:bg-primary/90" disabled={isPending}>
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
