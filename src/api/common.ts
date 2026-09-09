import { ApiResponse, Meta } from "@/interfaces/api";
import {
  axiosWithCredential,
  catchAxios,
  RequestConfigWithAuth,
} from "./axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

export type DefaultSearchParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export const genericDelete = async (
  url: string,
  id: string | number,
  config: RequestConfigWithAuth,
) => {
  try {
    const response: AxiosResponse<ApiResponse<string>> =
      // await axiosWithCredential.delete(url, { params: { entityId: id } });
      await axiosWithCredential.delete(`${url}/${id}`, config);

    if (!response.data.success)
      throw new Error(response.data.message || "An unknown error occurred");

    return response.data.data;
  } catch (error) {
    catchAxios(error);
  }
};

export const genericSoftDelete = async (
  url: string,
  id: string | number,
  config: RequestConfigWithAuth,
) => {
  try {
    const response: AxiosResponse<ApiResponse<string>> =
      await axiosWithCredential.put(`${url}/${id}`, { id: id }, config);

    if (!response.data.success)
      throw new Error(response.data.message || "An unknown error occurred");

    return response.data.data;
  } catch (error) {
    catchAxios(error);
  }
};
export const genericUpdate = async <TUpdate, TResponse>(
  baseUrl: string,
  id: string,
  data: TUpdate,
  config?: RequestConfigWithAuth,
): Promise<TResponse | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<TResponse>> =
      await axiosWithCredential.put(`${baseUrl}/${id}`, data, config);

    if (!response.data.success) {
      throw new Error(response.data.message || "An unknown error occurred");
    }

    return response.data.data;
  } catch (error) {
    catchAxios(error);
  }
};

export const genericCreate = async <TNewData, TResponse>(
  baseUrl: string,
  newData: TNewData,
  config?: RequestConfigWithAuth,
) => {
  try {
    const response: AxiosResponse<ApiResponse<TResponse>> =
      await axiosWithCredential.post(baseUrl, newData, config);

    if (!response.data.success)
      throw new Error(response.data.message || "An unknown error occurred");

    return response.data.data;
  } catch (error) {
    catchAxios(error);
  }
};

export async function genericGetList<T>(
  url: string,
  params?: Record<string, any>,
  config?:RequestConfigWithAuth
): Promise<{ meta?: Meta; data: T[] } | undefined> {
  try {
    const response: AxiosResponse<ApiResponse<T[]>> =
      await axiosWithCredential.get(url, {
        ...config,
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

    if (!response.data.data)
      throw new Error(response.data.message || "An error occurred");

    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    catchAxios(error);
  }
}

export async function genericGet<T>(
  url: string,
  params?: Record<string, string | number | boolean>,
  config?: RequestConfigWithAuth
): Promise<{ meta?: Meta; data: T } | undefined> {
  try {
    const response: AxiosResponse<ApiResponse<T>> =
      await axiosWithCredential.get(url, {
        ...config,
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

    if (!response.data.data) {
      throw new Error(response.data.message || "An error occurred");
    }

    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    catchAxios(error);
  }
}

/* export async function genericGetOne<T>(
  url: string,
  id: string,
  config?: RequestConfigWithAuth
): Promise<T | undefined> {
  try {
    const response: AxiosResponse<ApiResponse<T>> =
      await axiosWithCredential.get(`${url}/${id}`, config);

    if (!response.data.data)
      throw new Error(response.data.message || "An error occurred");

    return response.data.data;
  } catch (error) {
    catchAxios(error);
  }
} */

export async function genericGetOne<T>(
  url: string,
  id: string,
  config?: RequestConfigWithAuth
): Promise<T | undefined> {
  return genericGet<T>(url, { id }, config).then((res) => res?.data);
}
