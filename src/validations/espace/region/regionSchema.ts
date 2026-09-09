import z from "zod";

export const createRegionSchema = z.object({
  name: z.string().min(2, "Le nom de la région doit comporter au moins 2 caractères"),
});

export const updateRegionSchema = z.object({
  name: z.string().min(2, "Le nom de la région doit comporter au moins 2 caractères").optional(),
});


export type CreateRegionRequest = z.infer<typeof createRegionSchema>;
export type UpdateRegionRequest = z.infer<typeof updateRegionSchema>;
