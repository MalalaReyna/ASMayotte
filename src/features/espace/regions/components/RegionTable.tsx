"use client";

import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetRegionResponse } from "@/types/regions/regionType";
import RegionPagination from "./RegionPagination";

type RegionTableProps = {
  regions: GetRegionResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  onEdit: (region: GetRegionResponse) => void;
  onDelete: (region: GetRegionResponse) => void;
};

export default function RegionTable({
  regions,
  isLoading,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageSizeChange,
  onPageChange,
  onEdit,
  onDelete,
}: RegionTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline bg-white shadow-sm">
      <div className="block sm:hidden">
        {regions.length === 0 ? (
          <div className="px-5 py-8 text-center text-secondary">Aucune région trouvée.</div>
        ) : (
          <div className="space-y-3 p-4">
            {regions.map((region) => (
              <div key={region.id} className="rounded-2xl border border-outline bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Région</p>
                <p className="mt-2 text-sm font-medium text-dark">{region.name}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark"
                    onClick={() => onEdit(region)}
                    aria-label={`Modifier la région ${region.name}`}
                  >
                    <PencilLine size={16} />
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                    onClick={() => onDelete(region)}
                    aria-label={`Supprimer la région ${region.name}`}
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-surface text-xs font-semibold uppercase tracking-wide text-secondary">
            <tr className="border-b border-outline">
              <th scope="col" className="px-5 py-3 text-left">Nom de la région</th>
              <th scope="col" className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-dark">
            {isLoading ? (
              <tr>
                <td colSpan={2} className="px-5 py-8 text-center text-secondary">
                  Chargement des régions...
                </td>
              </tr>
            ) : regions.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-5 py-8 text-center text-secondary">
                  Aucune région trouvée.
                </td>
              </tr>
            ) : (
              regions.map((region) => (
                <tr key={region.id} className="border-b border-outline/70 hover:bg-surface">
                  <td className="px-5 py-4 font-medium">{region.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-outline px-3 text-dark"
                        onClick={() => onEdit(region)}
                        aria-label={`Modifier la région ${region.name}`}
                      >
                        <PencilLine size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                        onClick={() => onDelete(region)}
                        aria-label={`Supprimer la région ${region.name}`}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      <RegionPagination
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
      />
    </div>
  );
}
