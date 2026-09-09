import { http, HttpResponse } from "msw";
import getAllSector from "../data/getAllSectorResponse.json";

export const sectorHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Sector`, async () => {
    return HttpResponse.json({
      success: true,
      data: getAllSector,
      code: 200,
      message: "",
      meta: {
        length: getAllSector.length,
        total: getAllSector.length,
        page: 1,
        pageSize: getAllSector.length,
        limit: getAllSector.length
      }
    });
  })
];