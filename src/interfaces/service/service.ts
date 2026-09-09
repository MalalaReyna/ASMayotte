import { IFAQItem } from "../faqItem";

export interface IService {
  id: string;
  name: string;
  isLegalJuridiction: boolean;
  hasCapitalSocial: boolean;
  description: string;
  slug?: string;
  iconUrl?: string;
  tarrif: number;
  createdAt: Date;
  imageUrl?: string;
}

export interface ServiceClass {
  id: string;
  serviceName: string;
  serviceDescription: string;
  slug: string;
  buttonUrl: string;
  isLegalJuridiction: boolean;
  hasCapitalSocial: boolean;
  infoServiceData: InfoServiceData;
  faqList?: IFAQItem[];
}

export interface InfoServiceData {
  AUDIENCE_TARGET: AudienceTarget[];
  ADVANTAGES: Advantage[];
  STEP_PROCESS: StepProcess[];
  H1: H1Data;
}

export interface AudienceTarget {
  title: string;
  description: string;
}

export interface Advantage {
  title: string;
  description: string;
}

export interface StepProcess {
  title: string;
  description: string;
}

export interface H1Data {
  title: string;
  description: string;
}
