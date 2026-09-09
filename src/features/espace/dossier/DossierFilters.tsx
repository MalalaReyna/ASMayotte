"use client";

import { Search, SearchCheckIcon, SearchIcon } from "lucide-react";

type DossierFiltersProps = {
  search: string;
  category: string;
  status: string;
  territory: string;
  categories: string[];
  statuses: string[];
  territories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTerritoryChange: (value: string) => void;
  onReset: () => void;
};

export default function DossierFilters({
  search,
  category,
  status,
  territory,
  categories,
  statuses,
  territories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onTerritoryChange,
  onReset,
}: DossierFiltersProps) {
  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-[#FBF8F5] p-3">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr_auto]">
        <label className="relative block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A08D7D]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Filtrer par nom..."
            className="w-full rounded-lg border border-[#E8DDD3] bg-white py-2 pl-8 pr-3 text-sm outline-none"
          />
        </label>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-lg border border-[#E8DDD3] bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Catégorie de service</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full rounded-lg border border-[#E8DDD3] bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Statut</option>
          {statuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={territory}
          onChange={(event) => onTerritoryChange(event.target.value)}
          className="w-full rounded-lg border border-[#E8DDD3] bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">Territoire</option>
          {territories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-lg border border-[#E8DDD3] bg-white px-4 py-2 text-sm font-medium text-[#7A430D] hover:bg-[#F6EFE8]"
        >
          <SearchIcon size={16} className="inline-block mr-1" />
          Rechercher
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-[#E8DDD3] bg-white px-4 py-2 text-sm font-medium text-[#7A430D] hover:bg-[#F6EFE8]"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
