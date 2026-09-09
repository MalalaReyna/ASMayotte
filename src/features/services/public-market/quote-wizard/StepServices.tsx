"use client";

import { useFormContext } from "react-hook-form";
import { DevisFormValues } from "@/validations/devis/devisSchema";
import { GetAdminFileResponse } from "@/types/adminFiles/adminFilesType";

type StepServicesProps = {
    services: GetAdminFileResponse[];
};

export default function StepServices({ services }: StepServicesProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<DevisFormValues>();

    return (
        <div className="mt-6">
            <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                    <label
                        key={service.id}
                        className="flex items-center gap-3 rounded-2xl border border-outline bg-surface px-4 py-3 text-sm text-dark"
                    >
                        <input
                            type="checkbox"
                            value={service.id}
                            className="accent-primary"
                            {...register("adminFiles")}
                        />
                        {service.name}
                    </label>
                ))}
            </div>
            {errors.adminFiles ? (
                <p className="mt-2 text-xs text-red-600">{errors.adminFiles.message}</p>
            ) : null}
        </div>
    );
}
