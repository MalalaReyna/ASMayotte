"use client";

import { Button } from "@/components/ui/button";
import { GetDevisResponse } from "@/types/devis/devisType";
import DevisPagination from "./DevisPagination";

type DevisTableProps = {
  devis: GetDevisResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  onOpen: (devis: GetDevisResponse) => void;
};

export default function DevisTable({
  devis,
  isLoading,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageSizeChange,
  onPageChange,
  onOpen,
}: DevisTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline bg-white shadow-sm">
      <div className="block sm:hidden">
        {isLoading ? (
          <div className="px-5 py-8 text-center text-secondary">Chargement des devis...</div>
        ) : devis.length === 0 ? (
          <div className="px-5 py-8 text-center text-secondary">Aucun devis trouvé.</div>
        ) : (
          <div className="space-y-3 p-4">
            {devis.map((devisItem) => (
              <div
                key={devisItem.id}
                className="cursor-pointer rounded-2xl border border-outline bg-surface p-4 transition hover:bg-accent"
                onClick={() => onOpen(devisItem)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen(devisItem);
                  }
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Devis</p>
                <p className="mt-2 text-sm font-medium text-dark">{devisItem.enterpriseName}</p>
                <p className="mt-1 text-xs text-secondary">{devisItem.responsableName}</p>
                <p className="text-xs text-secondary">Créé le {new Date(devisItem.createdAt).toLocaleDateString("fr-FR")}</p>
                <p className="mt-4 text-xs text-secondary">Cliquez pour ouvrir le détail.</p>
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
                <th scope="col" className="px-5 py-3 text-left">Nom du devis</th>
                <th scope="col" className="px-5 py-3 text-left">Responsable</th>
                <th scope="col" className="px-5 py-3 text-left">SIRET</th>
                <th scope="col" className="px-5 py-3 text-left">Créé le</th>
                <th scope="col" className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-dark">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-secondary">
                    Chargement des devis...
                  </td>
                </tr>
              ) : devis.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-secondary">
                    Aucun devis trouvé.
                  </td>
                </tr>
              ) : (
                devis.map((devisItem) => (
                  <tr
                    key={devisItem.id}
                    className="cursor-pointer border-b border-outline/70 hover:bg-surface"
                    onClick={() => onOpen(devisItem)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpen(devisItem);
                      }
                    }}
                  >
                    <td className="px-5 py-4 font-medium">{devisItem.enterpriseName}</td>
                    <td className="px-5 py-4">{devisItem.responsableName}</td>
                    <td className="px-5 py-4">{devisItem.siret}</td>
                    <td className="px-5 py-4">{new Date(devisItem.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td className="px-5 py-4 text-right text-xs text-secondary">Ouvrir le détail</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DevisPagination
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
