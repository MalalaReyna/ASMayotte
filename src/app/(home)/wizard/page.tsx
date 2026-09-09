import WizardForm from "@/features/home/wizard/WizardForm";
import { getAllActivitySectors } from "@/services/sector/sectorService";
import { getAllServices } from "@/services/serviceClass/serviceClassService";
import { Suspense } from "react";

export const revalidate = 120; // Revalider les données toutes les 120 secondes


export async function generateMetadata() {
    return {
        title: "Formulaire de création entreprise et association à Mayotte | AS Mayotte",
        description: "Création facile d'entreprises et d'associations à Mayotte avec A&S Mayotte. SARL, SARLU, SAS, SASU, micro-entreprise, A&S Mayotte simplifie les démarches."
    };
}
export default async function WizardPage() {
    const legalJuridictionsResponse = await getAllServices(true);
    const legalJuridictions = legalJuridictionsResponse?.legalJuridicationList || [];
    const activitySectorsResponse = await getAllActivitySectors()
    const activitySectors = activitySectorsResponse?.data || [];
    return (
        <div className="relative min-h-screen flex justify-center">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/images/herobg.png')] bg-cover bg-center"></div>

            {/* Fade to white overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>

            {/* Content */}
            <div className="mt-30 relative z-10 flex flex-col gap-y-10 px-5 md:flex-row">
                <Suspense fallback={<div>Chargement...</div>}>
                    <WizardForm legalJuridictions={legalJuridictions} activitySectors={activitySectors} />
                </Suspense>
            </div>
        </div>
    )
}