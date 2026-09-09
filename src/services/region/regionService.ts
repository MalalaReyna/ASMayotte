import { genericCreate, genericSoftDelete, genericGetList, genericUpdate } from "@/api/common";
import { RequestConfigWithAuth } from "@/api/axios";
import { GetRegionRequest, GetRegionResponse } from "@/types/regions/regionType";
import { CreateRegionRequest } from "@/validations/espace/region/regionSchema";

const url = process.env.NEXT_PUBLIC_API_URL + "/Region";

export async function getRegions(params: GetRegionRequest["GetAllParams"]) {
  return genericGetList<GetRegionResponse>(url, {
    ...params,
  });
}

export async function createRegion(values: CreateRegionRequest) {
  return genericCreate<CreateRegionRequest, GetRegionResponse>(url, values);
}

export async function updateRegion(id: string, values: CreateRegionRequest) {
  return genericUpdate<CreateRegionRequest, GetRegionResponse>(url+"/ChangeContent", id, values);
}

export async function deleteRegion(id: string) {
  return genericSoftDelete(url+"/SoftDelete", id, { withAuth: true } as RequestConfigWithAuth);
}