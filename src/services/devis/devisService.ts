import {
  genericCreate,
  genericGetList,
  genericGetOne,
} from "@/api/common";
import {
  CreateDevisRequest,
  CreateDevisResponse,
  GetDevisRequest,
  GetDevisResponse,
} from "@/types/devis/devisType";
import { AxiosHeaders } from "axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/Devis";

export async function sendDmdDevis(body: CreateDevisRequest) {
  return genericCreate<CreateDevisRequest, CreateDevisResponse>(url, body, {
    withAuth: false,
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
  });
}

export async function getDevis(params?: GetDevisRequest["GetAllParams"]) {
  return genericGetList<GetDevisResponse>(url, {
    ...params,
  });
}

export async function getDevisById(id: string) {
  return genericGetOne<GetDevisResponse>(url+"/id", id);
}
