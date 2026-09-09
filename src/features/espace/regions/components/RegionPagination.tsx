"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type RegionPaginationProps = {
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange: (page: number) => void;
};

export default function RegionPagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageSizeChange,
  onPageChange,
}: RegionPaginationProps) {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col gap-3 border-t border-outline bg-surface px-5 py-4 text-sm text-secondary md:flex-row md:items-center md:justify-between">
      <p>
        Affichage de {from} à {to} sur {totalCount} régions
      </p>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <span className="text-xs text-secondary">Lignes</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="h-9 rounded-full border border-outline bg-white px-3 text-sm text-dark"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-outline px-4 text-dark"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          <ArrowLeft size={16} />
        </Button>
        <span className="text-center text-xs font-semibold uppercase tracking-wide">
          Page {page} / {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-outline px-4 text-dark"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
