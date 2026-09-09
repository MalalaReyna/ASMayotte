import { http, HttpResponse } from "msw";

type DevisStoreItem = {
  id: string;
  idMarket: string;
  enterpriseName: string;
  responsableName: string;
  siret: string;
  phone: string;
  email: string;
  activitySectors: string[];
  adminFiles: string[];
  hasDownloadedDCE: boolean;
  wantsAccompagnementDepot: boolean;
  wantsExpressResponse: boolean;
  hasAdminFiles: boolean;
  createdAt: string;
};

const initialDevisStore: DevisStoreItem[] = [
  {
    id: "devis-1",
    idMarket: "market-1",
    enterpriseName: "Mayotte Services Pro",
    responsableName: "Amina Ali",
    siret: "12345678901234",
    phone: "+262690000001",
    email: "contact@mayotte-services.pro",
    activitySectors: ["maintenance", "nettoyage"],
    adminFiles: ["kbis", "attestation"],
    hasDownloadedDCE: true,
    wantsAccompagnementDepot: true,
    wantsExpressResponse: false,
    hasAdminFiles: true,
    createdAt: "2026-05-10T08:30:00Z",
  },
  {
    id: "devis-2",
    idMarket: "market-2",
    enterpriseName: "Océan Travaux",
    responsableName: "Yassine Hamid",
    siret: "23456789012345",
    phone: "+262690000002",
    email: "contact@oceanttravaux.fr",
    activitySectors: ["travaux", "btp"],
    adminFiles: ["kbis"],
    hasDownloadedDCE: true,
    wantsAccompagnementDepot: false,
    wantsExpressResponse: true,
    hasAdminFiles: true,
    createdAt: "2026-05-13T10:15:00Z",
  },
  {
    id: "devis-3",
    idMarket: "market-3",
    enterpriseName: "Mayotte Restauration",
    responsableName: "Said Abdallah",
    siret: "34567890123456",
    phone: "+262690000003",
    email: "contact@mayotte-restauration.com",
    activitySectors: ["restauration"],
    adminFiles: [],
    hasDownloadedDCE: false,
    wantsAccompagnementDepot: true,
    wantsExpressResponse: false,
    hasAdminFiles: false,
    createdAt: "2026-05-16T14:05:00Z",
  },
];

let devisStore = [...initialDevisStore];

function getNextId() {
  return `devis-${Date.now()}`;
}

function normalizeSearchable(values: string[]) {
  return values.join(" ").toLowerCase();
}

export const devisHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Devis/id`, async ({ params }) => {
    const id = String(params.id);
    const devis = devisStore.find((item) => item.id === id);

    if (!devis) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          code: 404,
          message: "Devis introuvable",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: devis,
      code: 200,
      message: "",
    });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/Devis`, async ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get("search") || "").trim().toLowerCase();
    const fromDateParam = url.searchParams.get("fromDate") || "";
    const toDateParam = url.searchParams.get("toDate") || "";
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(url.searchParams.get("limit") || 10), 1);

    const fromDate = fromDateParam ? new Date(fromDateParam) : null;
    const toDate = toDateParam ? new Date(toDateParam) : null;

    if (fromDate && Number.isNaN(fromDate.getTime())) {
      fromDate.setTime(NaN);
    }
    if (toDate && Number.isNaN(toDate.getTime())) {
      toDate.setTime(NaN);
    }

    if (fromDate && !Number.isNaN(fromDate.getTime())) {
      fromDate.setHours(0, 0, 0, 0);
    }
    if (toDate && !Number.isNaN(toDate.getTime())) {
      toDate.setHours(23, 59, 59, 999);
    }

    const filtered = search
      ? devisStore.filter((item) => {
          const searchable = normalizeSearchable([
            item.enterpriseName,
            item.responsableName,
            item.siret,
            item.email,
            item.idMarket,
            ...item.activitySectors,
            ...item.adminFiles,
          ]);
          return searchable.includes(search);
        })
      : devisStore;

    const filteredByDate = filtered.filter((item) => {
      const createdAt = new Date(item.createdAt).getTime();
      if (Number.isNaN(createdAt)) return false;

      if (fromDate && !Number.isNaN(fromDate.getTime()) && createdAt < fromDate.getTime()) {
        return false;
      }
      if (toDate && !Number.isNaN(toDate.getTime()) && createdAt > toDate.getTime()) {
        return false;
      }

      return true;
    });

    const ordered = [...filteredByDate].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const startIndex = (page - 1) * limit;
    const data = ordered.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      success: true,
      data,
      code: 200,
      message: "",
      meta: {
        length: data.length,
        total: ordered.length,
        page,
        pageSize: limit,
        limit,
      },
    });
  }),
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/Devis`, async ({ request }) => {
    // attente 3 secondes pour simuler le temps de traitement
      await new Promise((resolve) => setTimeout(resolve, 3000));
    const body = (await request.json()) as Omit<DevisStoreItem, "id" | "createdAt">;

    const devis = {
      id: getNextId(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    devisStore = [devis, ...devisStore];

    return HttpResponse.json({
      success: true,
      data: { message: "Demande de devis reçue avec succès !" },
      code: 200,
      message: "",
    });
  }),
];
