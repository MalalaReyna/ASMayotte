import type { WizardSchemaType } from "@/validations/wizard/wizardSchema";

export type DossierStatus = "Valide" | "En attente client" | "Urgent" | "En cours / Nouveau";

export type DossierUrgency = "basse" | "moyenne" | "haute";

export type DossierItem = {
  id: string;
  title: string;
  reference: string;
  client: string;
  category: string;
  status: DossierStatus;
  territory: string;
  urgency: DossierUrgency;
  createdAt: string;
};


export type DossierMeta = {
  id: string;
  clientName: string;
  status: "En revue" | "Valide" | "Urgent" | "En attente";
  openedAt: string;
};

export type DossierDetailData = {
  meta: DossierMeta;
  wizard: WizardSchemaType;
  urgency: "Normal" | "Elevee" | "Urgente";
};

export type DossierAttachment = {
  id: string;
  name: string;
};

export type DossierGeneratedDoc = {
  id: string;
  name: string;
};

export type DossierChatMessage = {
  id: string;
  author: string;
  content: string;
  direction: "incoming" | "outgoing";
};
