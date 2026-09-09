import { http, HttpResponse } from "msw";
import faqGetAll from "../data/faqGetAll.json";

export const faqHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Faq`, async ({request}) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    console.log("search param:", search);
    return HttpResponse.json({
      success: true,
      data: faqGetAll,
      code: 200,
      message: "",
      meta: {
        length: faqGetAll.length,
        total: faqGetAll.length,
        page: 1,
        pageSize: faqGetAll.length,
        limit: faqGetAll.length
      }
    });
  })
];