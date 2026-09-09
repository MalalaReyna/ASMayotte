import Axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };
export type RequestConfigWithAuth = InternalAxiosRequestConfig & {
  withAuth?: boolean;
};

type AuthLikeSession = {
  accessToken?: string;
  error?: string;
} | null;

async function getAuthSession(): Promise<AuthLikeSession> {
  if (typeof window !== "undefined") {
    const { getSession } = await import("next-auth/react");
    return getSession();
  }
  const { auth } = await import("@/auth");
  return auth();
}

export const axiosWithCredential = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true,
});

axiosWithCredential.interceptors.request.use(async (config) => {
  const cfg = config as RequestConfigWithAuth;

  if (!cfg.withAuth) return config;

  const session = await getAuthSession();

  if (!config.headers) config.headers = new AxiosHeaders();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

axiosWithCredential.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (RetryableRequest & { withAuth?: boolean })
      | undefined;
    if (!originalRequest) return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.withAuth
    ) {
      originalRequest._retry = true;

      const refreshed = await getAuthSession();

      if (refreshed?.accessToken) {
        if (!originalRequest.headers)
          originalRequest.headers = new AxiosHeaders();
        originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
      }

      return axiosWithCredential(originalRequest);
    }

    return Promise.reject(error);
  },
);

export const catchAxios = (error: unknown): never => {
  if (isAxiosError(error)) {
    const err = error as AxiosError;
    if (err.response) {
      const errorVrai = err.response.data as { message?: string };
      console.error("API error :>> ", errorVrai.message || err.message);
      throw new Error(
        errorVrai.message || err.message || "An unknown error occurred",
      );
    }
    throw err;
  } else {
    throw new Error("An unexpected error occurred");
  }
};
