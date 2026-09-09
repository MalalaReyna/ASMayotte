import { axiosWithCredential } from "@/api/axios";
import { genericCreate } from "@/api/common";
import { signIn } from "@/auth";
import { RegisterResponse } from "@/types/authType";
import {
  LoginFormValues,
  RegisterFormValues,
} from "@/validations/auth/authSchema";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = `${API_URL}/Authentication`;
const LOGIN_URL = `${AUTH_URL}/Login`;
const REGISTER_URL = `${AUTH_URL}/Register`;

export async function login(values: LoginFormValues) {
  const result = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
  });
  return result;
}

export async function register(values: RegisterFormValues) {
  return genericCreate<RegisterFormValues, RegisterResponse>(
    REGISTER_URL,
    values,
  );
}

/* export async function refreshToken(token: any) {
  const res = await axiosWithCredential.post(
    `${API_URL}/Authentication/RefreshToken`,
    {
      refreshToken: token.refreshToken,
    },
  );
  return res;
}
 */