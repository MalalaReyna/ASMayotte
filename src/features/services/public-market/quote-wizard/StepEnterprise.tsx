"use client";

import { useMemo, useRef, useState } from "react";
import type { FocusEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DevisFormValues } from "@/validations/devis/devisSchema";
import { IActivitySector } from "@/interfaces/activity/activity";

type StepEnterpriseProps = {
    activitySectors: IActivitySector[];
};
export default function StepEnterprise({ activitySectors }: StepEnterpriseProps) {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<DevisFormValues>();

    const { field } = useController({
        name: "activitySectors",
        control,
        defaultValue: [],
    });
    const selectedSectors = Array.isArray(field.value) ? field.value : [];

    const [sectorSearch, setSectorSearch] = useState("");
    const [sectorInputFocused, setSectorInputFocused] = useState(false);
    const sectorFieldRef = useRef<HTMLDivElement | null>(null);
    const filteredSectors = useMemo(() => {
        const query = sectorSearch.trim().toLowerCase();
        if (!query) return activitySectors;
        return activitySectors.filter((sector) =>
            sector.name.toLowerCase().includes(query),
        );
    }, [activitySectors, sectorSearch]);

    const sectorLabelMap = useMemo(
        () => new Map(activitySectors.map((sector) => [sector.id, sector.name])),
        [activitySectors],
    );

    const getSectorLabel = (sectorId: string) =>
        sectorLabelMap.get(sectorId) ?? sectorId;

    const toggleSector = (sectorId: string) => {
        const next = selectedSectors.includes(sectorId)
            ? selectedSectors.filter((id) => id !== sectorId)
            : [...selectedSectors, sectorId];
        setValue("activitySectors", next, {
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const removeSector = (sectorId: string) => {
        const next = selectedSectors.filter((id) => id !== sectorId);
        setValue("activitySectors", next, {
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const activitySectorError = errors.activitySectors?.message as
        | string
        | undefined;

    const handleSectorBlur = (event: FocusEvent<HTMLDivElement>) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (nextTarget && sectorFieldRef.current?.contains(nextTarget)) return;
        setSectorInputFocused(false);
    };

    return (
        <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-xs font-semibold text-secondary">Nom de l'entreprise</label>
                    <input
                        {...register("enterpriseName")}
                        placeholder="Nom de l'entreprise"
                        className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                    />
                    {errors.enterpriseName ? (
                        <p className="mt-1 text-xs text-red-600">{errors.enterpriseName.message}</p>
                    ) : null}
                </div>
                <div>
                    <label className="text-xs font-semibold text-secondary">SIRET</label>
                    <input
                        {...register("siret")}
                        placeholder="SIRET"
                        className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                    />
                    {errors.siret ? (
                        <p className="mt-1 text-xs text-red-600">{errors.siret.message}</p>
                    ) : null}
                </div>
                <div>
                    <label className="text-xs font-semibold text-secondary">Nom du responsable</label>
                    <input
                        {...register("responsableName")}
                        placeholder="Nom du responsable"
                        className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                    />
                    {errors.responsableName ? (
                        <p className="mt-1 text-xs text-red-600">{errors.responsableName.message}</p>
                    ) : null}
                </div>
                <div>
                    <label className="text-xs font-semibold text-secondary">Téléphone</label>
                    <input
                        {...register("phone")}
                        placeholder="Telephone"
                        className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                    />
                    {errors.phone ? (
                        <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                    ) : null}
                </div>
                <div>
                    <label className="text-xs font-semibold text-secondary">Email</label>
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                    />
                    {errors.email ? (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                    ) : null}
                </div>
            </div>
            <div className="mt-4">
                <label className="text-xs font-semibold text-secondary">Secteur d'activité</label>
                <div
                    ref={sectorFieldRef}
                    onBlur={handleSectorBlur}
                    onFocusCapture={() => setSectorInputFocused(true)}
                >
                {selectedSectors.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {selectedSectors.map((sectorId) => (
                            <span
                                key={sectorId}
                                className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-1 text-xs text-dark"
                            >
                                {getSectorLabel(sectorId)}
                                <button
                                    type="button"
                                    className="text-secondary hover:text-dark"
                                    onClick={() => removeSector(sectorId)}
                                    aria-label="Retirer ce secteur"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="mt-2 text-xs text-secondary">Aucun secteur selectionne</p>
                )}
                <input
                    onFocus={() => setSectorInputFocused(true)}
                    value={sectorSearch}
                    onChange={(event) => {
                        setSectorSearch(event.target.value);
                        setSectorInputFocused(true);
                    }}
                    placeholder="Rechercher un secteur"
                    className="mt-2 w-full rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark"
                />
                {sectorInputFocused ? (
                    <div className="mt-3 max-h-48 overflow-y-auto rounded-2xl border border-outline bg-surface p-2">
                        {filteredSectors.length === 0 ? (
                            <p className="px-2 py-2 text-xs text-secondary">Aucun secteur</p>
                        ) : (
                            <div className="grid gap-2 sm:grid-cols-2">
                                {filteredSectors.map((sector) => {
                                    const isSelected = selectedSectors.includes(sector.id);

                                    return (
                                        <div
                                            key={sector.id}
                                            role="checkbox"
                                            tabIndex={0}
                                            aria-checked={isSelected}
                                            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-outline bg-white px-4 py-3 text-sm text-dark transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            onClick={() => toggleSector(sector.id)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    toggleSector(sector.id);
                                                }
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="pointer-events-none accent-primary"
                                                checked={isSelected}
                                                readOnly
                                                onBlur={field.onBlur}
                                            />
                                            <span>{sector.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : null}
                {activitySectorError ? (
                    <p className="mt-1 text-xs text-red-600">{activitySectorError}</p>
                ) : null}
                </div>
            </div>
        </>
    );
}
