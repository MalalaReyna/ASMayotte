import PublicTenderListExperience from "@/features/services/public-market/PublicTenderListExperience";
import type { Metadata } from "next";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Voir les marchés publics | AS Mayotte",
  description: "Consultez la liste complete des marches publics et filtrez par region ou type d'appel d'offre.",
};

export default function MarchesPublicsPage() {
  return <PublicTenderListExperience />;
}
