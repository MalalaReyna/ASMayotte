import { http, HttpResponse } from "msw";
import { adminFilesMock } from "../data/adminFileGetAllMock";
let adminFileStore = [...adminFilesMock];

function getNextId() {
  return String(
    adminFileStore.reduce((maxId, file) => Math.max(maxId, Number(file.id) || 0), 0) + 1,
  );
}

export const adminFileHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/AdminFile`, async ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get("search") || "").trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const limit = Math.max(Number(url.searchParams.get("limit") || 10), 1);

    const filteredFiles = search
      ? adminFileStore.filter((file) => file.name.toLowerCase().includes(search))
      : adminFileStore;

    const total = filteredFiles.length;
    const start = (page - 1) * limit;
    const data = filteredFiles.slice(start, start + limit);

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
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/AdminFile`, async ({ request }) => {
    const body = (await request.json()) as { name?: string };
    const file = {
      id: getNextId(),
      name: body.name?.trim() || "",
    };

    adminFileStore = [file, ...adminFileStore];

    return HttpResponse.json({
      success: true,
      data: file,
      code: 201,
      message: "",
    });
  }),
  http.put(`${process.env.NEXT_PUBLIC_API_URL}/AdminFile/ChangeContent/:id`, async ({ params, request }) => {
    const body = (await request.json()) as { name?: string };
    const id = String(params.id);
    const index = adminFileStore.findIndex((file) => file.id === id);

    if (index === -1) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          code: 404,
          message: "Prestation introuvable",
        },
        { status: 404 },
      );
    }

    const updatedFile = {
      ...adminFileStore[index],
      name: body.name?.trim() || adminFileStore[index].name,
    };

    adminFileStore[index] = updatedFile;

    return HttpResponse.json({
      success: true,
      data: updatedFile,
      code: 200,
      message: "",
    });
  }),
  http.put(`${process.env.NEXT_PUBLIC_API_URL}/AdminFile/SoftDelete/:id`, async ({ params }) => {
    const id = String(params.id);
    const nextFiles = adminFileStore.filter((file) => file.id !== id);

    if (nextFiles.length === adminFileStore.length) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          code: 404,
          message: "Prestation introuvable",
        },
        { status: 404 },
      );
    }

    adminFileStore = nextFiles;

    return HttpResponse.json({
      success: true,
      data: `Prestation ${id} supprimé`,
      code: 200,
      message: "",
    });
  }),
];
