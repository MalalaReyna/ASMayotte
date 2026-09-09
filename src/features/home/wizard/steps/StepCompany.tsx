"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import WizardFieldError from "../components/WizardFieldError";
import { WizardSchemaType } from "@/validations/wizard/wizardSchema";
import { useWizardStore } from "@/stores/wizardStore";

type Props = {
  register: UseFormRegister<WizardSchemaType>;
  errors: FieldErrors<WizardSchemaType>;
};

export default function StepCompany({ register, errors }: Props) {
  const shouldHaveCapitalSocial = useWizardStore((s) => s.data).legalStructure.hasCapitalSocial;
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-[#7A430D] font-medium">Nom de l&apos;entreprise ? *</span>
        <input {...register("companyName")} placeholder="Ex: Ma société SARL" className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none" />
        <WizardFieldError message={errors.companyName?.message} />
      </label>

      <label className="block">
        <span className="text-[#7A430D] font-medium">Localisation *</span>
        <select {...register("location")} className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none bg-white">
          <option value="">Sélectionnez une localisation</option>
          <option>Mayotte</option>
          <option>La Réunion</option>
          <option>Guyane</option>
          <option>Martinique</option>
          <option>Guadeloupe</option>
          <option>France Métropolitaine</option>
        </select>
        <WizardFieldError message={errors.location?.message} />
      </label>

      <label className="block">
        <span className="text-[#7A430D] font-medium">Adresse du siège social *</span>
        <input {...register("address")} placeholder="Ex: 12 Rue de la République" className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none" />
        <WizardFieldError message={errors.address?.message} />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[#7A430D] font-medium">Code Postal *</span>
          <input {...register("postalCode")} placeholder="Ex: 000101" className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none" />
          <WizardFieldError message={errors.postalCode?.message} />
        </label>
        <label className="block">
          <span className="text-[#7A430D] font-medium">Ville *</span>
          <input {...register("city")} placeholder="Ex: Mamoudzou" className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none" />
          <WizardFieldError message={errors.city?.message} />
        </label>

        {shouldHaveCapitalSocial ? (
          <>
            <label className="block">
              <span className="text-[#7A430D] font-medium">Capital social *</span>
              <input
                {...register("capital")}
                placeholder="Montant en euros"
                className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                type={`number`} />
              <WizardFieldError message={errors.capital?.message as string | undefined} />
            </label>
          </>

        ) : null}

      </div>
    </div>
  );
}