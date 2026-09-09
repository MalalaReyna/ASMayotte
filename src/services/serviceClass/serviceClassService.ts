import { genericGet } from "@/api/common";
import { IService, ServiceClass } from "@/interfaces/service/service";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/ServiceClass";

type ServicesGroupedResponse = {
  legalJuridicationList: IService[];
  serviceList: IService[];
};

// GET /services?isLegalJuridiction=true|false
export async function getAllServices(
  isLegalJuridiction?: boolean
): Promise<ServicesGroupedResponse | undefined> {
  const params =
    isLegalJuridiction !== undefined ? { isLegalJuridiction } : undefined;

  const response = await genericGet<ServicesGroupedResponse>(baseUrl, params);
  return response?.data;
}

// GET /services/id?id=... or /services/id?slug=...
export async function getServiceById(
  id?: string,
): Promise<ServiceClass | undefined> {
  const params: Record<string, string> = {};
  if (id) params.id = id;

  const response = await genericGet<ServiceClass>(`${baseUrl}/id`, params);
  return response?.data;
}

// GET /services/id?slug=...
export async function getServiceBySlug(
  slug?: string
): Promise<ServiceClass | undefined> {
  const params: Record<string, string> = {};
  if (slug) params.slug = slug;

  const response = await genericGet<ServiceClass>(`${baseUrl}/slug`, params);
  return response?.data;
}

