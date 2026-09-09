"use client";

import { useState } from "react";
import WizardCard from "./WizardCard";
import { useWizardStore } from "@/stores/wizardStore";

export default function WizardRecap() {
  const data = useWizardStore((s) => s.data);

  const [showAllTypes, setShowAllTypes] = useState(false);
  const [showAllSectors, setShowAllSectors] = useState(false);

  const activityTypes = Array.isArray(data.activityType) ? data.activityType : [];
  const activitySectors = Array.isArray(data.activitySector) ? data.activitySector : [];
  const leaders = data.associates.filter((associate) => associate.isLeader);
  const nonLeaderAssociates = data.associates.filter((associate) => !associate.isLeader);

  const visibleTypes = showAllTypes ? activityTypes : activityTypes.slice(0, 1);
  const visibleSectors = showAllSectors ? activitySectors : activitySectors.slice(0, 1);

  return (
    <WizardCard
      title="Récapitulatif de création d’entreprise"
      description="Vérifiez vos informations avant la finalisation."
    >
      {/* ACTIVITÉ */}
      <div>
        <h5 className="text-h5-mobile md:text-h5">Type d&apos;activité</h5>

        <div className="grid grid-cols-2 gap-y-1">
          <p className="opacity-50">Secteur</p>
          <div className="text-right">
            {activitySectors.length === 0 ? (
              "-"
            ) : (
              <>
                {visibleSectors.map((s) => (
                  <div key={s.id}>{s.name}</div>
                ))}

                {activitySectors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSectors(!showAllSectors)}
                    className="text-xs text-[#C49A77] mt-1 hover:underline hover:cursor-pointer"
                  >
                    {showAllSectors
                      ? "Voir moins"
                      : `+${activitySectors.length - 1} autre(s)`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
          <p className="opacity-50">Type</p>
          <div className="text-right">
            {activityTypes.length === 0 ? (
              "-"
            ) : (
              <>
                {visibleTypes.map((t) => (
                  <div key={t.id}>{t.name}</div>
                ))}

                {activityTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTypes(!showAllTypes)}
                    className="text-xs text-[#C49A77] mt-1 hover:underline hover:cursor-pointer"
                  >
                    {showAllTypes
                      ? "Voir moins"
                      : `+${activityTypes.length - 1} autre(s)`}
                  </button>
                )}
              </>
            )}
          </div>

      </div>

      {/* ENTREPRISE */}
      <div>
        <h5 className="text-h5-mobile md:text-h5">Détails entreprise</h5>
        <div className="grid grid-cols-2">
          <p className="opacity-50">Nom</p>
          <p className="text-right">{data.companyName || "-"}</p>
          <p className="opacity-50">Localisation</p>
          <p className="text-right">{data.location || "-"}</p>
          <p className="opacity-50">Adresse</p>
          <p className="text-right">{data.address || "-"}</p>
          <p className="opacity-50">Code postal</p>
          <p className="text-right">{data.postalCode || "-"}</p>
          <p className="opacity-50">Ville</p>
          <p className="text-right">{data.city || "-"}</p>
        </div>
      </div>

      {/* STRUCTURE */}
      <div>
        <h5 className="text-h5-mobile md:text-h5">Structure juridique</h5>
        <div className="grid grid-cols-2">
          <p className="opacity-50">Forme juridique</p>
          <p className="text-right">{data.legalStructure.name || "-"}</p>
          <p className="opacity-50">Capital social</p>
          <p className="text-right">{data.capital ? `${data.capital} €` : "-"}</p>
        </div>
      </div>

      {/* ASSOCIÉS */}
      <div>
        <h5 className="text-h5-mobile md:text-h5">Associés</h5>
        <div className="space-y-1">
          {nonLeaderAssociates.length === 0 ? (
            <p className="text-right">-</p>
          ) : (
            nonLeaderAssociates.map((associate, idx) => (
              <div key={`${associate.email}-${idx}`} className="grid grid-cols-2">
                <p className="opacity-50">
                  Associé {String(idx + 1).padStart(2, "0")}
                </p>
                <p className="text-right">
                  {associate.name || "-"} - {associate.sharePercentage || "0"}€
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DIRIGEANTS */}
      <div>
        <h5 className="text-h5-mobile md:text-h5">Dirigeants</h5>
        <div className="space-y-1">
          {leaders.length === 0 ? (
            <p className="text-right">-</p>
          ) : (
            leaders.map((leader, idx) => (
              <div key={`${leader.email}-${idx}-leader`} className="grid grid-cols-2">
                <p className="opacity-50">
                  Dirigeant {String(idx + 1).padStart(2, "0")}
                </p>
                <p className="text-right">{leader.name || "-"}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PRIX */}
      <div className="px-5 py-2.5 rounded-4xl border border-2 border-outline flex justify-between items-center">
        <div>
          <p className="text-primary font-semibold">Coût total estimé</p>
          <p className="text-sm">Prix tout compris</p>
        </div>
        <p className="text-h5-mobile md:text-h5 text-primary font-bold">
          {data.legalStructure.tarrif} €
        </p>
      </div>
    </WizardCard>
  );
}