"use client";

import { useFormContext } from "react-hook-form";
import {
  ContractFormValues,
  ContractType,
  contractTypeLabels,
  contractTypeToTemplate,
} from "@/validations/contract/contractFormSchema";
import ContractFieldError from "../components/ContractFieldError";

const inputClass =
  "w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77]";

export default function StepContractType() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ContractFormValues>();

  const contractType = watch("contractType");

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#7A430D] mb-1">Type de contrat *</label>
      <select {...register("contractType")} className={inputClass}>
        {(Object.entries(contractTypeLabels) as [ContractType, string][]).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <ContractFieldError message={errors.contractType?.message as string | undefined} />
    </div>
  );
}