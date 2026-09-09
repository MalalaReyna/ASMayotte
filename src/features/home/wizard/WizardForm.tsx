"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import WizardCard from "./WizardCard";
import WizardButton from "./components/WizardButton";
import StepLegalStructure from "./steps/StepLegalStructure";
import StepCompany from "./steps/StepCompany";
import StepActivity from "./steps/StepActivity";
import StepAssociates from "./steps/StepAssociates";
import StepLeaders from "@/features/home/wizard/steps/StepLeaders";
import WizardRecap from "./WizardRecap";
import { defaultWizardFormData, stepFields, wizardSchema, WizardSchemaType } from "../../../validations/wizard/wizardSchema";
import { useWizardStore } from "@/stores/wizardStore";
import SuccessRequestModal from "@/components/modals/SuccessRequestModal";
import { normalizeStep, getStepFromHash, replaceHash, TOTAL_STEPS, stepMeta, stepInfo } from "./wizardData";
import { IService } from "@/interfaces/service/service";
import { slugify } from "@/helpers/stringHelper";
import { IActivitySector } from "@/interfaces/activity/activity";
import { mapWizardFormDataToRequest, createDmdCreationEntreprise, fetchClientSecret } from "@/services/wizard/wizardService";
import { DmdCreationEntrepriseRequest } from "@/types/wizardTypes";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutModal from "./components/CheckoutModal";

