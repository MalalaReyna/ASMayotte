import { http, HttpResponse } from "msw";
import marketData from "../data/marketData.json";

type MarketStoreItem = {
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
  region?: string;
};

type MarketPayload = {
  title: string;
  description: string;
  footerDescription: string;
  idLocation: string;
  limitDate: string;
  displayPrice: string;
  price: number;
  lot: number;
  duration: number;
  reference: string;
  sigleReference: string;
  buyer: string;
  avisLink?: string;
  idTypeMarket: string;
  tags: string[];
};

let marketStore: MarketStoreItem[] = [...(marketData as MarketStoreItem[])];

function getNextId() {
  return `market-${Date.now()}`;
}

function mapPayloadToMarket(
  id: string,
  payload: MarketPayload,
  current?: MarketStoreItem,
): MarketStoreItem {
  return {
    id,
    title: payload.title,
    description: payload.description,
    footerDescription: payload.footerDescription,
    location: payload.idLocation,
    limitDate: payload.limitDate,
    displayPrice: payload.displayPrice,
    price: payload.price,
    lot: payload.lot,
    duration: payload.duration,
    reference: payload.reference,
    sigleReference: payload.sigleReference,
    buyer: payload.buyer,
    avisLink: payload.avisLink || "",
    typeMarket: payload.idTypeMarket,
    tags: payload.tags,
    createdAt: current?.createdAt ?? new Date().toISOString(),
    region: payload.idLocation,
  };
}

export const marketHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/MarketStatistic`,
    async ({ request }) => {
      return HttpResponse.json({
        success: true,
        data: {
          markets: 12,
          regions: 6,
          files: "+80",
          production: "48h-7j",
        },
        code: 200,
        message: "",
      });
    },
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/Market/id`,
    async ({ request }) => {
      const url = new URL(request.url);
      const id = url.searchParams.get("id") || "";
      const market = marketStore.find((item) => item.id === id);

      if (!market) {
        return HttpResponse.json(
          {
            success: false,
            data: null,
            code: 404,
            message: "Appel d'offre introuvable",
          },
          { status: 404 },
        );
      }

      return HttpResponse.json({
        success: true,
        data: market,
        code: 200,
        message: "",
      });
    },
  ),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Market`, async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const region = url.searchParams.get("region") || "";
    const typeMarket = url.searchParams.get("typeMarket") || "";
    const orderBy = url.searchParams.get("orderBy") || "";
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : 9;
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? Number(pageParam) : 1;

    const filteredData = marketStore.filter((market) => {
      if (search) {
        const searchable = [
          market.title,
          market.description,
          market.buyer,
          market.location,
          market.reference,
          market.typeMarket,
          market.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(search.toLowerCase())) return false;
      }
      if (region && market.region !== region) return false;
      if (typeMarket && market.typeMarket !== typeMarket) return false;
      return true;
    });

    const orderedData =
      orderBy === "createdAt"
        ? [...filteredData].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        : filteredData;

    const safeLimit = Number.isNaN(limit) ? 9 : limit;
    const safePage = Number.isNaN(page) ? 1 : Math.max(1, page);
    const startIndex = (safePage - 1) * safeLimit;
    const slicedData = orderedData.slice(startIndex, startIndex + safeLimit);

    return HttpResponse.json({
      success: true,
      data: slicedData,
      code: 200,
      message: "",
      meta: {
        length: slicedData.length,
        total: orderedData.length,
        page: safePage,
        pageSize: safeLimit,
        limit: safeLimit,
      },
    });
  }),
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/Market`,
    async ({ request }) => {
      const body = (await request.json()) as MarketPayload;
      const market = mapPayloadToMarket(getNextId(), body);
      marketStore = [market, ...marketStore];

      return HttpResponse.json({
        success: true,
        data: market,
        code: 201,
        message: "",
      });
    },
  ),
  http.put(
    `${process.env.NEXT_PUBLIC_API_URL}/Market/ChangeContent/:id`,
    async ({ params, request }) => {
      const id = String(params.id);
      const body = (await request.json()) as MarketPayload;
      const index = marketStore.findIndex((item) => item.id === id);

      if (index === -1) {
        return HttpResponse.json(
          {
            success: false,
            data: null,
            code: 404,
            message: "Appel d'offre introuvable",
          },
          { status: 404 },
        );
      }

      const updated = mapPayloadToMarket(id, body, marketStore[index]);
      marketStore[index] = updated;

      return HttpResponse.json({
        success: true,
        data: updated,
        code: 200,
        message: "",
      });
    },
  ),
  http.put(
    `${process.env.NEXT_PUBLIC_API_URL}/Market/SoftDelete/:id`,
    async ({ params }) => {
      const id = String(params.id);
      const next = marketStore.filter((item) => item.id !== id);

      if (next.length === marketStore.length) {
        return HttpResponse.json(
          {
            success: false,
            data: null,
            code: 404,
            message: "Appel d'offre introuvable",
          },
          { status: 404 },
        );
      }

      marketStore = next;

      return HttpResponse.json({
        success: true,
        data: `Appel d'offre ${id} supprimé`,
        code: 200,
        message: "",
      });
    },
  ),
];
