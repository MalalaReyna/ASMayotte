"use client";

import { useFormContext } from "react-hook-form";
import { ContractFormValues } from "@/validations/contract/contractFormSchema";
import ContractFieldError from "../components/ContractFieldError";
import ContractSectionTitle from "../components/ContractSectionTitle";

const inputClass =
  "w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77]";
const labelClass = "block text-sm font-medium text-[#7A430D] mb-1";

export default function StepEmployeePosition() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ContractFormValues>();

  const contractType = watch("contractType");
  const showHierarchy =
    contractType === "CDI_SERVICE_MAITRISE" || contractType === "CDI_SERVICE_CADRE";

  return (
    <div className="space-y-4">
      <ContractSectionTitle title="Salarié" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Nom complet *</label>
          <input {...register("employeeFullName")} className={inputClass} />
          <ContractFieldError message={errors.employeeFullName?.message as string | undefined} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Adresse *</label>
          <input {...register("employeeAddress")} className={inputClass} />
          <ContractFieldError message={errors.employeeAddress?.message as string | undefined} />
        </div>
      </div>

      <ContractSectionTitle title="Poste & classification" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Intitulé du poste *</label>
          <input {...register("jobTitle")} className={inputClass} />
          <ContractFieldError message={errors.jobTitle?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Lieu de travail *</label>
          <input {...register("workplace")} className={inputClass} />
          <ContractFieldError message={errors.workplace?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Date de début *</label>
          <input type="date" {...register("startDate")} className={inputClass} />
          <ContractFieldError message={errors.startDate?.message as string | undefined} />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <input {...register("category")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Niveau</label>
          <input {...register("level")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Échelon</label>
          <input {...register("echelon")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Coefficient</label>
          <input {...register("coefficient")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Convention collective</label>
          <input {...register("collectiveAgreement")} className={inputClass} />
        </div>

        {showHierarchy && (
          <div>
            <label className={labelClass}>Supérieur hiérarchique *</label>
            <input {...register("directSupervisor")} className={inputClass} />
            <ContractFieldError message={errors.directSupervisor?.message as string | undefined} />
          </div>
        )}

        <div className="md:col-span-2">
          <label className={labelClass}>Missions principales</label>
          <textarea
            {...register("mainMissions")}
            rows={3}
            className="w-full rounded-2xl border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77] resize-y"
          />
        </div>
      </div>
    </div>
  );
}