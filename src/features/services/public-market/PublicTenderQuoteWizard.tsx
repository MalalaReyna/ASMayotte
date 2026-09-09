"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetMarketResponse } from "@/types/market/marketType";
import { sendDmdDevis } from "@/services/devis/devisService";
import {
  defaultDevisValues,
  devisSchema,
  devisStepFields,
  DevisFormValues,
} from "@/validations/devis/devisSchema";
import StepMarket from "./quote-wizard/StepMarket";
import StepEnterprise from "./quote-wizard/StepEnterprise";
import StepServices from "./quote-wizard/StepServices";
import StepConstraints from "./quote-wizard/StepConstraints";
import StepSummary from "./quote-wizard/StepSummary";
import { IActivitySector } from "@/interfaces/activity/activity";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";

const steps = [
  "Marché",
  "Entreprise",
  "Prestations",
  "Contraintes",
  "Résumé",
];

type PublicTenderQuoteWizardProps = {
  open: boolean;
  tender: GetMarketResponse | null;
  onOpenChange: (open: boolean) => void;
  activitySectors: IActivitySector[];
  services: GetAdminFileResponse[];
};

export default function PublicTenderQuoteWizard({
  open,
  tender,
  onOpenChange,
  activitySectors,
  services
}: PublicTenderQuoteWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<DevisFormValues>({
    resolver: zodResolver(devisSchema),
    defaultValues: defaultDevisValues,
    mode: "onTouched",
  });

  const { handleSubmit, trigger, reset, register } = form;

  const mutation = useMutation({
    mutationFn: async (values: DevisFormValues) => sendDmdDevis(values),
    onMutate: () => {
      toast.info("Envoi en cours...");
    },
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'envoi.";
      toast.error(message);
    },
  });

  useEffect(() => {
    if (open) {
      setStepIndex(0);
      setShowSuccess(false);
    }
  }, [open, tender]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  const stepCount = steps.length;

  const buyer = tender?.buyer || "Acheteur non renseigne";
  const location = tender?.location || "Lieu non renseigne";

  useEffect(() => {
    if (!open || !tender) return;
    reset({
      ...defaultDevisValues,
      idMarket: tender.id,
      adminFiles: [],
    });
  }, [open, tender, services, reset]);

  if (!tender) return null;

  const isLast = stepIndex === stepCount - 1;


  const next = async () => {
    const fields = devisStepFields[stepIndex] ?? [];
    const valid =
      fields.length === 0
        ? true
        : await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setStepIndex((prev) => Math.min(prev + 1, stepCount - 1));
  };

  const prev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const onSubmit = (values: DevisFormValues) => {
    if (!isLast) {
      next();
      return;
    }
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="flex max-h-[90vh] max-w-2xl flex-col overflow-hidden rounded-4xl border-outline bg-white p-6"
        showCloseButton
      >
        <FormProvider {...form}>
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (!isLast) {
                next();
                return;
              }
              handleSubmit(onSubmit)(event);
            }}
          >
            <input type="hidden" {...register("idMarket")} />
            <DialogHeader>
              {showSuccess ? (
                <>
                  <span className="w-fit rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
                    Succès
                  </span>
                  <DialogTitle className="text-2xl text-dark">
                    Demande de devis envoyée
                  </DialogTitle>
                </>
              ) : (
                <>
                  <span className="w-fit rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
                    Demande de devis pre-remplie
                  </span>
                  <DialogTitle className="text-2xl text-dark">
                    Obtenir un devis A&S Mayotte
                  </DialogTitle>
                  <DialogDescription className="text-sm text-secondary">
                    Marché selectionné : {tender.title}
                  </DialogDescription>
                </>
              )}
            </DialogHeader>
            <div ref={scrollAreaRef} className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 pb-2">
              {showSuccess ? (
                <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-6 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-dark">
                      Vous serez bientôt contacté par e-mail.
                    </p>
                    <p className="text-sm text-primary">
                       Gardez un oeil sur votre messagerie.
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      type="button"
                      className="rounded-full bg-primary px-8 text-white hover:bg-primary/90"
                      onClick={() => onOpenChange(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))`,
                    }}
                  >
                    {steps.map((step, index) => (
                      <div
                        key={step}
                        className={`h-2 rounded-full ${index <= stepIndex ? "bg-primary" : "bg-outline"
                          }`}
                      />
                    ))}
                  </div>

                  {stepIndex === 0 ? (
                    <StepMarket tender={tender} buyer={buyer} location={location} />
                  ) : null}

                  {stepIndex === 1 ? <StepEnterprise activitySectors={activitySectors} /> : null}

                  {stepIndex === 2 ? <StepServices services={services} /> : null}

                  {stepIndex === 3 ? (
                    <StepConstraints limitDate={tender.limitDate} />
                  ) : null}

                  {stepIndex === 4 ? (
                    <StepSummary
                      tender={tender}
                      buyer={buyer}
                      location={location}
                      activitySectors={activitySectors}
                      services={services}
                    />
                  ) : null}

                  <div className="mt-8 mb-2 flex flex-wrap justify-between gap-3 pb-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full border-outline px-6 text-dark"
                      onClick={prev}
                      disabled={stepIndex === 0}
                    >
                      Retour
                    </Button>
                    <Button
                      type="button"
                      className="rounded-full bg-primary px-6 text-white hover:bg-primary/90"
                      onClick={isLast ? handleSubmit(onSubmit) : next}
                      disabled={mutation.isPending}
                    >
                      {isLast ? "Envoyer la demande" : "Continuer"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
