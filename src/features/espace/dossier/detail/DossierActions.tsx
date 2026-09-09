import { DossierDetailData } from "../../../../types/dossier/dossierTypes";

type DossierActionsProps = {
  urgency: DossierDetailData["urgency"];
};

export default function DossierActions({ urgency }: DossierActionsProps) {
  return (
    <div className="rounded-2xl border border-[#E8DDD3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#9A816D]">Actions requises</p>
      <div className="mt-3 space-y-2">
        <button type="button" className="w-full hover:cursor-pointer rounded-lg bg-[#6B3B09] py-2 text-sm font-semibold text-white">
          Valider le dossier
        </button>
        <button type="button" className="w-full hover:cursor-pointer rounded-lg border border-[#E8DDD3] bg-white py-2 text-sm font-semibold text-[#6E5A4A]">
          Demander une correction
        </button>
      </div>
      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-[#9A816D]">Urgence</label>
        <select
          defaultValue={urgency}
          className="mt-2 w-full rounded-lg border border-[#E8DDD3] bg-[#FBF8F5] px-3 py-2 text-sm text-[#6D5D4E]"
        >
          <option value="Normal">Normal</option>
          <option value="Elevee">Elevee</option>
          <option value="Urgente">Urgente</option>
        </select>
      </div>
    </div>
  );
}
