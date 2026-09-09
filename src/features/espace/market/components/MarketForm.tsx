"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  CreateMarketRequest,
  createMarketSchema,
} from "@/validations/espace/market/marketSchema";
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "@/services/region/regionService";
import { getAllActivitySectors } from "@/services/sector/sectorService";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

type MarketFormProps = {
  mode: "create" | "edit";
  initialValues?: CreateMarketRequest;
  onSubmit: (values: CreateMarketRequest) => Promise<void> | void;
  isPending?: boolean;
};

type MarketFormInput = z.input<typeof createMarketSchema>;
type MarketFormOutput = z.output<typeof createMarketSchema>;

const defaultValues: CreateMarketRequest = {
  title: "",
  description: "",
  footerDescription: "",
  idLocation: "",
  limitDate: "",
  displayPrice: "",
  price: 0,
  lot: 0,
  duration: 1,
  reference: "",
  sigleReference: "",
  buyer: "",
  avisLink: "",
  idTypeMarket: "",
  tags: [],
};

export default function MarketForm({ mode, initialValues, onSubmit, isPending = false }: MarketFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<MarketFormInput, undefined, MarketFormOutput>({
    resolver: zodResolver(createMarketSchema),
    defaultValues,
    mode: "onTouched",
  });

  const { fields: tagFields, append, remove, replace } = useFieldArray({
    control,
    name: "tags" as never,
    keyName: "fieldId",
  });

  useEffect(() => {
    const values = initialValues ?? defaultValues;
    reset(values);
    replace(values.tags.length > 0 ? values.tags : [""]);
  }, [initialValues, replace, reset]);

  const { data: regionsResult } = useQuery({ queryKey: ["regions"], queryFn: () => getRegions({ limit: 10000000 }) });
  const regions = regionsResult?.data ?? [];
  const regionLabels = useMemo(() => new Map(regions.map((r) => [r.id, r.name])), [regions]);

  const { data: sectorsResult } = useQuery({ queryKey: ["activitySectors"], queryFn: () => getAllActivitySectors() });
  const sectors = sectorsResult?.data ?? [];
  // Use sectors (not their inner types) as market types
  const typeOptions = useMemo(() => sectors.map((s) => s.id), [sectors]);
  const typeLabels = useMemo(() => new Map(sectors.map((s) => [s.id, s.name])), [sectors]);

  useEffect(() => {
    if (mode !== "edit") return;
    if (!initialValues) return;
    if (regions.length === 0 || sectors.length === 0) return;

    const currentLocation = getValues("idLocation") || initialValues.idLocation;
    const currentType = getValues("idTypeMarket") || initialValues.idTypeMarket;

    const resolvedLocation =
      regions.find((region) => region.id === currentLocation || region.name === currentLocation)?.id ??
      currentLocation;
    const resolvedType =
      sectors.find((sector) => sector.id === currentType || sector.name === currentType)?.id ??
      currentType;

    if (resolvedLocation !== currentLocation) {
      setValue("idLocation", resolvedLocation, { shouldDirty: false });
    }
    if (resolvedType !== currentType) {
      setValue("idTypeMarket", resolvedType, { shouldDirty: false });
    }
  }, [
    mode,
    initialValues,
    regions,
    sectors,
    getValues,
    setValue,
  ]);

  const addTag = () => {
    append("");
  };

  const removeTag = (index: number) => {
    if (tagFields.length === 1) {
      replace([""]);
      return;
    }

    remove(index);
  };

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values);
      })}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="market-title" className="text-xs font-semibold text-secondary">Titre</label>
          <input
            id="market-title"
            {...register("title")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="market-description" className="text-xs font-semibold text-secondary">Description</label>
          <textarea
            id="market-description"
            {...register("description")}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.description ? <p className="mt-1 text-xs text-red-600">{errors.description.message}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="market-footer-description" className="text-xs font-semibold text-secondary">Description pied de page</label>
          <textarea
            id="market-footer-description"
            {...register("footerDescription")}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.footerDescription ? <p className="mt-1 text-xs text-red-600">{errors.footerDescription.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-location" className="text-xs font-semibold text-secondary">Localisation</label>
          <Controller
            control={control}
            name="idLocation"
            render={({ field }) => (
              <Combobox
                items={regions.map((r) => r.id) as any}
                value={field.value}
                onValueChange={(value) => field.onChange(value ?? "")}
                itemToStringLabel={(id) => regionLabels.get(id) ?? id}
              >
                <ComboboxInput
                  id="market-location"
                  className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                  placeholder="Sélectionnez une localisation"
                />
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {regionLabels.get(item) ?? item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                  <ComboboxEmpty>Aucune région</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            )}
          />
          {errors.idLocation ? <p className="mt-1 text-xs text-red-600">{errors.idLocation.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-type" className="text-xs font-semibold text-secondary">Type de marché</label>
          <Controller
            control={control}
            name="idTypeMarket"
            render={({ field }) => (
              <Combobox
                items={typeOptions as any}
                value={field.value}
                onValueChange={(value) => field.onChange(value ?? "")}
                itemToStringLabel={(id) => typeLabels.get(id) ?? id}
              >
                <ComboboxInput
                  id="market-type"
                  className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                  placeholder="Sélectionnez un type"
                />
                <ComboboxContent>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {typeLabels.get(item) ?? item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                  <ComboboxEmpty>Aucun type</ComboboxEmpty>
                </ComboboxContent>
              </Combobox>
            )}
          />
          {errors.idTypeMarket ? <p className="mt-1 text-xs text-red-600">{errors.idTypeMarket.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-limit-date" className="text-xs font-semibold text-secondary">Date limite</label>
          <input
            id="market-limit-date"
            type="date"
            {...register("limitDate")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.limitDate ? <p className="mt-1 text-xs text-red-600">{errors.limitDate.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-display-price" className="text-xs font-semibold text-secondary">Prix affiché</label>
          <input
            id="market-display-price"
            {...register("displayPrice")}
            placeholder="Ex: 120 000 EUR HT"
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.displayPrice ? <p className="mt-1 text-xs text-red-600">{errors.displayPrice.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-price" className="text-xs font-semibold text-secondary">Prix numérique</label>
          <input
            id="market-price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.price ? <p className="mt-1 text-xs text-red-600">{errors.price.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-lot" className="text-xs font-semibold text-secondary">Lot</label>
          <input
            id="market-lot"
            type="number"
            {...register("lot",{valueAsNumber: true})}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.lot ? <p className="mt-1 text-xs text-red-600">{errors.lot.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-duration" className="text-xs font-semibold text-secondary">Durée (mois)</label>
          <input
            id="market-duration"
            type="number"
            {...register("duration", { valueAsNumber: true })}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.duration ? <p className="mt-1 text-xs text-red-600">{errors.duration.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-reference" className="text-xs font-semibold text-secondary">Référence</label>
          <input
            id="market-reference"
            {...register("reference")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.reference ? <p className="mt-1 text-xs text-red-600">{errors.reference.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-sigle-reference" className="text-xs font-semibold text-secondary">Sigle référence</label>
          <input
            id="market-sigle-reference"
            {...register("sigleReference")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.sigleReference ? <p className="mt-1 text-xs text-red-600">{errors.sigleReference.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-buyer" className="text-xs font-semibold text-secondary">Acheteur</label>
          <input
            id="market-buyer"
            {...register("buyer")}
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.buyer ? <p className="mt-1 text-xs text-red-600">{errors.buyer.message}</p> : null}
        </div>

        <div>
          <label htmlFor="market-avis-link" className="text-xs font-semibold text-secondary">Lien avis (optionnel)</label>
          <input
            id="market-avis-link"
            {...register("avisLink")}
            placeholder="https://..."
            className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          />
          {errors.avisLink ? <p className="mt-1 text-xs text-red-600">{errors.avisLink.message}</p> : null}
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label className="text-xs font-semibold text-secondary">Tags</label>
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full border-outline px-4 text-sm"
              onClick={addTag}
            >
              Ajouter un tag
            </Button>
          </div>

          <div className="space-y-3">
            {tagFields.map((field, index) => (
              <div key={field.fieldId} className="flex gap-2">
                <input
                  id={`market-tag-${index}`}
                  placeholder={`Tag ${index + 1}`}
                  {...register(`tags.${index}` as never)}
                  className="w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto shrink-0 rounded-2xl border-outline px-4 text-sm"
                  onClick={() => removeTag(index)}
                  disabled={tagFields.length === 1}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>

          {errors.tags ? <p className="mt-1 text-xs text-red-600">{errors.tags.message as string}</p> : null}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" className="rounded-full bg-primary px-5 text-white hover:bg-primary/90" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : mode === "create"
              ? "Créer l'appel d'offre"
              : "Mettre à jour l'appel d'offre"}
        </Button>
      </div>
    </form>
  );
}
