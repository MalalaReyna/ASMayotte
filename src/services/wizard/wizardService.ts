import { genericCreate, genericGet } from "@/api/common";
import {
  DmdCreationEntrepriseRequest,
  DmdCreationEntrepriseResponse,
} from "@/types/wizardTypes";
import { WizardSchemaType } from "@/validations/wizard/wizardSchema";
import { AxiosHeaders } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/Enterprise";
const VERIFY_SESSION_URL = process.env.NEXT_PUBLIC_API_URL + "/verify-session";

export type VerifySessionResponse = {
  paid: boolean;
};

export function mapWizardFormDataToRequest(
  data: WizardSchemaType,
  idUser: string,
  access: string,
): DmdCreationEntrepriseRequest {
  return {
    accessToken: access,
    idLegalJuridiction: data.legalStructure.id,
    idUser: idUser,
    capitalSocial: parseFloat(
      data.capital != "" ? data.capital.replace(",", ".") : "0",
    ),
    name: data.companyName,
    location: data.location,
    hqAdress: data.address,
    postalCode: data.postalCode,
    city: data.city,
    idActivities: data.activityType.map((activity) => activity.id),
    partners: data.associates.map((associate) => ({
      name: associate.name,
      email: associate.email,
      sharePercentage: associate.sharePercentage.toString(),
      phoneNumber: associate.phoneNumber,
      fullAddress: associate.fullAddress,
      city: associate.city,
      country: associate.country,
      isFrenchNationality: associate.isFrenchNationality,
      birthCountry: associate.birthCountry,
      birthCity: associate.birthCity,
      birthPostalCode: associate.birthPostalCode,
      /* birthDate: new Date(associate.birthDate), */
      birthDate: associate.birthDate.split("T")[0],
      maritalStatus: Number(associate.maritalStatus),
      spouseFirstName: associate.spouseFirstName || "",
      spouseLastName: associate.spouseLastName || "",
      maritalRegime: Number(associate.maritalRegime),
      isLeader: associate.isLeader,
      isSpouseAssociate: associate.isSpouseAssociate,
      isMinor: associate.isMinor,
      isUnderGuardianship: associate.isUnderGuardianship,
    })),
  };
}

export async function createDmdCreationEntreprise(
  values: DmdCreationEntrepriseRequest,
) {
  return genericCreate<
    DmdCreationEntrepriseRequest,
    DmdCreationEntrepriseResponse
  >(API_URL, values, {
    withAuth: true,
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
  });
}

//  fetch client secret
export const fetchClientSecret = async (
  values: DmdCreationEntrepriseRequest,
) => {
  const response = await genericCreate<
    DmdCreationEntrepriseRequest,
    { clientSecret: string }
  >(API_URL, values, {
    withAuth: true, // Adjust this based on whether authentication is required
    headers: new AxiosHeaders({
      "Content-Type": "application/json",
    }),
  });

  if (!response || !response.clientSecret) {
    throw new Error("Erreur Stripe");
  }
  return response.clientSecret;
};

export async function verifyPaymentSession(sessionId: string) {
  const response = await genericGet<VerifySessionResponse>(VERIFY_SESSION_URL, {
    session_id: sessionId,
  });

  if (!response?.data) {
    throw new Error("Erreur de verification du paiement");
  }

  return response.data;
}
