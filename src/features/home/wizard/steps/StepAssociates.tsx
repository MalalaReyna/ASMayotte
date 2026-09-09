"use client";

import { Control, FieldErrors, UseFormRegister, useFieldArray, useWatch } from "react-hook-form";
import WizardFieldError from "../components/WizardFieldError";
import { Trash } from "lucide-react";
import {
  defaultAssociate,
  MaritalRegime,
  MaritalStatus,
  WizardSchemaType,
} from "@/validations/wizard/wizardSchema";
import { useWizardStore } from "@/stores/wizardStore";
import { slugify } from "@/helpers/stringHelper";

type Props = {
  control: Control<WizardSchemaType>;
  register: UseFormRegister<WizardSchemaType>;
  errors: FieldErrors<WizardSchemaType>;
  isMyselfCompany:boolean;
};

export default function StepAssociates({ control, register, errors,isMyselfCompany }: Props) {
  const currentLegalStructure = useWizardStore((s) => s.data?.legalStructure.name)
  const isOneAssociate = slugify(currentLegalStructure || "") === "eurl" || slugify(currentLegalStructure || "") === "sasu";
  const { fields, append, remove } = useFieldArray({
    control,
    name: "associates",
  });
  const associates = useWatch({ control, name: "associates" });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const maritalStatus = associates?.[index]?.maritalStatus;
        const isMarriedOrPacs =
          maritalStatus === MaritalStatus.MARRIED || maritalStatus === MaritalStatus.PACS;

        return (
          <div key={field.id} className="space-y-3 border border-[#E6D8CC] rounded-2xl p-4">

            {fields.length > 1 && (
              <div className="text-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-sm text-red-500 cursor-pointer rounded-full hover:underline"
                >
                  <p className="">
                    <Trash size={20} className="inline-block" /> Supprimer l'associé
                  </p>
                </button>
              </div>
            )}
            <label className="block">
              <span className="text-[#7A430D] font-medium">Nom complet *</span>
              <input
                {...register(`associates.${index}.name`)}
                placeholder="Jean Du Pont"
                className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
              />
              <WizardFieldError message={errors.associates?.[index]?.name?.message} />
            </label>

            <label className="block">
              <span className="text-[#7A430D] font-medium">Email *</span>
              <input
                {...register(`associates.${index}.email`)}
                placeholder="exemple@email.com"
                className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
              />
              <WizardFieldError message={errors.associates?.[index]?.email?.message} />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[#7A430D] font-medium">Montant *</span>
                <input
                  type="number"
                  min={0}
                  // max={100}
                  // step="0.01"
                  {...register(`associates.${index}.sharePercentage`, { valueAsNumber: true })}
                  placeholder="100"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <p className="text-sm text-[#A78C75] mt-1">Montant du capital détenu</p>
                <WizardFieldError message={errors.associates?.[index]?.sharePercentage?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Téléphone *</span>
                <input
                  {...register(`associates.${index}.phoneNumber`)}
                  placeholder="261XXXXX"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.phoneNumber?.message} />
              </label>

              <label className="block md:col-span-2">
                <span className="text-[#7A430D] font-medium">Adresse complète *</span>
                <input
                  {...register(`associates.${index}.fullAddress`)}
                  placeholder="12 rue Exemple"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.fullAddress?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Ville *</span>
                <input
                  {...register(`associates.${index}.city`)}
                  placeholder="Mamoudzou"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.city?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Pays *</span>
                <input
                  {...register(`associates.${index}.country`)}
                  placeholder="France"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.country?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Ville de naissance *</span>
                <input
                  {...register(`associates.${index}.birthCity`)}
                  placeholder="Paris"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.birthCity?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Code postal de naissance *</span>
                <input
                  {...register(`associates.${index}.birthPostalCode`)}
                  placeholder="75000"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.birthPostalCode?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Pays de naissance *</span>
                <input
                  {...register(`associates.${index}.birthCountry`)}
                  placeholder="France"
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.birthCountry?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Date de naissance *</span>
                <input
                  type="date"
                  {...register(`associates.${index}.birthDate`)}
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                />
                <WizardFieldError message={errors.associates?.[index]?.birthDate?.message} />
              </label>

              <label className="block">
                <span className="text-[#7A430D] font-medium">Statut marital *</span>
                <select
                  {...register(`associates.${index}.maritalStatus`)}
                  className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                >
                  <option value={MaritalStatus.SINGLE}>Célibataire</option>
                  <option value={MaritalStatus.MARRIED}>Marié(e)</option>
                  <option value={MaritalStatus.PACS}>PACS</option>
                  <option value={MaritalStatus.DIVORCED}>Divorcé(e)</option>
                  <option value={MaritalStatus.WIDOWED}>Veuf/Veuve</option>
                </select>
                <WizardFieldError message={errors.associates?.[index]?.maritalStatus?.message} />
              </label>

              {isMarriedOrPacs ? (
                <>
                  <label className="block">
                    <span className="text-[#7A430D] font-medium">Régime matrimonial *</span>
                    <select
                      {...register(`associates.${index}.maritalRegime`)}
                      className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                    >
                      <option value={MaritalRegime.COMMUNITY_PROPERTY}>Communauté de biens</option>
                      <option value={MaritalRegime.SEPARATION_OF_PROPERTY}>Séparation de biens</option>
                    </select>
                    <WizardFieldError message={errors.associates?.[index]?.maritalRegime?.message} />
                  </label>

                  <label className="block">
                    <span className="text-[#7A430D] font-medium">Prénom du conjoint *</span>
                    <input
                      {...register(`associates.${index}.spouseFirstName`)}
                      placeholder="Prénom"
                      className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                    />
                    <WizardFieldError message={errors.associates?.[index]?.spouseFirstName?.message} />
                  </label>

                  <label className="block">
                    <span className="text-[#7A430D] font-medium">Nom du conjoint *</span>
                    <input
                      {...register(`associates.${index}.spouseLastName`)}
                      placeholder="Nom"
                      className="mt-2 w-full rounded-full border border-[#E6D8CC] px-5 py-4 outline-none"
                    />
                    <WizardFieldError message={errors.associates?.[index]?.spouseLastName?.message} />
                  </label>
                </>
              ) : null}

              <label className="inline-flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  {...register(`associates.${index}.isFrenchNationality`)}
                  className="h-4 w-4"
                />
                <span className="text-[#7A430D] font-medium">Nationalité française</span>
              </label>

              {isMarriedOrPacs ? (
                <label className="inline-flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    {...register(`associates.${index}.isSpouseAssociate`)}
                    className="h-4 w-4"
                  />
                  <span className="text-[#7A430D] font-medium">Conjoint associé</span>
                </label>
              ) : null}

              <label className="inline-flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  {...register(`associates.${index}.isMinor`)}
                  className="h-4 w-4"
                />
                <span className="text-[#7A430D] font-medium">Mineur</span>
              </label>

              <label className="inline-flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  {...register(`associates.${index}.isUnderGuardianship`)}
                  className="h-4 w-4"
                />
                <span className="text-[#7A430D] font-medium">Sous tutelle</span>
              </label>
            </div>
          </div>
        );
      })}
      {isMyselfCompany || isOneAssociate ? null : (
        <button
          type="button"
          onClick={() => append({ ...defaultAssociate })}
          className="w-full rounded-full border border-dashed border-[#E6D8CC] py-4 text-[#7A430D] font-medium cursor-pointer hover:bg-[#FCFAF7] transition-colors"
        >
          + Ajouter un Associé
        </button>
      )}
      <WizardFieldError message={errors.associates?.message as string | undefined} />
    </div>
  );
}