interface WizardFormProps {
  legalJuridictions: IService[];
  activitySectors: IActivitySector[];
}
//  Stripe init
const stripePromise = (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) ? null : loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function WizardForm({ legalJuridictions, activitySectors }: WizardFormProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const isMyselfCompany = !useWizardStore((s) => s.data?.legalStructure.hasCapitalSocial);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const storedData = useWizardStore((s) => s.data);
  const currentStep = useWizardStore((s) => s.currentStep);
  const setStoreData = useWizardStore((s) => s.setData);
  const setCurrentStep = useWizardStore((s) => s.setCurrentStep);
  const clearStoreData = useWizardStore((s) => s.clearData);

  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<WizardSchemaType>({
    resolver: zodResolver(wizardSchema),
    defaultValues: storedData ?? defaultWizardFormData,
    mode: "onTouched",
  });

  /* const mutation = useMutation({
    mutationFn: async (values: DmdCreationEntrepriseRequest) => {
      return await createDmdCreationEntreprise(values);
    },
    onMutate: () => {
      toast.info("Envoi en cours...");
    },
    onSuccess: () => {
      toast.success("Demande envoyée avec succès !");
      setOpenSuccessModal(true);
      clearStoreData();
      setCurrentStep(1);
      replaceHash(1);
    },
    onError: (err) => {
      toast.error(err.message ? err.message : "Une erreur est survenue lors de l'envoi.");
    }
  }); */

  useEffect(() => {
    // gestion ?type=
    const type = searchParams.get("type");
    if (type) {
      //prendre le legal structure correspondant dans legalJuridictions
      const legalStructure = legalJuridictions.find((s) => slugify(s.name) === type);
      if (legalStructure) {
        // clean l'URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("type");

        const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
        window.history.replaceState(null, "", newUrl);
        //AJOUTER LEGAL STRUCTURE DANS LE STORE
        setStoreData({
          ...storedData,
          legalStructure: legalStructure,
        });
        setCurrentStep(2);
      }
    }
  }, [searchParams]);


  useEffect(() => {
    reset(storedData ?? defaultWizardFormData);
  }, [storedData, reset]);

  // Sync initial + hashchange:
  // le store est source de vérité pour le step
  useEffect(() => {
    const initStoreStep = normalizeStep(currentStep);
    if (initStoreStep !== currentStep) {
      setCurrentStep(initStoreStep);
    }

    const hashStep = getStepFromHash();
    if (hashStep !== initStoreStep) {
      replaceHash(initStoreStep);
    }

    const onHashChange = () => {
      const s = normalizeStep(useWizardStore.getState().currentStep);
      const h = getStepFromHash();
      if (h !== s) replaceHash(s);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [currentStep, setCurrentStep]);

  // Si le step store change, URL doit suivre
  useEffect(() => {
    if (typeof window === "undefined") return;
    replaceHash(normalizeStep(currentStep));
  }, [currentStep]);

  const isLast = currentStep === TOTAL_STEPS;

  const next = async () => {
    const step = normalizeStep(currentStep);
    //si changement de legalstructure on clean tout les données du store pour eviter les data inchoherente
    if (getValues().legalStructure.id !== storedData.legalStructure.id) {
      setStoreData({
        ...defaultWizardFormData,
        legalStructure: getValues().legalStructure,
      })
    }
    const fields = stepFields[step as keyof typeof stepFields];
    const valid = fields.length === 0 ? true : await trigger(fields, { shouldFocus: true });
    if (!valid) return;

    if (step === 5) {
      const hasAtLeastOneLeader = getValues().associates.some((associate) => associate.isLeader);
      if (!hasAtLeastOneLeader) {
        setError("associates", {
          type: "custom",
          message: "Veuillez sélectionner au moins un dirigeant.",
        });
        return;
      }
      clearErrors("associates");
    }

    // update store uniquement après validation du step
    setStoreData(getValues());

    const nextStep = Math.min(TOTAL_STEPS, step + 1);
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    const prevStep = Math.max(1, normalizeStep(currentStep) - 1);
    setCurrentStep(prevStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (data: WizardSchemaType) => {
    setStoreData(data);
    if (status === "loading") return;

    if (status !== "authenticated") {
      const callbackUrl = encodeURIComponent("/wizard#6");
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    // ON OUVRE STRIPE AU LIEU D’ENVOYER
    setCheckoutOpen(true);

    /* const requestData = mapWizardFormDataToRequest(data, session?.user?.id || "");
    mutation.mutate(requestData); */
  };

  const fetchClientSecretForCheckout = useCallback(() => {
    const requestData = mapWizardFormDataToRequest(
      getValues(),
      session?.user?.id ?? "",
      session?.accessToken ?? ""
    );
    return fetchClientSecret(requestData);
  }, [getValues, session?.user?.id]);

  return (
    <>
      <form className="w-full flex justify-center" onSubmit={handleSubmit(onSubmit)}>
        <WizardCard
          title={
            isMyselfCompany && normalizeStep(currentStep) === 4
              ? "Vos informations"
              :
              stepMeta[normalizeStep(currentStep) as keyof typeof stepMeta].title
          }
          description={
            isMyselfCompany && normalizeStep(currentStep) === 4
              ? "Renseignez les informations vous concernant"
              :
              stepMeta[normalizeStep(currentStep) as keyof typeof stepMeta].description
          }
        >
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${TOTAL_STEPS}, minmax(0, 1fr))` }}>
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${i + 1 <= normalizeStep(currentStep) ? "bg-primary" : "bg-outline"}`}
              />
            ))}
          </div>

          {normalizeStep(currentStep) === 1 && (
            <StepLegalStructure legalJuridictions={legalJuridictions} register={register} control={control} errors={errors} />
          )}

          {normalizeStep(currentStep) === 2 && <StepCompany register={register} errors={errors} />}

          {normalizeStep(currentStep) === 3 && (
            <StepActivity activitySectors={activitySectors} control={control} errors={errors} />
          )}

          {normalizeStep(currentStep) === 4 && (
            <StepAssociates control={control} register={register} errors={errors} isMyselfCompany={isMyselfCompany} />
          )}

          {normalizeStep(currentStep) === 5 && (
            <StepLeaders
              control={control}
              register={register}
              setValue={setValue}
              errors={errors}
              isMyselfCompany={isMyselfCompany}
            />
          )}

          {normalizeStep(currentStep) === 6 && <WizardRecap />}

          {submitError ? (
            <p className="text-sm text-red-600">{submitError}</p>
          ) : null}

          {/* <div className="rounded-2xl border border-outline bg-surface px-4 py-3 flex items-start gap-2">
            <CircleAlert size={16} className="mt-0.5 text-[#7A430D]" />
            <p className="text-sm text-[#2F241B]">
              <strong>{normalizeStep(currentStep) === TOTAL_STEPS ? "Prêt à soumettre ? " : "Important : "}</strong>
              {stepInfo[normalizeStep(currentStep) as keyof typeof stepInfo]}
            </p>
          </div> */}
          {normalizeStep(currentStep) !== 4 && (
            <div className="rounded-2xl border border-outline bg-surface px-4 py-3 flex items-start gap-2">
              <CircleAlert size={16} className="mt-0.5 text-[#7A430D]" />
              <p className="text-sm text-[#2F241B]">
                <strong>{normalizeStep(currentStep) === TOTAL_STEPS ? "Prêt à soumettre ? " : "Important : "}</strong>
                {stepInfo[normalizeStep(currentStep) as keyof typeof stepInfo]}
              </p>
            </div>
          )}

          <hr className="border-outline" />

          <div className="flex justify-between items-center">
            <WizardButton
              type="button"
              onClick={prev}
              disabled={normalizeStep(currentStep) === 1}
              variant={normalizeStep(currentStep) === 1 ? "disabled" : "primary"}
            >
              Précédent
            </WizardButton>

            <div className="flex items-center gap-1.5 hidden md:flex">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i + 1 === normalizeStep(currentStep) ? "bg-[#7A430D] w-4" : "bg-[#E7DED6]"
                    }`}
                />
              ))}
            </div>

            <WizardButton
              type="button"
              onClick={isLast ? handleSubmit(onSubmit) : next}
              disabled={/* mutation.isPending */ checkoutOpen}
            >
              {isLast ? "Soumettre la demande" : "Suivant"}
            </WizardButton>
          </div>
        </WizardCard>
      </form>

      {!isLast ? <WizardRecap /> : null}

      {/* Stripe Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        stripe={stripePromise}
        fetchClientSecret={fetchClientSecretForCheckout}
      />
      <SuccessRequestModal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
      />
    </>
  );
}