import { http, HttpResponse } from "msw";
import regionData from "../data/regionData.json";

let regionStore = [...regionData];

function getNextId() {
  return String(
    regionStore.reduce((maxId, region) => Math.max(maxId, Number(region.id) || 0), 0) + 1,
  );
}

export const regionHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Region`, async ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get("search") || "").trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(url.searchParams.get("limit") || 10), 1);

    const filteredRegions = search
      ? regionStore.filter((region) => region.name.toLowerCase().includes(search))
      : regionStore;

    const total = filteredRegions.length;
    const start = (page - 1) * limit;
    const data = filteredRegions.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      data,
      code: 200,
      message: "",
      meta: {
        length: data.length,
        total,
        page,
        pageSize: limit,
        limit,
      },
    });
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/Region`, async ({ request }) => {
    const body = (await request.json()) as { name?: string };
    const region = {
      id: getNextId(),
      name: body.name?.trim() || "",
    };

    regionStore = [region, ...regionStore];

    return HttpResponse.json({
      success: true,
      data: region,
      code: 201,
      message: "",
    });
  }),
  http.put(`${process.env.NEXT_PUBLIC_API_URL}/Region/ChangeContent/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { name?: string };
    const id = String(params.id);

    const index = regionStore.findIndex((region) => region.id === id);

    if (index === -1) {
      return HttpResponse.json({
        success: false,
        data: null,
        code: 404,
        message: "Région introuvable",
      }, { status: 404 });
    }

    const updatedRegion = {
      ...regionStore[index],
      name: body.name?.trim() || regionStore[index].name,
    };

    regionStore[index] = updatedRegion;

    return HttpResponse.json({
      success: true,
      data: updatedRegion,
      code: 200,
      message: "",
    });
  }),
  http.put(`${process.env.NEXT_PUBLIC_API_URL}/Region/SoftDelete/:id`, async ({ params }) => {
    const id = String(params.id);
    const nextRegions = regionStore.filter((region) => region.id !== id);

    if (nextRegions.length === regionStore.length) {
      return HttpResponse.json({
        success: false,
        data: null,
        code: 404,
        message: "Région introuvable",
      }, { status: 404 });
    }

    regionStore = nextRegions;

    return HttpResponse.json({
      success: true,
      data: `Région ${id} supprimée`,
      code: 200,
      message: "",
    });
  }),
];