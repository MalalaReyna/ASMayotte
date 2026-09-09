import DossierList from "@/features/espace/dossier/DossierList";
import { DossierItem } from "@/types/dossier/dossierTypes";


const dossierItems: DossierItem[] = [
    {
        id: "1",
        title: "Fusion-Acquisition TechCorp",
        reference: "REF-2023-0891",
        client: "TechCorp SA",
        category: "M&A",
        status: "Valide",
        territory: "Paris",
        urgency: "basse",
        createdAt: "12 Oct 2023",
    },
    {
        id: "2",
        title: "Litige Propriété Intellectuelle",
        reference: "REF-2023-0902",
        client: "Innovate Media",
        category: "Contentieux",
        status: "En attente client",
        territory: "Lyon",
        urgency: "moyenne",
        createdAt: "15 Oct 2023",
    },
    {
        id: "3",
        title: "Contentieux Social - Prud'hommes",
        reference: "REF-2023-0915",
        client: "Global Logistics",
        category: "Droit social",
        status: "Urgent",
        territory: "Bordeaux",
        urgency: "haute",
        createdAt: "18 Oct 2023",
    },
    {
        id: "4",
        title: "Révision Contrat Distribution",
        reference: "REF-2023-0922",
        client: "EcoSolutions",
        category: "Contrat",
        status: "En cours / Nouveau",
        territory: "Paris",
        urgency: "basse",
        createdAt: "20 Oct 2023",
    },
    {
        id: "5",
        title: "Bail Commercial Centre-Ville",
        reference: "REF-2023-0870",
        client: "Retail Partners",
        category: "Immobilier",
        status: "Valide",
        territory: "Lyon",
        urgency: "basse",
        createdAt: "05 Oct 2023",
    },
];

export default function DossierPage() {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold">Liste des dossiers</h2>
                <p className="text-[#6F6A64]">
                    Gérez et suivez l&apos;évolution de vos dossiers juridiques en cours.{/*  <strong>{dossierItems.length} actifs.</strong> */}
                </p>
            </div>

            <DossierList dossiers={dossierItems} />
        </div>
    );
}