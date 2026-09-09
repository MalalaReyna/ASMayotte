/* import axios from "axios";
import getServerSession  from "next-auth";


export async function serverApi() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  try {
    const res = await axios.get("http://localhost:8080/protected", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // refresh déjà tenté côté NextAuth
      throw new Error("Session expired");
    }

    throw error;
  }
} */