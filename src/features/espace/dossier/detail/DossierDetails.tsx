"use client"
import { useState } from "react";
import {
  WizardSchemaType,
  MaritalRegime,
  MaritalStatus,
} from "@/validations/wizard/wizardSchema";
import DossierDetailRow from "./DossierDetailRow";

const maritalStatusLabels: Record<MaritalStatus, string> = {
  [MaritalStatus.SINGLE]: "Celibataire",
  [MaritalStatus.MARRIED]: "Marie",
  [MaritalStatus.PACS]: "PACS",
  [MaritalStatus.DIVORCED]: "Divorce",
  [MaritalStatus.WIDOWED]: "Veuf",
};

const maritalRegimeLabels: Record<MaritalRegime, string> = {
  [MaritalRegime.COMMUNITY_PROPERTY]: "Communaute de biens",
  [MaritalRegime.SEPARATION_OF_PROPERTY]: "Separation de biens",
};

type DossierDetailsProps = {
  data: WizardSchemaType;
};

type AssociateFieldRowProps = {
  label: string;
  value: string;
};

function AssociateFieldRow({ label, value }: AssociateFieldRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-[#8B7F73]">{label}</span>
      <span className="text-right text-[#2C2015]">{value}</span>
    </div>
  );
}

export default function DossierDetails({ data }: DossierDetailsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const activityTypes =
    data.activityType.map((item) => item.name).join(", ") || "-";

  const activitySectors =
    data.activitySector.map((item) => item.name).join(", ") || "-";

  return (
    <div className="rounded-2xl overflow-y-auto border border-[#E8DDD3] bg-white p-4">
      <div className="space-y-4">
        {/* ACTIVITE */}
        <div>
          <p className="text-sm font-semibold text-[#2A1B12]">
            Type d'activite
          </p>
          <div className="mt-2 space-y-1">
            <DossierDetailRow label="Type" value={activityTypes} />
            <DossierDetailRow label="Secteur" value={activitySectors} />
          </div>
        </div>

        {/* ENTREPRISE */}
        <div>
          <p className="text-sm font-semibold text-[#2A1B12]">
            Details entreprise
          </p>
          <div className="mt-2 space-y-1">
            <DossierDetailRow label="Nom" value={data.companyName || "-"} />
            <DossierDetailRow label="Localisation" value={data.location || "-"} />
            <DossierDetailRow label="Adresse" value={data.address || "-"} />
            <DossierDetailRow label="Code postal" value={data.postalCode || "-"} />
            <DossierDetailRow label="Ville" value={data.city || "-"} />
          </div>
        </div>

        {/* STRUCTURE */}
        <div>
          <p className="text-sm font-semibold text-[#2A1B12]">
            Structure juridique
          </p>
          <div className="mt-2 space-y-1">
            <DossierDetailRow
              label="Forme juridique"
              value={data.legalStructure.name || "-"}
            />
            <DossierDetailRow
              label="Capital social"
              value={data.capital ? `${data.capital} EUR` : "-"}
            />
          </div>
        </div>

        {/* ASSOCIES */}
        <div>
          <p className="text-sm font-semibold text-[#2A1B12]">
            Associes et dirigeants
          </p>

          <div className="mt-3 space-y-3">
            {data.associates.map((associate, index) => {
              const maritalStatus =
                maritalStatusLabels[associate.maritalStatus] ?? "-";

              const maritalRegime =
                maritalRegimeLabels[associate.maritalRegime] ?? "-";

              const badges = [
                associate.isLeader ? "Dirigeant" : null,
                associate.isSpouseAssociate ? "Conjoint associé" : null,
                associate.isMinor ? "Mineur" : null,
                associate.isUnderGuardianship ? "Sous tutelle" : null,
              ].filter(Boolean);

              const isOpen = openIndex === index;

              return (
                <div
                  key={`${associate.email}-${index}`}
                  className="rounded-2xl border border-[#E8DDD3] bg-[#FDF9F5]"
                >
                  {/* HEADER */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <p className="text-sm font-semibold text-[#2A1B12]">
                      {associate.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-2 text-xs">
                        {badges.length === 0 ? (
                          <span className="rounded-full bg-[#EFE5DD] px-2 py-1 text-[#6E5A4A]">
                            Associé
                          </span>
                        ) : (
                          badges.map((badge) => (
                            <span
                              key={badge}
                              className="rounded-full bg-white px-2 py-1 text-[#6E5A4A]"
                            >
                              {badge}
                            </span>
                          ))
                        )}
                      </div>

                      <span className="text-xs text-[#6E5A4A]">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>
                  </button>

                  {/* CONTENT */}
                  {isOpen && (
                    <div className="px-4 pb-4 space-y-2 border-t border-[#E8DDD3]">
                      <AssociateFieldRow label="Nom" value={associate.name || "-"} />
                      <AssociateFieldRow label="Email" value={associate.email || "-"} />
                      <AssociateFieldRow label="Téléphone" value={associate.phoneNumber || "-"} />
                      <AssociateFieldRow label="Pourcentage" value={`${associate.sharePercentage || 0}%`} />
                      <AssociateFieldRow label="Adresse" value={associate.fullAddress || "-"} />
                      <AssociateFieldRow label="Ville" value={associate.city || "-"} />
                      <AssociateFieldRow label="Pays" value={associate.country || "-"} />
                      <AssociateFieldRow label="Nationalite francaise" value={associate.isFrenchNationality ? "Oui" : "Non"} />
                      <AssociateFieldRow label="Ville de naissance" value={associate.birthCity || "-"} />
                      <AssociateFieldRow label="Code postal de naissance" value={associate.birthPostalCode || "-"} />
                      <AssociateFieldRow label="Pays de naissance" value={associate.birthCountry || "-"} />
                      <AssociateFieldRow label="Date de naissance" value={associate.birthDate || "-"} />
                      <AssociateFieldRow label="Statut marital" value={maritalStatus} />
                      <AssociateFieldRow label="Regime matrimonial" value={maritalRegime} />

                      {(associate.spouseFirstName ||
                        associate.spouseLastName) && (
                        <>
                          <AssociateFieldRow label="Prenom conjoint" value={associate.spouseFirstName || "-"} />
                          <AssociateFieldRow label="Nom conjoint" value={associate.spouseLastName || "-"} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}