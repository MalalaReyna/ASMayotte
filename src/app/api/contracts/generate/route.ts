import { NextResponse } from "next/server";
import { generateContractIA } from "@/services/contract/contractService";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Corps de requete JSON invalide." },
        { status: 400 },
      );
    }

    /* const parsed = contractFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Donnees de formulaire invalides.",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    } */
    const result = await generateContractIA(body);

    if (!result?.htmlString) {
      throw new Error("Aucun lien html retourne.");
    }

    return NextResponse.json(
      { htmlString: result.htmlString },
      { status: 200 },
    );
  } catch (error) {
    console.log("[api/contracts/generate] error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Erreur interne lors de la generation du contrat.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
