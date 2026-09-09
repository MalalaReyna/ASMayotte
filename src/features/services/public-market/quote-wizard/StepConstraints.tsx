"use client";

import { useFormContext } from "react-hook-form";
import { DevisFormValues } from "@/validations/devis/devisSchema";
import { formatMarketDate } from "../marketHelpers";

const booleanSelectOptions = {
  setValueAs: (value: string) => value === "true",
};

type StepConstraintsProps = {
  limitDate: string;
};

export default function StepConstraints({ limitDate }: StepConstraintsProps) {
  const { register } = useFormContext<DevisFormValues>();

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <label className="text-xs font-semibold text-secondary">Date limite du marché</label>
        <input
          readOnly
          defaultValue={formatMarketDate(limitDate)}
          className="mt-2 w-full rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Souhaitez-vous une reponse express ?</label>
        <select
          className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          {...register("wantsExpressResponse", booleanSelectOptions)}
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Avez-vous deja téléchargé le DCE ?</label>
        <select
          className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          {...register("hasDownloadedDCE", booleanSelectOptions)}
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Avez-vous les pieces administratives ?</label>
        <select
          className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          {...register("hasAdminFiles", booleanSelectOptions)}
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-secondary">Souhaitez-vous un accompagnement au depot ?</label>
        <select
          className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
          {...register("wantsAccompagnementDepot", booleanSelectOptions)}
        >
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
    </div>
  );
}
