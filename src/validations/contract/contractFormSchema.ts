import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Types de contrat – calés sur les 9 trames réelles                 */
/* ------------------------------------------------------------------ */

export const contractTypes = [
  "CDI_SERVICE_EMPLOYE",
  "CDI_SERVICE_MAITRISE",
  "CDI_SERVICE_CADRE",
  "CDD_SERVICE",
  "CDI_BTP_OUVRIER",
  "CDI_BTP_ETAM",
  "CDI_BTP_CADRE",
  "AVENANT_FORFAIT_JOURS",
  "CDI_TEMPS_PARTIEL",
] as const;

export type ContractType = (typeof contractTypes)[number];

export const contractTypeLabels: Record<ContractType, string> = {
  CDI_SERVICE_EMPLOYE: "CDI Service – Employé / Technicien",
  CDI_SERVICE_MAITRISE: "CDI Service – Agent de maîtrise",
  CDI_SERVICE_CADRE: "CDI Service – Cadre",
  CDD_SERVICE: "CDD Service",
  CDI_BTP_OUVRIER: "CDI BTP – Ouvrier de chantier",
  CDI_BTP_ETAM: "CDI BTP – ETAM / Agent de maîtrise",
  CDI_BTP_CADRE: "CDI BTP – Cadre travaux",
  AVENANT_FORFAIT_JOURS: "Avenant forfait jours – Cadre autonome",
  CDI_TEMPS_PARTIEL: "CDI Temps partiel",
};

