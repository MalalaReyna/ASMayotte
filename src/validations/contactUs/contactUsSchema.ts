import {z} from "zod";

export const contactUsFormSchema = z.object({
    prenom: z.string().min(1, "Le prénom est requis"),
    nom: z.string().min(1, "Le nom est requis"),
    email: z.string().email("L'email doit être valide"),
    phone: z.string()
      .min(7, "Numéro invalide"),
    type: z.string().nullable(),
    localisation: z.string().nullable(),
    message: z.string().min(1, "Le message est requis"),
    /* acceptCondition: z.boolean().refine(val => val === true, "Vous devez accepter les conditions") */
})

export type ContactUsFormData = z.infer<typeof contactUsFormSchema>;