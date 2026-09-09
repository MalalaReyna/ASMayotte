import { http, HttpResponse } from "msw";
import testimonialGetAll from "../data/testimonialGetAllMock";

export const testimonialHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Testimonial`, async () => {
    return HttpResponse.json({
      success: true,
      data: testimonialGetAll,
      code: 200,
      message: "",
      meta: {
        length: testimonialGetAll.length,
        total: testimonialGetAll.length,
        page: 1,
        pageSize: testimonialGetAll.length,
        limit: testimonialGetAll.length
      }
    });
  })
];