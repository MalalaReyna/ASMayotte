export type DmdCreationEntrepriseResponse = {
  message: string;
}

export type DmdCreationEntrepriseRequest = {
  accessToken :string ;
  idLegalJuridiction:string;
  idUser:string;
  capitalSocial:number;
  name:string;
  location:string;
  hqAdress:string;
  postalCode:string;
  city:string;
  idActivities:string[];
  partners:{
    name:string;
    email:string;
    sharePercentage:string;
    phoneNumber:string;
    fullAddress:string;
    city:string;
    country:string;
    isFrenchNationality:boolean;
    birthCountry:string;
    birthCity:string;
    birthPostalCode:string;
    /* birthDate:Date; */
    birthDate:string;
    maritalStatus:number;
    spouseFirstName:string;
    spouseLastName:string;
    maritalRegime:number;
    isLeader:boolean;
    isSpouseAssociate:boolean;
    isMinor:boolean;
    isUnderGuardianship:boolean;
  }[]
}

export type WizardAssociate = {
  name: string;
  email: string;
  sharePercentage: string; // string pour input text, validé par zod
};

export type WizardFormData = {
  legalStructure: string;
  capital: string;
  companyName: string;
  location: string;
  address: string;
  postalCode: string;
  city: string;
  activityType: string;
  activitySector: string;
  associates: WizardAssociate[];
};

export type SetField = (key: keyof WizardFormData, value: string) => void;