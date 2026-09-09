"use client";

import { useFormContext } from "react-hook-form";
import {
  ContractFormValues,
  isAvenant,
  isBTP,
  isCadre,
  isCDD,
  isTempsPartiel,
} from "@/validations/contract/contractFormSchema";
import ContractFieldError from "../components/ContractFieldError";
import ContractSectionTitle from "../components/ContractSectionTitle";

const inputClass =
  "w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none bg-white focus:border-[#C49A77]";
const labelClass = "block text-sm font-medium text-[#7A430D] mb-1";

export default function StepWorkSalary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ContractFormValues>();

  const contractType = watch("contractType");
  const showCDD = isCDD(contractType);
  const showBTP = isBTP(contractType);
  const showCadre = isCadre(contractType);
  const showAvenant = isAvenant(contractType);
  const showTempsPartiel = isTempsPartiel(contractType);
  const showWeeklyHours = !showAvenant && !showTempsPartiel;
  const showMonthlySalary = !showCadre && !showAvenant;
  const showAnnualSalary = showCadre || showAvenant;

  return (
    <div className="space-y-4">
      {!showAvenant && (
        <>
          <ContractSectionTitle title="Période d'essai" />
          <div>
            <label className={labelClass}>Durée</label>
            <input {...register("trialPeriod")} placeholder="ex : 2 mois" className={inputClass} />
          </div>
        </>
      )}

      <ContractSectionTitle title="Temps de travail" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {showWeeklyHours && (
          <div>
            <label className={labelClass}>Heures / semaine *</label>
            <input type="number" {...register("weeklyHours")} className={inputClass} />
            <ContractFieldError message={errors.weeklyHours?.message as string | undefined} />
          </div>
        )}

        {!showAvenant && (
          <div>
            <label className={labelClass}>Répartition horaires</label>
            <input {...register("workSchedule")} className={inputClass} />
          </div>
        )}

        {showAvenant && (
          <div>
            <label className={labelClass}>Jours travaillés / an *</label>
            <input type="number" {...register("forfaitDaysPerYear")} className={inputClass} />
            <ContractFieldError message={errors.forfaitDaysPerYear?.message as string | undefined} />
          </div>
        )}

        {showTempsPartiel && (
          <>
            <div>
              <label className={labelClass}>Nombre d'heures *</label>
              <input type="number" {...register("partTimeHours")} className={inputClass} />
              <ContractFieldError message={errors.partTimeHours?.message as string | undefined} />
            </div>
            <div>
              <label className={labelClass}>Par semaine ou par mois</label>
              <select {...register("partTimePeriod")} className={inputClass}>
                <option value="semaine">Par semaine</option>
                <option value="mois">Par mois</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Répartition jours / horaires *</label>
              <input {...register("partTimeSchedule")} className={inputClass} />
              <ContractFieldError message={errors.partTimeSchedule?.message as string | undefined} />
            </div>
          </>
        )}
      </div>

      <ContractSectionTitle title="Rémunération" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {showMonthlySalary && (
          <div>
            <label className={labelClass}>Salaire brut mensuel (€) *</label>
            <input type="number" step="0.01" {...register("monthlyGrossSalary")} className={inputClass} />
            <ContractFieldError message={errors.monthlyGrossSalary?.message as string | undefined} />
          </div>
        )}

        {showAnnualSalary && (
          <>
            <div>
              <label className={labelClass}>Salaire brut annuel (€) *</label>
              <input type="number" step="0.01" {...register("annualGrossSalary")} className={inputClass} />
              <ContractFieldError message={errors.annualGrossSalary?.message as string | undefined} />
            </div>
            <div>
              <label className={labelClass}>Versé en</label>
              <select {...register("salaryPayments")} className={inputClass}>
                <option value="12">12 mensualités</option>
                <option value="13">13 mensualités</option>
              </select>
            </div>
          </>
        )}

        {showCadre && (
          <div className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" {...register("hasVariablePay")} id="hasVariablePay" className="accent-[#7A430D]" />
            <label htmlFor="hasVariablePay" className="text-sm text-[#5A3200]">
              Part variable prévue
            </label>
          </div>
        )}
      </div>

      {showCDD && (
        <>
          <ContractSectionTitle title="CDD – Motif & durée" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Motif du recours *</label>
              <input {...register("cddReason")} className={inputClass} />
              <ContractFieldError message={errors.cddReason?.message as string | undefined} />
            </div>
            <div>
              <label className={labelClass}>Date de fin *</label>
              <input type="date" {...register("endDate")} className={inputClass} />
              <ContractFieldError message={errors.endDate?.message as string | undefined} />
            </div>
          </div>
        </>
      )}

      {showBTP && (
        <>
          <ContractSectionTitle title="BTP – Affectation chantier" />
          <div>
            <label className={labelClass}>Zone géographique chantier *</label>
            <input {...register("btpGeographicZone")} className={inputClass} />
            <ContractFieldError message={errors.btpGeographicZone?.message as string | undefined} />
          </div>
        </>
      )}
    </div>
  );
}