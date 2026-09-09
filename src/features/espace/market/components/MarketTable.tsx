"use client";

import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetMarketResponse } from "@/types/market/marketType";
import MarketPagination from "./MarketPagination";

type MarketTableProps = {
  markets: GetMarketResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  onOpen: (market: GetMarketResponse) => void;
  onEdit: (market: GetMarketResponse) => void;
  onDelete: (market: GetMarketResponse) => void;
};

export default function MarketTable({
  markets,
  isLoading,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageSizeChange,
  onPageChange,
  onOpen,
  onEdit,
  onDelete,
}: MarketTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline bg-white shadow-sm">
      <div className="block sm:hidden">
        {isLoading ? (
          <div className="px-5 py-8 text-center text-secondary">Chargement des appels d'offre...</div>
        ) : markets.length === 0 ? (
          <div className="px-5 py-8 text-center text-secondary">Aucun appel d'offre trouvé.</div>
        ) : (
          <div className="space-y-3 p-4">
            {markets.map((market) => (
              <div
                key={market.id}
                className="cursor-pointer rounded-2xl border border-outline bg-surface p-4 transition hover:bg-accent"
                onClick={() => onOpen(market)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen(market);
                  }
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Appel d'offre</p>
                <p className="mt-2 text-sm font-medium text-dark">{market.title}</p>
                <p className="text-xs">{new Date(market.limitDate).toLocaleDateString("fr-FR")}</p>
                <p className="mt-2 text-xs font-semibold">{market.buyer}</p>
                <p className="text-xs text-secondary">{market.typeMarket}</p>
                <p className="text-xs text-secondary">{market.location}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark"
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(market);
                    }}
                    aria-label={`Modifier l'appel d'offre ${market.title}`}
                  >
                    <PencilLine size={16} />
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(market);
                    }}
                    aria-label={`Supprimer l'appel d'offre ${market.title}`}
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
                <th scope="col" className="px-5 py-3 text-left">Titre</th>
                <th scope="col" className="px-5 py-3 text-left">Acheteur</th>
                <th scope="col" className="px-5 py-3 text-left">Type</th>
                <th scope="col" className="px-5 py-3 text-left">Région</th>
                <th scope="col" className="px-5 py-3 text-left">Date limite</th>
                <th scope="col" className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-dark">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-secondary">
                    Chargement des appels d'offre...
                  </td>
                </tr>
              ) : markets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-secondary">
                    Aucun appel d'offre trouvé.
                  </td>
                </tr>
              ) : (
                markets.map((market) => (
                  <tr
                    key={market.id}
                    className="cursor-pointer border-b border-outline/70 hover:bg-surface"
                    onClick={() => onOpen(market)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpen(market);
                      }
                    }}
                  >
                    <td className="px-5 py-4 font-medium">{market.title}</td>
                    <td className="px-5 py-4">{market.buyer}</td>
                    <td className="px-5 py-4">{market.typeMarket}</td>
                    <td className="px-5 py-4">{market.location}</td>
                    <td className="px-5 py-4">{new Date(market.limitDate).toLocaleDateString("fr-FR")}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full border-outline px-3 text-dark"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(market);
                          }}
                          aria-label={`Modifier l'appel d'offre ${market.title}`}
                        >
                          <PencilLine size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                          onClick={(event) => {
                            event.stopPropagation();
                            onDelete(market);
                          }}
                          aria-label={`Supprimer l'appel d'offre ${market.title}`}
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

      <MarketPagination
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
