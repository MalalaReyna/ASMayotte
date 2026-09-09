"use client";

import { IActivitySector } from "@/interfaces/activity/activity";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type PublicTenderFiltersProps = {
  searchValue: string;
  regionValue: string;
  typeValue: string;
  types: IActivitySector[];
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export default function PublicTenderFilters({
  searchValue,
  typeValue,
  types,
  onSearchChange,
  onTypeChange,
}: PublicTenderFiltersProps) {

  const typeOptions = [...types.map((type) => type.id)];
  const typeLabels = new Map(types.map((type) => [type.id, type.name]));
  const resolveTypeLabel = (value: string) => typeLabels.get(value) ?? value;

  return (
    <div className="mt-8 flex flex-col gap-4 lg:flex-row justify-between lg:items-end lg:gap-6">
      <div className="flex-1">
        <label htmlFor="tender-search" className="sr-only">
          Rechercher un marche
        </label>
        <input
          id="tender-search"
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher : nettoyage, BTP, DPGF, Mamoudzou..."
          className="h-12 w-full rounded-2xl border border-outline bg-white px-4 text-sm text-dark placeholder:text-secondary"
        />
      </div>

      <div className="lg:ml-auto lg:w-[16rem]">
        <div>
          <label htmlFor="tender-type" className="text-xs font-semibold text-secondary">
            Type d'appel d'offre
          </label>

          <Combobox
            items={typeOptions}
            value={typeValue}
            onValueChange={(value) => onTypeChange(value ?? "")}
            itemToStringLabel={resolveTypeLabel}
          >
            <ComboboxInput
              id="tender-type"
              className="mt-2 h-12 rounded-2xl border-outline bg-white text-sm text-dark"
              placeholder="Tous les types"
            />

            <ComboboxContent>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {resolveTypeLabel(item)}
                  </ComboboxItem>
                )}
              </ComboboxList>

              <ComboboxEmpty>Aucun type</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    </div>
  );
}
