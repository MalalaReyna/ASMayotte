"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type DevisToolbarProps = {
  search: string;
  fromDate: string;
  toDate: string;
  onSearchChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export default function DevisToolbar({
  search,
  fromDate,
  toDate,
  onSearchChange,
  onFromDateChange,
  onToDateChange,
  onApply,
  onReset,
}: DevisToolbarProps) {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onApply();
    }
  };

  return (
    <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-xl">
          <label htmlFor="devis-search" className="sr-only">
            Rechercher un devis
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input
              id="devis-search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher par nom de devis"
              className="h-12 w-full rounded-2xl border border-outline bg-surface pl-11 pr-4 text-sm text-dark placeholder:text-secondary focus:outline-none"
            />
          </div>
        </div>
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
          <div>
            <label htmlFor="devis-from-date" className="text-xs font-semibold text-secondary">
              Du
            </label>
            <input
              id="devis-from-date"
              type="date"
              value={fromDate}
              onChange={(event) => onFromDateChange(event.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-2 h-12 w-full rounded-2xl border border-outline bg-surface px-4 text-sm text-dark"
            />
          </div>
          <div>
            <label htmlFor="devis-to-date" className="text-xs font-semibold text-secondary">
              Au
            </label>
            <input
              id="devis-to-date"
              type="date"
              value={toDate}
              onChange={(event) => onToDateChange(event.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-2 h-12 w-full rounded-2xl border border-outline bg-surface px-4 text-sm text-dark"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
          <Button
            type="button"
            className="h-12 w-full rounded-full bg-primary px-6 text-white hover:bg-primary/90 sm:w-auto"
            onClick={onApply}
          >
            Rechercher
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-full border-outline px-6 text-dark sm:w-auto"
            onClick={onReset}
          >
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  );
}
