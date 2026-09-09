"use client";

import { useFormContext } from "react-hook-form";
import {
  ContractFormValues,
  contractTypeLabels,
} from "@/validations/contract/contractFormSchema";
import ContractFieldError from "../components/ContractFieldError";
import ContractSectionTitle from "../components/ContractSectionTitle";

const inputClass =
  "w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77]";
const labelClass = "block text-sm font-medium text-[#7A430D] mb-1";

export default function StepSignatureRecap() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ContractFormValues>();

  const contractType = watch("contractType");
  const companyName = watch("companyName");
  const employeeFullName = watch("employeeFullName");
  const jobTitle = watch("jobTitle");
  const startDate = watch("startDate");

  return (
    <div className="space-y-4">
      <ContractSectionTitle title="Signature" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Fait à (ville) *</label>
          <input {...register("signatureCity")} className={inputClass} />
          <ContractFieldError message={errors.signatureCity?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Le (date) *</label>
          <input type="date" {...register("signatureDate")} className={inputClass} />
          <ContractFieldError message={errors.signatureDate?.message as string | undefined} />
        </div>
      </div>

      <ContractSectionTitle title="Récapitulatif" />
      <div className="rounded-2xl border border-[#E6D8CC] bg-[#FCFAF7] p-4 text-sm text-[#4A2B0A] grid gap-1">
        <p><strong>Type :</strong> {contractTypeLabels[contractType]}</p>
        <p><strong>Entreprise :</strong> {companyName || "-"}</p>
        <p><strong>Salarié :</strong> {employeeFullName || "-"}</p>
        <p><strong>Poste :</strong> {jobTitle || "-"}</p>
        <p><strong>Date de début :</strong> {startDate || "-"}</p>
      </div>
    </div>
  );
}