export interface GetAdminFileResponse {
  id: string;
  name: string;
}

export interface GetAdminFileRequest {
  GetAllParams: {
    search?: string;
    page?: number;
    limit?: number;
  };
  GetById: {
    id: string;
  };
}
