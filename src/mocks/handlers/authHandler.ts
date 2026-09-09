import { http, HttpResponse } from "msw";
import { addUser, findUserByEmail } from "../data/userMock";
export const authHandlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/Authentication/Login`,
    async ({ request }) => {
      const body = (await request.json().catch(() => null)) as {
        email?: string;
        password?: string;
      } | null;

      if (!body?.email || !body?.password) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Email et mot de passe requis.",
          },
          { status: 400 },
        );
      }
      const user = findUserByEmail(body.email);
      const isValidLogin = user?.password === body.password;

      if (!isValidLogin) {
        return HttpResponse.json(
          {
            success: false,
            code: 401,
            message: "Identifiants invalides.",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          data: {
            token: "dsfdsfdsfs",
            refreshToken: "dsfdsfdsfs",
            id: user.id,
            role:"ADMIN",
            name: user.name,
            email: user.email,
          },
        },
        { status: 200 },
      );
    },
  ),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/Authentication/Register`,
    async ({ request }) => {
      const body = (await request.json().catch(() => null)) as {
        name?: string;
        email?: string;
        password?: string;
        confirmedPassword?: string;
        phone?: string;
        phone_number?: string;
      } | null;

      if (!body) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Corps de requête invalide.",
          },
          { status: 400 },
        );
      }

      const phone = body.phone ?? body.phone_number;

      if (
        !body.name ||
        !body.email ||
        !body.password ||
        !body.confirmedPassword ||
        !phone
      ) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Champs requis manquants.",
          },
          { status: 400 },
        );
      }

      if (body.password !== body.confirmedPassword) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Les mots de passe ne correspondent pas.",
          },
          { status: 400 },
        );
      }

      if (body.password.length < 6) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Le mot de passe doit contenir au moins 6 caractères.",
          },
          { status: 400 },
        );
      }
      //add user to mock db
      const newUser = {
        name: body.name,
        email: body.email,
        password: body.password,
      };
      addUser(newUser.name, newUser.email, newUser.password);

      return HttpResponse.json(
        {
          email: body.email,
        },
        { status: 201 },
      );
    },
  ),

  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/Authentication/RefreshToken`,
    async ({ request }) => {
      const body = (await request.json().catch(() => null)) as {
        refreshToken?: string;
      } | null;

      if (!body) {
        return HttpResponse.json(
          {
            success: false,
            code: 400,
            message: "Corps de requête invalide.",
          },
          { status: 400 },
        );
      }

      return HttpResponse.json(
        {
          accessToken: "newAccessToken",
          refreshToken: "newRefreshToken",
        },
        { status: 201 },
      );
    },
  ),
];
