"use client";

import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";
import FileAdminPagination from "./FileAdminPagination";

type FileAdminTableProps = {
  files: GetAdminFileResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  onEdit: (file: GetAdminFileResponse) => void;
  onDelete: (file: GetAdminFileResponse) => void;
};

export default function FileAdminTable({
  files,
  isLoading,
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageSizeChange,
  onPageChange,
  onEdit,
  onDelete,
}: FileAdminTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-outline bg-white shadow-sm">
      <div className="block sm:hidden">
        {files.length === 0 ? (
          <div className="px-5 py-8 text-center text-secondary">Aucune prestation trouvé.</div>
        ) : (
          <div className="space-y-3 p-4">
            {files.map((file) => (
              <div key={file.id} className="rounded-2xl border border-outline bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Prestation</p>
                <p className="mt-2 text-sm font-medium text-dark">{file.name}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark"
                    onClick={() => onEdit(file)}
                    aria-label={`Modifier la prestation ${file.name}`}
                  >
                    <PencilLine size={16} />
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                    onClick={() => onDelete(file)}
                    aria-label={`Supprimer la prestation ${file.name}`}
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
              <th scope="col" className="px-5 py-3 text-left">
                Nom de la prestation
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-dark">
            {isLoading ? (
              <tr>
                <td colSpan={2} className="px-5 py-8 text-center text-secondary">
                  Chargement des prestations...
                </td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-5 py-8 text-center text-secondary">
                  Aucune prestation trouvée.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.id} className="border-b border-outline/70 hover:bg-surface">
                  <td className="px-5 py-4 font-medium">{file.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-outline px-3 text-dark"
                        onClick={() => onEdit(file)}
                        aria-label={`Modifier la prestation ${file.name}`}
                      >
                        <PencilLine size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-outline px-3 text-dark hover:border-red-200 hover:text-red-600"
                        onClick={() => onDelete(file)}
                        aria-label={`Supprimer la prestation ${file.name}`}
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

      <FileAdminPagination
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