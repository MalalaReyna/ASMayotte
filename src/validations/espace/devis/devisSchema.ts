import { z } from "zod";

export const deviseFormSchema = z.object({
  enterpriseName: z.string().min(2, "Nom de devis requis"),
  responsableName: z.string().min(2, "Nom du responsable requis"),
  siret: z.string().regex(/^\d{14}$/, "SIRET invalide"),
  phone: z.string().min(7, "Numero invalide"),
  email: z.string().email("Email invalide"),
  activitySectorsText: z.string().min(1, "Au moins un secteur d'activité est requis"),
  adminFilesText: z.string().optional(),
  hasDownloadedDCE: z.boolean(),
  wantsAccompagnementDepot: z.boolean(),
  wantsExpressResponse: z.boolean(),
  hasAdminFiles: z.boolean(),
});

export type DevisFormValues = z.infer<typeof deviseFormSchema>;

export const defaultDevisFormValues: DevisFormValues = {
  enterpriseName: "",
  responsableName: "",
  siret: "",
  phone: "",
  email: "",
  activitySectorsText: "",
  adminFilesText: "",
  hasDownloadedDCE: false,
  wantsAccompagnementDepot: false,
  wantsExpressResponse: false,
  hasAdminFiles: false,
};
