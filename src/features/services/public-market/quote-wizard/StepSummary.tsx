"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { GetMarketResponse } from "@/types/market/marketType";
import { formatMarketDate } from "../marketHelpers";
import { DevisFormValues } from "@/validations/devis/devisSchema";
import { IActivitySector } from "@/interfaces/activity/activity";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";

type StepSummaryProps = {
  tender: GetMarketResponse;
  buyer: string;
  location: string;
  activitySectors: IActivitySector[];
  services: GetAdminFileResponse[];
};

export default function StepSummary({
  tender,
  buyer,
  location,
  activitySectors,
  services,
}: StepSummaryProps) {
  const { control } = useFormContext<DevisFormValues>();
  const values = useWatch({ control });

  const serviceLabelMap = useMemo(
    () => new Map(services.map((service) => [service.id, service.name])),
    [services],
  );
  const sectorLabelMap = useMemo(
    () => new Map(activitySectors.map((sector) => [sector.id, sector.name])),
    [activitySectors],
  );

  const selectedServices = (values.adminFiles ?? [])
    .map((serviceId) => serviceLabelMap.get(serviceId) ?? serviceId)
    .filter(Boolean);
  const selectedSectors = (values.activitySectors ?? [])
    .map((sectorId) => sectorLabelMap.get(sectorId) ?? sectorId)
    .filter(Boolean);

  const tenderReference = tender.reference || tender.sigleReference || "-";
  const limitDate = formatMarketDate(tender.limitDate);

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-3xl border border-outline bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-dark">Résumé avant envoi</p>
            <p className="mt-1 text-sm text-secondary">
              Vérifiez les informations clés avant d'envoyer votre demande.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Marché</p>
          <div className="mt-3 space-y-2 text-sm text-dark">
            <p><span className="font-semibold">Référence:</span> {tenderReference}</p>
            <p><span className="font-semibold">Acheteur:</span> {buyer}</p>
            <p><span className="font-semibold">Localisation:</span> {location}</p>
            <p><span className="font-semibold">Date limite:</span> {limitDate}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Entreprise</p>
          <div className="mt-3 space-y-2 text-sm text-dark">
            <p><span className="font-semibold">Nom:</span> {values.enterpriseName || "Non renseigne"}</p>
            <p><span className="font-semibold">Responsable:</span> {values.responsableName || "Non renseigne"}</p>
            <p><span className="font-semibold">SIRET:</span> {values.siret || "Non renseigne"}</p>
            <p><span className="font-semibold">Email:</span> {values.email || "Non renseigne"}</p>
            <p><span className="font-semibold">Téléphone:</span> {values.phone || "Non renseigne"}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Contraintes</p>
          <div className="mt-3 flex flex-col gap-2">
            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${values.hasDownloadedDCE ? "border-primary/30 bg-primary/10 text-primary" : "border-outline text-secondary"}`}>
              DCE téléchargé: {values.hasDownloadedDCE ? "Oui" : "Non"}
            </span>
            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${values.wantsAccompagnementDepot ? "border-primary/30 bg-primary/10 text-primary" : "border-outline text-secondary"}`}>
              Accompagnement dépôt: {values.wantsAccompagnementDepot ? "Oui" : "Non"}
            </span>
            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${values.wantsExpressResponse ? "border-primary/30 bg-primary/10 text-primary" : "border-outline text-secondary"}`}>
              Réponse express: {values.wantsExpressResponse ? "Oui" : "Non"}
            </span>
            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${values.hasAdminFiles ? "border-primary/30 bg-primary/10 text-primary" : "border-outline text-secondary"}`}>
              Documents prêts: {values.hasAdminFiles ? "Oui" : "Non"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Secteurs</p>
          {selectedSectors.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSectors.map((sector) => (
                <span key={sector} className="rounded-full border border-outline bg-surface px-3 py-1 text-xs text-dark">
                  {sector}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-secondary">Aucun secteur selectionne</p>
          )}
        </div>

        <div className="rounded-3xl border border-outline bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">Prestations</p>
          {selectedServices.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <span key={service} className="rounded-full border border-outline bg-surface px-3 py-1 text-xs text-dark">
                  {service}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-secondary">Aucune prestation selectionnee</p>
          )}
        </div>
      </div>
    </div>
  );
}
