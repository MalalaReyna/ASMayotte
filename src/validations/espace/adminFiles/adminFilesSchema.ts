import z from "zod";

export const createAdminFileSchema = z.object({
  name: z.string().min(2, "Le nom du fichier admin. doit comporter au moins 2 caractères"),
});

export const updateAdminFileSchema = z.object({
  name: z.string().min(2, "Le nom du fichier admin. doit comporter au moins 2 caractères").optional(),
});


export type CreateAdminFileRequest = z.infer<typeof createAdminFileSchema>;
export type UpdateAdminFileRequest = z.infer<typeof updateAdminFileSchema>;
