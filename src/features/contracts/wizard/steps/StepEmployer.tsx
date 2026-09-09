"use client";

import { useFormContext } from "react-hook-form";
import { ContractFormValues } from "@/validations/contract/contractFormSchema";
import ContractFieldError from "../components/ContractFieldError";
import ContractSectionTitle from "../components/ContractSectionTitle";

const inputClass =
  "w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77]";
const labelClass = "block text-sm font-medium text-[#7A430D] mb-1";

export default function StepEmployer() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContractFormValues>();

  return (
    <div className="space-y-4">
      <ContractSectionTitle title="Employeur" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Dénomination sociale *</label>
          <input {...register("companyName")} className={inputClass} />
          <ContractFieldError message={errors.companyName?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Forme sociale *</label>
          <input {...register("companyLegalForm")} className={inputClass} />
          <ContractFieldError message={errors.companyLegalForm?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>SIREN / SIRET *</label>
          <input {...register("companySiren")} className={inputClass} />
          <ContractFieldError message={errors.companySiren?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Capital</label>
          <input {...register("companyCapital")} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Adresse du siège *</label>
          <input {...register("companyAddress")} className={inputClass} />
          <ContractFieldError message={errors.companyAddress?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Représentant légal *</label>
          <input {...register("legalRepresentative")} className={inputClass} />
          <ContractFieldError message={errors.legalRepresentative?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Qualité *</label>
          <input {...register("legalRepresentativeTitle")} className={inputClass} />
          <ContractFieldError message={errors.legalRepresentativeTitle?.message as string | undefined} />
        </div>
      </div>
    </div>
  );
}