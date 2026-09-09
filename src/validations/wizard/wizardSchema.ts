import { z } from "zod";

export enum MaritalRegime {
  COMMUNITY_PROPERTY = "0",
  SEPARATION_OF_PROPERTY = "1",
}

export enum MaritalStatus {
  SINGLE = "0",
  MARRIED = "1",
  PACS = "2",
  DIVORCED = "3",
  WIDOWED = "4",
}

export const activitySectorSchema = z.object({
  id: z.string().nonempty("ID du secteur requis"),
  name: z.string().nonempty("Nom du secteur requis"),
});

export const activityTypeSchema = z.object({
  id: z.string().nonempty("ID du type d'activité requis"),
  name: z.string().nonempty("Nom du type d'activité requis"),
});

export const serviceSchema = z.object({
  id: z.string().nonempty("ID du service requis"),
  name: z.string().nonempty("Nom du service requis"),
  isLegalJuridiction: z.boolean(),
  hasCapitalSocial: z.boolean(),
  tarrif: z.number().nonnegative("Tarif négatif invalide"),
});

const parsePercent = (value: string | number) => {
  if (typeof value === "number") return value;
  const normalized = value.replace(",", ".").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
};

export const associateSchema = z
  .object({
    name: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    sharePercentage: z
      .number()
      .min(0, "Pourcentage requis"),
      // .max(100, "Le pourcentage doit être entre 0 et 100"),
    phoneNumber: z
      .string()
      .min(7, "Numéro invalide"),
    fullAddress: z.string().min(4, "Adresse requise"),
    city: z.string().min(2, "Ville requise"),
    country: z.string().min(2, "Pays requis"),
    isFrenchNationality: z.boolean(),
    birthCity: z.string().min(2, "Ville de naissance requise"),
    birthPostalCode: z.string().min(2, "Code postal de naissance requis"),
    birthCountry: z.string().min(2, "Pays de naissance requis"),
    birthDate: z
      .string()
      .refine(
        (s) => {
          const parsedDate = Date.parse(s);
          return !Number.isNaN(parsedDate) && parsedDate < Date.now();
        },
        "Date de naissance invalide ou dans le futur",
      ),
    maritalStatus: z.nativeEnum(MaritalStatus),
    spouseFirstName: z.string().optional().nullable(),
    spouseLastName: z.string().optional().nullable(),
    maritalRegime: z.nativeEnum(MaritalRegime),
    isLeader: z.boolean(),
    isSpouseAssociate: z.boolean(),
    isMinor: z.boolean(),
    isUnderGuardianship: z.boolean(),
  })
  .superRefine((associate, ctx) => {
    const isMarriedOrPacs =
      associate.maritalStatus === MaritalStatus.MARRIED ||
      associate.maritalStatus === MaritalStatus.PACS;

    if (!isMarriedOrPacs) return;

    if (!associate.spouseFirstName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["spouseFirstName"],
        message: "Prénom du conjoint requis pour marié/PACS",
      });
    }

    if (!associate.spouseLastName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["spouseLastName"],
        message: "Nom du conjoint requis pour marié/PACS",
      });
    }
  });

export const wizardSchema = z
  .object({
    legalStructure: serviceSchema.refine(
      (s) => s.id !== "",
      "Structure juridique requise",
    ),
    capital: z.string(),
    companyName: z.string().min(2, "Nom d'entreprise requis"),
    location: z.string().min(1, "Localisation requise"),
    address: z.string().min(4, "Adresse requise"),
    postalCode: z.string().min(3, "Code postal requis"),
    city: z.string().min(2, "Ville requise"),
    activityType: z
      .array(activityTypeSchema),
      // .min(1, "Ajoutez au moins un type d'activité"),
    activitySector: z
      .array(activitySectorSchema),
      // .min(1, "Ajoutez au moins un secteur d'activité"),
    associates: z.array(associateSchema).min(1, "Ajoutez au moins un associé"),
  })
  .superRefine((data, ctx) => {
    if (data.legalStructure.hasCapitalSocial) {
      const normalizedCapital = data.capital.replace(",", ".").trim();

      if (!normalizedCapital) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["capital"],
          message: "Capital requis",
        });
      } else {
        const capitalValue = Number(normalizedCapital);
        if (!Number.isFinite(capitalValue) || capitalValue < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["capital"],
            message: "Capital invalide",
          });
        }
      }
    }

    const seenNames = new Map<string, number[]>();
    const seenEmails = new Map<string, number[]>();

    data.associates.forEach((associate, index) => {
      const normalizedName = associate.name.trim().toLowerCase();
      const normalizedEmail = associate.email.trim().toLowerCase();

      if (normalizedName) {
        const indexes = seenNames.get(normalizedName) ?? [];
        indexes.push(index);
        seenNames.set(normalizedName, indexes);
      }

      if (normalizedEmail) {
        const indexes = seenEmails.get(normalizedEmail) ?? [];
        indexes.push(index);
        seenEmails.set(normalizedEmail, indexes);
      }
    });

    seenNames.forEach((indexes) => {
      if (indexes.length < 2) return;

      indexes.forEach((index) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["associates", index, "name"],
          message: "Le nom est déjà utilisé pour un autre associé.",
        });
      });
    });

    seenEmails.forEach((indexes) => {
      if (indexes.length < 2) return;

      indexes.forEach((index) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["associates", index, "email"],
          message: "L'email est déjà utilisé pour un autre associé.",
        });
      });
    });

    // const totalPercent = data.associates.reduce((sum, a) => {
    //   const p =
    //     typeof a.sharePercentage === "number"
    //       ? a.sharePercentage
    //       : parsePercent(String(a.sharePercentage));
    //   return sum + (Number.isFinite(p) ? p : 0);
    // }, 0);
    // if (Math.abs(totalPercent - 100) > 1e-9) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     path: ["associates"],
    //     message:
    //       "Le total des parts des associés doit être strictement égal à 100%",
    //   });
    // }

  });

export type WizardSchemaType = z.infer<typeof wizardSchema>;

export const defaultAssociate: WizardSchemaType["associates"][number] = {
  name: "",
  email: "",
  sharePercentage: 0,
  phoneNumber: "",
  fullAddress: "",
  city: "",
  country: "",
  isFrenchNationality: true,
  birthCity: "",
  birthPostalCode: "",
  birthCountry: "",
  birthDate: "",
  maritalStatus: MaritalStatus.SINGLE,
  spouseFirstName: "",
  spouseLastName: "",
  maritalRegime: MaritalRegime.COMMUNITY_PROPERTY,
  isLeader: false,
  isSpouseAssociate: false,
  isMinor: false,
  isUnderGuardianship: false,
};

export const stepFields = {
  1: ["legalStructure"],
  2: ["companyName", "location", "address", "postalCode", "city", "capital"],
  3: ["activityType", "activitySector"],
  4: ["associates"],
  5: ["associates"],
  6: [],
} as const;

export const defaultWizardFormData: WizardSchemaType = {
  legalStructure: {
    id: "",
    name: "",
    isLegalJuridiction: false,
    hasCapitalSocial: false,
    tarrif: 0,
  },
  capital: "",
  companyName: "",
  location: "",
  address: "",
  postalCode: "",
  city: "",
  activityType: [],
  activitySector: [],
  associates: [{ ...defaultAssociate }],
};
