import { z } from "zod";

export const devisSchema = z.object({
  idMarket: z.string().min(1, "Marche requis"),
  enterpriseName: z.string().min(2, "Nom d'entreprise requis"),
  responsableName: z.string().min(2, "Nom du responsable requis"),
  siret: z.string().regex(/^\d{14}$/, "SIRET invalide"),
  phone: z
    .string(),
  email: z.string().email("Email invalide"),
  activitySectors: z
    .array(z.string().min(1, "Secteur requis"))
    .min(1, "Secteur d'activite requis"),
  adminFiles: z
    .array(z.string().min(1))
    .min(1, "Selectionnez au moins une prestation"),
  hasDownloadedDCE: z.boolean(),
  wantsAccompagnementDepot: z.boolean(),
  wantsExpressResponse: z.boolean(),
  hasAdminFiles: z.boolean(),
});

export type DevisFormValues = z.infer<typeof devisSchema>;

export const defaultDevisValues: DevisFormValues = {
  idMarket: "",
  enterpriseName: "",
  responsableName: "",
  siret: "",
  phone: "",
  email: "",
  activitySectors: [],
  adminFiles: [],
  hasDownloadedDCE: false,
  wantsAccompagnementDepot: false,
  wantsExpressResponse: false,
  hasAdminFiles: false,
};

export const devisStepFields: Record<number, (keyof DevisFormValues)[]> = {
  0: [],
  1: [
    "enterpriseName",
    "siret",
    "responsableName",
    "phone",
    "email",
    "activitySectors",
  ],
  2: ["adminFiles"],
  3: [
    "hasDownloadedDCE",
    "wantsAccompagnementDepot",
    "wantsExpressResponse",
    "hasAdminFiles",
  ],
  4: [],
};
