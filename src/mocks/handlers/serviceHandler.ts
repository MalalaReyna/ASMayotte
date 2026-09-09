/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";
import { getAllServiceClassMock, getJuridctionOnlyMock } from "../data/serviceClassGetAllMock";
import { getServiceClassByIdOrSlugMock } from "../data/serviceClassGetByIdOrSlugMock";
export const serviceHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/ServiceClass`, async ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const isLegalJuridictionParam = searchParams.get("isLegalJuridiction");

    let filteredData = getAllServiceClassMock();

    if (isLegalJuridictionParam !== null) {
      const isLegalJuridiction = isLegalJuridictionParam === "true";
      filteredData = getJuridctionOnlyMock();
    }

    return HttpResponse.json({
      success: true,
      data: filteredData,
      code: 200,
      message: "",
      meta: {
        total: null,
        page: null,
        limit: null
      }
    });
  }),

http.get(`${process.env.NEXT_PUBLIC_API_URL}/ServiceClass/slug`, async ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return HttpResponse.json(
        {
          success: false,
          message: "Slug requis.",
          code: 400
        },
        { status: 400 }
      );
    }

    const serviceFound = getServiceClassByIdOrSlugMock(slug);
    if (!serviceFound) {
      return HttpResponse.json(
        {
          success: false,
          message: "Service non trouvé.",
          code: 404
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: serviceFound,
      code: 200,
      message: ""
    });
  }),


  http.get(`${process.env.NEXT_PUBLIC_API_URL}/ServiceClass/id`, async ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return HttpResponse.json(
        {
          success: false,
          message: "ID ou slug requis.",
          code: 400
        },
        { status: 400 }
      );
    }

    const serviceFound = getServiceClassByIdOrSlugMock(id ?? slug!);
    if (!serviceFound) {
      return HttpResponse.json(
        {
          success: false,
          message: "Service non trouvé.",
          code: 404
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: serviceFound,
      code: 200,
      message: ""
    });
  })
];