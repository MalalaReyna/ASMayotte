"use client";

import { useState } from "react";
import { FieldPath, FormProvider, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContractFormValues,
  ContractType,
  contractFormSchema,
  isAvenant,
  isBTP,
  isCadre,
  isCDD,
  isTempsPartiel,
} from "@/validations/contract/contractFormSchema";
import StepContractType from "./wizard/steps/StepContractType";
import StepEmployeePosition from "./wizard/steps/StepEmployeePosition";
import StepEmployer from "./wizard/steps/StepEmployer";
import StepSignatureRecap from "./wizard/steps/StepSignatureRecap";
import StepWorkSalary from "./wizard/steps/StepWorkSalary";
import WizardButton from "../home/wizard/components/WizardButton";
const TOTAL_STEPS = 5;

const stepMeta = {
  1: { title: "Type de contrat", description: "Choisissez le type de contrat adapté." },
  2: { title: "Employeur", description: "Informations de l'entreprise." },
  3: { title: "Salarié & poste", description: "Informations du salarié et du poste." },
  4: {
    title: "Temps de travail & rémunération",
    description:
      "Renseignez les conditions du contrat.",
  },
  5: { title: "Signature & vérification", description: "Vérifiez avant génération." },
} as const;

function getStepFields(
  step: number,
  contractType: ContractType
): FieldPath<ContractFormValues>[] {
  const base: Record<number, FieldPath<ContractFormValues>[]> = {
    1: ["contractType"],
    2: [
      "companyName",
      "companyLegalForm",
      "companySiren",
      "companyAddress",
      "legalRepresentative",
      "legalRepresentativeTitle",
    ],
    3: ["employeeFullName", "employeeAddress", "jobTitle", "workplace", "startDate"],
    4: [],
    5: ["signatureCity", "signatureDate"],
  };

  const fields = [...(base[step] ?? [])];

  if (step === 3) {
    if (contractType === "CDI_SERVICE_MAITRISE" || contractType === "CDI_SERVICE_CADRE") {
      fields.push("directSupervisor");
    }
  }

  if (step === 4) {
    const needsAnnual = isCadre(contractType) || isAvenant(contractType);
    if (needsAnnual) fields.push("annualGrossSalary");
    else fields.push("monthlyGrossSalary");

    if (!isAvenant(contractType) && !isTempsPartiel(contractType)) {
      fields.push("weeklyHours");
    }

    if (isCDD(contractType)) {
      fields.push("cddReason", "endDate");
    }

    if (isBTP(contractType)) {
      fields.push("btpGeographicZone");
    }

    if (isAvenant(contractType)) {
      fields.push("forfaitDaysPerYear");
    }

    if (isTempsPartiel(contractType)) {
      fields.push("partTimeHours", "partTimeSchedule");
    }
  }

  return fields;
}

async function generateContract(values: ContractFormValues): Promise<{ htmlString: string }> {
  const response = await fetch("/api/contracts/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data.message === "string"
        ? data.message
        : "Erreur lors de la generation du contrat.";
    throw new Error(message);
  }

  if (!data || typeof data.htmlString !== "string" || data.htmlString.length === 0) {
    throw new Error("Le service n'a pas retourne de contenu HTML.");
  }

  return { htmlString: data.htmlString };
}

export default function GenerateContractForm() {
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema) as Resolver<ContractFormValues>,
    mode: "onTouched",
    defaultValues: {
      contractType: "CDI_SERVICE_EMPLOYE",
      weeklyHours: 35,
      salaryPayments: "12",
    },
  });

  const {
    handleSubmit,
    trigger,
    watch,
  } = methods;

  const contractType = watch("contractType");
  const isLast = step === TOTAL_STEPS;

  const next = async () => {
    const fields = getStepFields(step, contractType);
    //ca fait la validation du step en cours ici
    const valid = fields.length === 0 ? true : await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (values: ContractFormValues) => {
    setSubmitError(null);
    setGeneratedHtml(null);
    setIsSubmitting(true);

    try {
      const result = await generateContract(values);
      setGeneratedHtml(result.htmlString);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Une erreur inattendue est survenue."
      );
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!generatedHtml) return;

    setSubmitError(null);
    setIsDownloadingPdf(true);

    let container: HTMLDivElement | null = null;

    try {
      const [{ default: DOMPurify }, html2pdfModule] = await Promise.all([
        import("dompurify"),
        import("html2pdf.js"),
      ]);

      const html2pdf = (html2pdfModule as unknown as { default: any }).default;

      container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-99999px";
      container.style.top = "0";
      container.style.width = "794px"; // largeur A4 approx en px
      container.style.background = "#fff";
      container.innerHTML = DOMPurify.sanitize(generatedHtml);
      

      document.body.appendChild(container);
      
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: "contrat-travail.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .from(container)
        .save();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Impossible de convertir le document en PDF."
      );
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      setIsDownloadingPdf(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-[#E6D8CC] bg-white p-5 md:p-8 space-y-6 shadow-sm"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#7A430D]">
            {stepMeta[step as keyof typeof stepMeta].title}
          </h2>
          <p className="text-sm text-[#8C7A6B] mt-1">
            <strong>{stepMeta[step as keyof typeof stepMeta].description}</strong>
          </p>
          <p className="text-xs text-[#8C7A6B] mt-1">Les champs * sont obligatoires</p>

        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${i + 1 <= step ? "bg-[#7A430D]" : "bg-[#E7DED6]"}`}
            />
          ))}
        </div>

        {step === 1 && <StepContractType />}
        {step === 2 && <StepEmployer />}
        {step === 3 && <StepEmployeePosition />}
        {step === 4 && <StepWorkSalary />}
        {step === 5 && <StepSignatureRecap />}

        <hr className="border-[#E6D8CC]" />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={prev}
            disabled={step === 1}
            className="rounded-full px-5 py-2.5 border border-[#E6D8CC] text-[#7A430D] disabled:opacity-50 hover:cursor-pointer"
          >
            Précédent
          </button>

          <WizardButton
            type="button"
            disabled={isSubmitting}
            onClick={isLast ? handleSubmit(onSubmit) : next}
          >
            {isLast ? isSubmitting ? "Préparation..." : "Préparer la génération" : "Suivant"
            }
          </WizardButton>
        </div>

        {submitError && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        {generatedHtml && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-emerald-800 mb-2">Contrat genere avec succes.</p>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-block rounded-full px-4 py-2 bg-emerald-700 text-white text-sm disabled:opacity-60"
            >
              {isDownloadingPdf ? "Conversion PDF..." : "Telecharger le PDF"}
            </button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
