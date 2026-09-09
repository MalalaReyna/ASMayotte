"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CheckoutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stripe: Promise<Stripe | null> | null;
  fetchClientSecret: () => Promise<string>;
};

export default function CheckoutModal({
  open,
  onOpenChange,
  stripe,
  fetchClientSecret,
}: CheckoutModalProps) {
  if (!stripe) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <p className="text-sm text-red-600">Clé Stripe manquante.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-outline bg-white" showCloseButton>
        <DialogHeader>
          <DialogTitle>Finaliser le paiement</DialogTitle>
          <DialogDescription>
            Votre demande sera traitée après paiement.
          </DialogDescription>
        </DialogHeader>

        {open ? (
          <EmbeddedCheckoutProvider
            stripe={stripe}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout className="max-h-[80vh] overflow-y-auto" />
          </EmbeddedCheckoutProvider>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}