import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmedPassword: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    phone: z
  .string()
  .min(7, "Numéro invalide")
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmedPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    /* .min(6, "Le mot de passe doit contenir au moins 6 caractères"), */
});

export type LoginFormValues = z.infer<typeof loginSchema>;
