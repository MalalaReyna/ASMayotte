import { genericCreate, genericSoftDelete, genericGetList, genericUpdate } from "@/api/common";
import { RequestConfigWithAuth } from "@/api/axios";
import {
  GetAdminFileResponse,
  GetAdminFileRequest,
} from "@/types/adminFiles/adminFilesType";
import {
  CreateAdminFileRequest,
} from "@/validations/espace/adminFiles/adminFilesSchema";
const url = process.env.NEXT_PUBLIC_API_URL + "/AdminFile";
export async function getAdminFiles(
  params?: GetAdminFileRequest["GetAllParams"],
) {
  return genericGetList<GetAdminFileResponse>(url, {
    ...params,
  });
}

export async function createAdminFile(values: CreateAdminFileRequest) {
  return genericCreate<CreateAdminFileRequest, GetAdminFileResponse>(url, values);
}

export async function updateAdminFile(id: string, values: CreateAdminFileRequest) {
  return genericUpdate<CreateAdminFileRequest, GetAdminFileResponse>(url+"/ChangeContent", id, values);
}

export async function deleteAdminFile(id: string) {
  return genericSoftDelete(url+"/SoftDelete", id, { withAuth: true } as RequestConfigWithAuth);
}
