import { http, HttpResponse } from "msw";

export const wizardHandlers = [
  http.post(`${process.env.NEXT_PUBLIC_API_URL}/Enterprise`, async ({request}) => {
    console.log("Received request to /Enterprise with body:", await request.json());
    return HttpResponse.json({
      success: true,
      data: { clientSecret: process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET || "clientsecretmock" },
      code: 200,
      message: "",
      meta: null,
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/session-status`,
    ({ request }) => {
      const url = new URL(request.url);
      const sessionId = url.searchParams.get("session_id") || "";

      return HttpResponse.json({
        status: "complete",
        customer_email: "mock@example.com",
        session_id: sessionId,
      });
    },
  ),
];
