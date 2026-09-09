export interface GetDevisRequest {
  GetAllParams: {
    search?: string;
    page?: number;
    limit?: number;
    fromDate?: string;
    toDate?: string;
  };
  GetById: {
    id: string;
  };
}
interface AdminFile{
  adminFileName:string;
  fileName:string;
  url?:string;
}
export interface GetDevisResponse {
  id: string;
  idMarket: string;
  enterpriseName: string;
  responsableName: string;
  siret: string;
  phone: string;
  email: string;
  activitySectors: string[];
  adminFiles: AdminFile[];
  hasDownloadedDCE: boolean;
  wantsAccompagnementDepot: boolean;
  wantsExpressResponse: boolean;
  hasAdminFiles: boolean;
  createdAt: string;
}

export interface CreateDevisRequest {
  idMarket: string;
  enterpriseName: string;
  responsableName: string;
  siret: string;
  phone: string;
  email: string;
  activitySectors: string[];
  adminFiles: string[];
  hasDownloadedDCE: boolean;
  wantsAccompagnementDepot: boolean;
  wantsExpressResponse: boolean;
  hasAdminFiles: boolean;
}
export interface CreateDevisResponse {
  message: string;
}
