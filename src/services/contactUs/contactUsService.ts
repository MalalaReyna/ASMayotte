import { genericCreate } from "@/api/common";
import { ContactUsRequest, ContactUsResponse } from "@/types/contactUs/contactUsType";
import { ContactUsFormData } from "@/validations/contactUs/contactUsSchema";
import { AxiosHeaders } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/SendMail";

export function mapContactUsFormDataToRequest(
  data: ContactUsFormData
): ContactUsRequest {
  return {
    firstName: data.prenom,
    lastName: data.nom,
    email: data.email,
    phone: data.phone,
    enterprise: data.type ? data.type : "General",
    location: data.localisation ? data.localisation : "Non spécifiée",
    message: data.message,
  };
}

export async function sendContactUsMail(
  values: ContactUsRequest,
) {
  return genericCreate<
    ContactUsRequest,
    ContactUsResponse
  >(API_URL+"/send", values, {
    withAuth: true,
    headers: new AxiosHeaders({
      "Content-Type": "multipart/form-data",
    }),
  });
}
