import z from "zod";

export const createMarketSchema = z.object({
    title: z.string().min(2, "Le titre du marché doit comporter au moins 2 caractères"),
    description: z.string().min(10, "La description du marché doit comporter au moins 10 caractères"),
    footerDescription: z.string().min(10, "La description de pied de page du marché doit comporter au moins 10 caractères"),
    idLocation: z.string().min(1, "La localisation du marché est requise"),
    limitDate: z.string().refine((date) => !isNaN(Date.parse(date)), "La date limite doit être une date valide"),
    displayPrice: z.string().min(1, "Le prix affiché du marché est requis"),
    price: z.number().min(0, "Le prix du marché doit être un nombre positif"),
    lot: z.number().min(1, "Le lot du marché est requis"),
    duration: z.number().min(1, "La durée du marché doit être d'au moins 1 jour"),
    reference: z.string().min(1, "La référence du marché est requise"),
    sigleReference: z.string().min(1, "La sigle référence du marché est requise"),
    buyer: z.string().min(2, "Le nom de l'acheteur doit comporter au moins 2 caractères"),
    avisLink: z.union([
        z.string().url("Le lien de l'avis doit être une URL valide"),
        z.literal(""),
    ]).optional(),
    idTypeMarket: z.string().min(1, "Le type de marché est requis"),
    tags: z.preprocess(
        (value) => {
            if (!Array.isArray(value)) return value;

            return value
                .map((tag) => (typeof tag === "string" ? tag.trim() : tag))
                .filter((tag) => typeof tag === "string" && tag.length > 0);
        },
        z.array(z.string().min(1)).min(1, "Au moins un tag de marché est requis"),
    ),
});

export const updateMarketSchema = createMarketSchema;

export type CreateMarketRequest = z.infer<typeof createMarketSchema>;
export type UpdateMarketRequest = z.infer<typeof updateMarketSchema>;