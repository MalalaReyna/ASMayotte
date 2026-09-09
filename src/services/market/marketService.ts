import {
  genericCreate,
  genericSoftDelete,
  genericGetList,
  genericGetOne,
  genericUpdate,
  genericGet,
} from "@/api/common";
import { RequestConfigWithAuth } from "@/api/axios";
import {
  GetMarketRequest,
  GetMarketResponse,
  GetMarketStatisticsResponse,
} from "@/types/market/marketType";
import {
  CreateMarketRequest,
  UpdateMarketRequest,
} from "@/validations/espace/market/marketSchema";
import { toIsoWithZeroTime } from "@/helpers/dateHelper";

const url = process.env.NEXT_PUBLIC_API_URL + "/Market";
///on assume que coté back c'est deja order par date de publication
export async function getRecentMarkets(
  params: GetMarketRequest["GetAllParams"],
) {
  const limit = params.limit ?? 9;

  return genericGetList<GetMarketResponse>(url, {
    ...params,
    limit,
  });
}

export async function getMarkets(params?: GetMarketRequest["GetAllParams"]) {
  return genericGetList<GetMarketResponse>(url, {
    ...params,
  });
}

export async function getMarketStatistics() {
  return genericGet<GetMarketStatisticsResponse>(
    process.env.NEXT_PUBLIC_API_URL + "/MarketStatistic",
  );
}

export async function getMarketById(id: string) {
  return genericGetOne<GetMarketResponse>(url + "/id", id);
}

export async function createMarket(values: CreateMarketRequest) {
  return genericCreate<CreateMarketRequest, GetMarketResponse>(url, values);
}

export function mapToUpdateMarketRequest(
  values: UpdateMarketRequest,
): UpdateMarketRequest {
  return { ...values, limitDate: toIsoWithZeroTime(values.limitDate) };
}

export function mapToCreateMarketRequest(
  values: CreateMarketRequest,
): CreateMarketRequest {
  return { ...values, limitDate: toIsoWithZeroTime(values.limitDate) };
}

export async function updateMarket(id: string, values: CreateMarketRequest) {
  return genericUpdate<CreateMarketRequest, GetMarketResponse>(
    url + "/ChangeContent",
    id,
    values,
  );
}

export async function deleteMarket(id: string) {
  return genericSoftDelete(url + "/SoftDelete", id, {
    withAuth: true,
  } as RequestConfigWithAuth);
}
