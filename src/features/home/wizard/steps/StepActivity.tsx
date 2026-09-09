"use client";

import { Control, FieldErrors, useController } from "react-hook-form";
import WizardFieldError from "../components/WizardFieldError";
import { WizardSchemaType } from "@/validations/wizard/wizardSchema";
import { IActivitySector, IActivityType } from "@/interfaces/activity/activity";

type Props = {
  control: Control<WizardSchemaType>;
  errors: FieldErrors<WizardSchemaType>;
  activitySectors: IActivitySector[];
};

export default function StepActivity({ control, errors, activitySectors }: Props) {
  const { field: sectorField } = useController({
    name: "activitySector",
    control,
    defaultValue: [],
  });

  const { field: typeField } = useController({
    name: "activityType",
    control,
    defaultValue: [],
  });

  const selectedSectors = (sectorField.value ?? []) as IActivitySector[];
  const selectedTypes = (typeField.value ?? []) as IActivityType[];

  const filteredTypes = selectedSectors
    .flatMap((sector) => sector.types ?? [])
    .filter((type, index, arr) => arr.findIndex((t) => t.id === type.id) === index);

  const isSectorSelected = (id: string) => selectedSectors.some((s) => s.id === id);
  const isTypeSelected = (id: string) => selectedTypes.some((t) => t.id === id);

  const toggleSector = (sector: IActivitySector) => {
    const exists = isSectorSelected(sector.id);

    const nextSectors = exists
      ? selectedSectors.filter((s) => s.id !== sector.id)
      : [...selectedSectors, sector];

    const allowedTypeIds = new Set(
      nextSectors.flatMap((s) => s.types ?? []).map((t) => t.id)
    );

    const nextTypes = selectedTypes.filter((t) => allowedTypeIds.has(t.id));

    sectorField.onChange(nextSectors);
    typeField.onChange(nextTypes);
  };

  const toggleType = (type: IActivityType) => {
    const exists = isTypeSelected(type.id);
    const nextTypes = exists
      ? selectedTypes.filter((t) => t.id !== type.id)
      : [...selectedTypes, type];

    typeField.onChange(nextTypes);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[#7A430D] font-medium mb-3">
          Secteur(s) d&apos;activité * (plusieurs choix possibles)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-84">
          {activitySectors.map((sector) => {
            const active = isSectorSelected(sector.id);

            return (
              <button
                type="button"
                key={sector.id}
                onClick={() => toggleSector(sector)}
                className={`rounded-[1.375rem] border px-4 py-3 flex items-center gap-3 text-left cursor-pointer hover:bg-[#FCFAF7] ${
                  active ? "border-[#C49A77] bg-[#FCFAF7]" : "border-[#E6D8CC]"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full border shrink-0 ${
                    active ? "bg-[#7A430D] border-[#7A430D]" : "bg-white border-[#C9B9AA]"
                  }`}
                />
                <span className="block font-medium text-[#7A430D]">{sector.name}</span>
              </button>
            );
          })}
        </div>

        <WizardFieldError message={errors.activitySector?.message as string | undefined} />
      </div>

      <div>
        <p className="text-[#7A430D] font-medium mb-3">
          Type(s) d&apos;activité * (plusieurs choix possibles)
        </p>

        {selectedSectors.length === 0 ? (
          <p className="text-sm text-[#8C7A6B]">
            Sélectionnez au moins un secteur pour voir les types disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-84">
            {filteredTypes.map((type) => {
              const active = isTypeSelected(type.id);

              return (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => toggleType(type)}
                  className={`rounded-[1.375rem] border px-4 py-3 flex items-center gap-3 text-left cursor-pointer hover:bg-[#FCFAF7] ${
                    active ? "border-[#C49A77] bg-[#FCFAF7]" : "border-[#E6D8CC]"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full border shrink-0 ${
                      active ? "bg-[#7A430D] border-[#7A430D]" : "bg-white border-[#C9B9AA]"
                    }`}
                  />
                  <span className="block font-medium text-[#7A430D]">{type.name}</span>
                </button>
              );
            })}
          </div>
        )}

        <WizardFieldError message={errors.activityType?.message as string | undefined} />
      </div>
    </div>
  );
}