"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import CrudModalHeader from "@/components/modals/CrudModalHeader";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";

type FileAdminDeleteModalProps = {
  open: boolean;
  file: GetAdminFileResponse | null;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isPending?: boolean;
};

export default function FileAdminDeleteModal({
  open,
  file,
  onClose,
  onConfirm,
  isPending = false,
}: FileAdminDeleteModalProps) {
  if (!file) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? undefined : onClose())}>
      <DialogContent className="max-w-md rounded-4xl border-outline bg-white p-6" showCloseButton={false}>
        <DialogHeader>
          <CrudModalHeader
            icon={AlertTriangle}
            title="Supprimer la prestation"
            description={`Cette action supprimera définitivement ${file.name}.`}
          />
          <DialogDescription className="sr-only">Confirmation de suppression</DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-outline px-5 text-dark"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            type="button"
            className="rounded-full bg-red-600 px-5 text-white hover:bg-red-700"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}