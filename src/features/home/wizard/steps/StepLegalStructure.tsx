"use client";

import { Control, FieldErrors, UseFormRegister, useController } from "react-hook-form";
import WizardFieldError from "../components/WizardFieldError";
import { WizardSchemaType } from "@/validations/wizard/wizardSchema";
import { IService } from "@/interfaces/service/service";

type Props = {
  register: UseFormRegister<WizardSchemaType>;
  control: Control<WizardSchemaType>;
  errors: FieldErrors<WizardSchemaType>;
  legalJuridictions:IService[];
};

export default function StepLegalStructure({ control, errors,legalJuridictions }: Props) {
  const { field } = useController({
    name: "legalStructure",
    control,
    defaultValue: { id: "", name: "", isLegalJuridiction: false, hasCapitalSocial: false, tarrif: 0 },
  });

  return (
    <div className="space-y-4">
      <p className="text-[#7A430D] font-medium">Quelle structure juridique souhaitez-vous ? *</p>

      <div className="space-y-2">
        {legalJuridictions.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => field.onChange(s)}
            className={`w-full rounded-[22px] border px-4 py-3 flex items-center gap-3 text-left cursor-pointer hover:bg-[#FCFAF7] ${field.value?.id === s.id ? "border-[#C49A77] bg-[#FCFAF7]" : "border-[#E6D8CC]"
              }`}
          >
            <span className="h-10 w-10 rounded-full bg-[#F3ECE6] flex items-center justify-center">
              <img src={s.iconUrl} className="text-[#7A430D]" />
            </span>
            <span>
              <span className="block font-medium text-[#7A430D]">{s.name}</span>
              <span className="block text-sm text-[#3B2D22]">{s.description}</span>
            </span>
          </button>
        ))}
      </div>

      <WizardFieldError message={errors.legalStructure?.message as string | undefined} />
    </div>
  );
}