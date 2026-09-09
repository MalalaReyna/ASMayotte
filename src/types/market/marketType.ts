export interface GetMarketRequest {
  GetAllParams: {
    search?: string;
    page?: number;
    limit?: number;
    hasExpired?: boolean;
    region?: string;
    typeMarket?: string;
  };
  GetById: {
    id: string;
  };
}

export interface GetMarketResponse {
  id: string;
  title: string;
  description: string;
  footerDescription: string;
  location: string;
  limitDate: string;
  displayPrice: string;
  price: number;
  lot: number;
  duration: number;
  reference: string;
  sigleReference: string;
  buyer: string;
  avisLink: string;
  typeMarket: string;
  tags: string[];
  createdAt: string;
}


export interface GetMarketStatisticsResponse {
  markets: number;
  regions: number;
  files: string;
  production: string;
}