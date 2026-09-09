"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type MarketToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
};

export default function MarketToolbar({ search, onSearchChange, onCreate }: MarketToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-outline bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="w-full max-w-xl">
        <label htmlFor="market-search" className="sr-only">
          Rechercher un appel d'offre
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input
            id="market-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Rechercher un appel d'offre"
            className="h-12 w-full rounded-2xl border border-outline bg-surface pl-11 pr-4 text-sm text-dark placeholder:text-secondary focus:outline-none"
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 text-white hover:bg-primary/90"
      >
        <Plus size={16} />
        Créer un appel d'offre
      </Button>
    </div>
  );
}
