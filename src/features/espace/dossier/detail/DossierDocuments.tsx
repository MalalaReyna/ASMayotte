import { FileText, Paperclip } from "lucide-react";
import { DossierAttachment, DossierGeneratedDoc } from "../../../../types/dossier/dossierTypes";

type DossierDocumentsProps = {
  attachments: DossierAttachment[];
  generatedDocs: DossierGeneratedDoc[];
};

type DocRowProps = {
  icon: React.ReactNode;
  name: string;
};

function DocRow({ icon, name }: DocRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#6E5A4A]">
      <span className="text-[#6B3B09]">{icon}</span>
      <span>{name}</span>
    </div>
  );
}

export default function DossierDocuments({ attachments, generatedDocs }: DossierDocumentsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Pieces jointes */}
      <div className="rounded-2xl h-[13.5rem] border border-[#E8DDD3] bg-white flex flex-col">

        {/* Header FIXE */}
        <div className="border-b border-[#E8DDD3] p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#2A1B12]">
              Pieces jointes (5 total)
            </p>
            <button
              type="button"
              className="text-xs hover:cursor-pointer text-[#6B3B09]"
            >
              + Ajouter
            </button>
          </div>
        </div>

        {/* Scroll UNIQUEMENT ici */}
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {attachments.map((item) => (
            <DocRow
              key={item.id}
              icon={<Paperclip size={16} />}
              name={item.name}
            />
          ))}
        </div>
      </div>

      {/* Documents générés */}
      <div className="rounded-2xl h-[13.5rem] border border-[#E8DDD3] bg-white flex flex-col">

        {/* Header FIXE */}
        <div className="border-b border-[#E8DDD3] p-4">
          <p className="text-sm font-semibold text-[#2A1B12]">
            Documents générés (5 total)
          </p>
        </div>

        {/* Scroll UNIQUEMENT ici */}
        <div className="flex-1 overflow-auto p-4 space-y-2">
          {generatedDocs.map((item) => (
            <DocRow
              key={item.id}
              icon={<FileText size={16} />}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