export const contractTypeToTemplate: Record<ContractType, string> = {
  CDI_SERVICE_EMPLOYE: "trame_1_cdi_service_employe.docx",
  CDI_SERVICE_MAITRISE: "trame_2_cdi_service_maitrise.docx",
  CDI_SERVICE_CADRE: "trame_3_cdi_service_cadre.docx",
  CDD_SERVICE: "trame_4_cdd_service.docx",
  CDI_BTP_OUVRIER: "trame_5_cdi_btp_ouvrier.docx",
  CDI_BTP_ETAM: "trame_6_cdi_btp_etam.docx",
  CDI_BTP_CADRE: "trame_7_cdi_btp_cadre.docx",
  AVENANT_FORFAIT_JOURS: "trame_8_avenant_forfait_jours.docx",
  CDI_TEMPS_PARTIEL: "trame_9_cdi_temps_partiel.docx",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Groupes logiques pour l'affichage conditionnel dans le formulaire */
export const isCDI = (t: ContractType) =>
  t.startsWith("CDI_") || t === "CDI_TEMPS_PARTIEL";
export const isCDD = (t: ContractType) => t === "CDD_SERVICE";
export const isBTP = (t: ContractType) =>
  t === "CDI_BTP_OUVRIER" || t === "CDI_BTP_ETAM" || t === "CDI_BTP_CADRE";
export const isCadre = (t: ContractType) =>
  t === "CDI_SERVICE_CADRE" || t === "CDI_BTP_CADRE";
export const isTempsPartiel = (t: ContractType) => t === "CDI_TEMPS_PARTIEL";
export const isAvenant = (t: ContractType) => t === "AVENANT_FORFAIT_JOURS";

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} requis`);

/* ------------------------------------------------------------------ */
/*  Schéma Zod                                                         */
/* ------------------------------------------------------------------ */

export const contractFormSchema = z
  .object({
    contractType: z.enum(contractTypes, {
      message: "Type de contrat requis",
    }),

    /* ---------- Employeur ---------- */
    companyName: requiredText("Dénomination sociale"),
    companyLegalForm: requiredText("Forme sociale"),
    companyCapital: z.string().trim().optional(),
    companySiren: z
      .string()
      .trim()
      .regex(/^\d{9,14}$/, "SIREN (9 chiffres) ou SIRET (14 chiffres)"),
    companyAddress: requiredText("Adresse du siège"),
    legalRepresentative: requiredText("Représentant légal (nom)"),
    legalRepresentativeTitle: requiredText("Qualité (Gérant, Président…)"),

    /* ---------- Salarié ---------- */
    employeeFullName: requiredText("Nom complet du salarié"),
    employeeAddress: requiredText("Adresse du salarié"),

    /* ---------- Poste & classification ---------- */
    jobTitle: requiredText("Intitulé du poste"),
    workplace: requiredText("Lieu de travail"),
    startDate: requiredText("Date de début"),
    category: z.string().trim().optional(),
    level: z.string().trim().optional(),
    echelon: z.string().trim().optional(),
    coefficient: z.string().trim().optional(),
    collectiveAgreement: z.string().trim().optional(),
    collectiveAgreementIdcc: z.string().trim().optional(),

    /* ---------- Période d'essai ---------- */
    trialPeriod: z.string().trim().optional(),

    /* ---------- Temps de travail (commun) ---------- */
    weeklyHours: z.coerce
      .number()
      .min(1, "Heures invalides")
      .max(48, "Maximum 48h")
      .optional(),
    workSchedule: z.string().trim().optional(),

    /* ---------- Rémunération ---------- */
    monthlyGrossSalary: z.coerce.number().positive("Salaire invalide").optional(),
    annualGrossSalary: z.coerce.number().positive("Salaire annuel invalide").optional(),
    salaryPayments: z.string().trim().optional(), // "12" ou "13"

    /* ---------- Signature ---------- */
    signatureCity: requiredText("Ville de signature"),
    signatureDate: requiredText("Date de signature"),

    /* ---------- CDD (Trame 4) ---------- */
    cddReason: z.string().trim().optional(),
    endDate: z.string().trim().optional(),
    cddMinDuration: z.string().trim().optional(),

    /* ---------- BTP (Trames 5-6-7) ---------- */
    btpGeographicZone: z.string().trim().optional(),

    /* ---------- Cadre (Trames 3-7) - rémunération variable ---------- */
    hasVariablePay: z.boolean().optional(),

    /* ---------- Hiérarchie (Trames 2-3) ---------- */
    directSupervisor: z.string().trim().optional(),

    /* ---------- Avenant forfait jours (Trame 8) ---------- */
    forfaitDaysPerYear: z.coerce.number().optional(),

    /* ---------- Temps partiel (Trame 9) ---------- */
    partTimeHours: z.coerce.number().optional(),
    partTimePeriod: z.string().trim().optional(), // "semaine" | "mois"
    partTimeSchedule: z.string().trim().optional(), // répartition jours/horaires
    partTimeComplementaryLimit: z.string().trim().optional(),

    /* ---------- Missions principales (texte libre) ---------- */
    mainMissions: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    const t = data.contractType;

    /* -- CDD : motif + dates obligatoires -- */
    if (t === "CDD_SERVICE") {
      if (!data.cddReason) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cddReason"],
          message: "Motif du CDD requis (remplacement, surcroît…)",
        });
      }
      if (!data.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "Date de fin requise pour un CDD",
        });
      }
    }

    /* -- BTP : zone géo conseillée -- */
    if (isBTP(t) && !data.btpGeographicZone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["btpGeographicZone"],
        message: "Zone géographique chantier requise pour le BTP",
      });
    }

    /* -- Rémunération : mensuelle ou annuelle selon trame -- */
    const needsAnnual = isCadre(t) || t === "AVENANT_FORFAIT_JOURS";
    const needsMonthly = !needsAnnual /* && t !== "AVENANT_FORFAIT_JOURS" */;

    if (needsAnnual && !data.annualGrossSalary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["annualGrossSalary"],
        message: "Salaire brut annuel requis pour ce type de contrat",
      });
    }
    if (needsMonthly && !data.monthlyGrossSalary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["monthlyGrossSalary"],
        message: "Salaire brut mensuel requis",
      });
    }

    /* -- Temps de travail obligatoire sauf avenant forfait jours -- */
    if (t !== "AVENANT_FORFAIT_JOURS" && t !== "CDI_TEMPS_PARTIEL") {
      if (!data.weeklyHours) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["weeklyHours"],
          message: "Heures hebdomadaires requises",
        });
      }
    }

    /* -- Avenant forfait jours : nb jours obligatoire -- */
    if (t === "AVENANT_FORFAIT_JOURS") {
      if (!data.forfaitDaysPerYear || data.forfaitDaysPerYear < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["forfaitDaysPerYear"],
          message: "Nombre de jours par an requis (max 218)",
        });
      }
    }

    /* -- Temps partiel : champs spécifiques obligatoires -- */
    if (t === "CDI_TEMPS_PARTIEL") {
      if (!data.partTimeHours || data.partTimeHours < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partTimeHours"],
          message: "Nombre d'heures requis",
        });
      }
      if (!data.partTimeSchedule) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["partTimeSchedule"],
          message: "Répartition des horaires requise",
        });
      }
    }

    /* -- Hiérarchie pour maîtrise et cadre service -- */
    if (
      (t === "CDI_SERVICE_MAITRISE" || t === "CDI_SERVICE_CADRE") &&
      !data.directSupervisor
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["directSupervisor"],
        message: "Supérieur hiérarchique requis",
      });
    }
  });

export type ContractFormValues = z.infer<typeof contractFormSchema>;
