import { http, HttpResponse } from "msw";
export const contactUsHandlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/SendMail/send`,
    async ({ request }) => {
      const payload = await request.formData();
      console.log("Received request to sendMail  values:", payload);
      // attente 3 secondes pour simuler le temps de traitement
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return HttpResponse.json({
        success: true,
        data: {
          message: "Email envoyé avec succès",
        },
        code: 200,
        message: "",
        meta: null,
      });
    },
  ),
];
