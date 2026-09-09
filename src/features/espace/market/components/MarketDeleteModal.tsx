"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import CrudModalHeader from "@/components/modals/CrudModalHeader";
import { GetMarketResponse } from "@/types/market/marketType";

type MarketDeleteModalProps = {
  open: boolean;
  market: GetMarketResponse | null;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isPending?: boolean;
};

export default function MarketDeleteModal({
  open,
  market,
  onClose,
  onConfirm,
  isPending = false,
}: MarketDeleteModalProps) {
  if (!market) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? undefined : onClose())}>
      <DialogContent className="max-w-md rounded-4xl border-outline bg-white p-6" showCloseButton={false}>
        <DialogHeader>
          <CrudModalHeader
            icon={AlertTriangle}
            title="Supprimer l'appel d'offre"
            description={`Cette action supprimera définitivement ${market.title}.`}
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
