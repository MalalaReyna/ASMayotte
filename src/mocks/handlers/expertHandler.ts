import { http, HttpResponse } from "msw";
import { getAllExpertsMock } from "../data/expertGetAllMock";

export const expertHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/TeamMember`, async () => {
    const expertGetAll=getAllExpertsMock();
    return HttpResponse.json({
      success: true,
      data: expertGetAll,
      code: 200,
      message: "",
      meta: {
        length: expertGetAll.length,
        total: expertGetAll.length,
        page: 1,
        pageSize: expertGetAll.length,
        limit: expertGetAll.length
      }
    });
  })
];