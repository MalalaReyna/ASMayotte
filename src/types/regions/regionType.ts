export interface GetRegionRequest {
  GetAllParams: {
    search?: string;
    page?: number;
    limit?: number;
  };
  GetById: {
    id: string;
  };
}

export interface GetRegionResponse {
  id: string;
  name: string;
}