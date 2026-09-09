"use client";

import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useFieldArray, useWatch } from "react-hook-form";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import WizardFieldError from "../components/WizardFieldError";
import {
  defaultAssociate,
  MaritalRegime,
  MaritalStatus,
  WizardSchemaType,
} from "@/validations/wizard/wizardSchema";

type Props = {
  control: Control<WizardSchemaType>;
  register: UseFormRegister<WizardSchemaType>;
  setValue: UseFormSetValue<WizardSchemaType>;
  errors: FieldErrors<WizardSchemaType>;
  isMyselfCompany: boolean;
};

export default function StepLeaders({ control, register, setValue, errors, isMyselfCompany }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "associates",
  });

  const associates = useWatch({ control, name: "associates" }) || [];

  const isNonAssociateLeader = (index: number) => {
    const associate = associates[index];
    if (!associate) return false;
    return associate.isLeader && Number(associate.sharePercentage) === 0;
  };

  const associateCandidateIndexes = fields
    .map((_, index) => index)
    .filter((index) => !isNonAssociateLeader(index));

  const nonAssociateLeaderIndexes = fields
    .map((_, index) => index)
    .filter((index) => isNonAssociateLeader(index));

  useEffect(() => {
    if (!isMyselfCompany || associates.length === 0) return;

    associates.forEach((_, index) => {
      const shouldBeLeader = index === 0;
      if (associates[index]?.isLeader !== shouldBeLeader) {
        setValue(`associates.${index}.isLeader`, shouldBeLeader, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    });
  }, [associates, isMyselfCompany, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-2xl border border-[#E6D8CC] p-4">
        <h4 className="font-semibold text-[#7A430D]">Sélectionner les dirigeants parmi les associés</h4>

        {associateCandidateIndexes.map((index) => {
          const associate = associates[index];
          if (!associate) return null;

          return (
            <label
              key={fields[index].id}
              className="flex items-center justify-between rounded-xl border border-[#E6D8CC] px-4 py-3"
            >
              <div>
                <p className="font-medium text-[#2F241B]">{associate.name || `Associé ${index + 1}`}</p>
                <p className="text-sm text-[#8D7C6E]">{associate.email || "Email non renseigné"}</p>
              </div>
              <input
                type="checkbox"
                checked={Boolean(associate.isLeader) || (isMyselfCompany && index === 0)}
                disabled={isMyselfCompany && index === 0}
                onChange={(event) => {
                  setValue(`associates.${index}.isLeader`, event.target.checked, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                className="h-5 w-5"
              />
            </label>
          );
        })}
      </div>

      {isMyselfCompany ? (
        <div className="rounded-2xl border border-[#E6D8CC] bg-[#FCFAF7] px-4 py-3 text-sm text-[#7A430D]">
          Pour une entreprise individuelle ou micro-entreprise, le dirigeant est automatiquement l'associé saisi.
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <h4 className="font-semibold text-[#7A430D]">Dirigeants non associés</h4>

            {nonAssociateLeaderIndexes.map((index) => {
              const maritalStatus = associates[index]?.maritalStatus;
              const isMarriedOrPacs =
                maritalStatus === MaritalStatus.MARRIED || maritalStatus === MaritalStatus.PACS;

              return (
                <div key={fields[index].id} className="space-y-3 rounded-2xl border border-[#E6D8CC] p-4">
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      <Trash size={18} className="mr-1 inline-block" /> Supprimer le dirigeant
                    </button>
                  </div>

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

            <button
              type="button"
              onClick={() =>
                append({
                  ...defaultAssociate,
                  sharePercentage: 0,
                  isLeader: true,
                })
              }
              className="w-full rounded-full border border-dashed border-[#E6D8CC] py-4 text-[#7A430D] font-medium hover:bg-[#FCFAF7] transition-colors"
            >
              + Ajouter un dirigeant non associé
            </button>
          </div>
        </>
      )}

      <WizardFieldError message={errors.associates?.message as string | undefined} />
    </div>
  );
}
