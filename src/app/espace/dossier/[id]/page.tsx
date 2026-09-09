import DossierActions from "@/features/espace/dossier/detail/DossierActions";
import DossierChat from "@/features/espace/dossier/detail/DossierChat";
import DossierDetails from "@/features/espace/dossier/detail/DossierDetails";
import DossierDocuments from "@/features/espace/dossier/detail/DossierDocuments";
import DossierHeader from "@/features/espace/dossier/detail/DossierHeader";
import { DossierAttachment, DossierChatMessage, DossierDetailData, DossierGeneratedDoc } from "@/types/dossier/dossierTypes";
import { MaritalRegime, MaritalStatus } from "@/validations/wizard/wizardSchema";

const dossierData: DossierDetailData = {
	meta: {
		id: "Fusion-Acquisition TechCorp",
		clientName: "TechCorp SA",
		status: "En revue",
		openedAt: "12 Oct 2023",
	},
	urgency: "Urgente",
	wizard: {
		legalStructure: {
			id: "sarl",
			name: "SARL",
			isLegalJuridiction: false,
			hasCapitalSocial: true,
			tarrif: 0,
		},
		capital: "100",
		companyName: "Baobe",
		location: "Mayotte",
		address: "mayotte-555",
		postalCode: "12345",
		city: "Djoug",
		activityType: [{ id: "commerce", name: "Commerce" }],
		activitySector: [{ id: "restauration", name: "Restauration & Hotellerie" }],
		associates: [
			{
				name: "Yori M",
				email: "yori@techcorp.co",
				sharePercentage: 100,
				phoneNumber: "+262600000000",
				fullAddress: "12 rue principale",
				city: "Mamoudzou",
				country: "France",
				isFrenchNationality: true,
				birthCity: "Paris",
				birthPostalCode: "75000",
				birthCountry: "France",
				birthDate: "1992-01-12",
				maritalStatus: MaritalStatus.MARRIED,
				spouseFirstName: "Maya",
				spouseLastName: "Yori",
				maritalRegime: MaritalRegime.COMMUNITY_PROPERTY,
				isLeader: true,
				isSpouseAssociate: true,
				isMinor: false,
				isUnderGuardianship: false,
			},
			{
				name: "Lina Z",
				email: "lina@techcorp.co",
				sharePercentage: 0,
				phoneNumber: "+262611111111",
				fullAddress: "45 avenue centrale",
				city: "Koungou",
				country: "France",
				isFrenchNationality: true,
				birthCity: "Lyon",
				birthPostalCode: "69000",
				birthCountry: "France",
				birthDate: "1995-03-22",
				maritalStatus: MaritalStatus.SINGLE,
				spouseFirstName: "",
				spouseLastName: "",
				maritalRegime: MaritalRegime.COMMUNITY_PROPERTY,
				isLeader: false,
				isSpouseAssociate: false,
				isMinor: false,
				isUnderGuardianship: false,
			},
		],
	},
};

const attachments: DossierAttachment[] = [
	{ id: "att-1", name: "Kbis_TechCorp_2023.pdf" },
	{ id: "att-2", name: "Statuts_MAJ.pdf" },
	{ id: "att-3", name: "Statuts_MAJ.pdf" },
	{ id: "att-4", name: "Statuts_MAJ.pdf" },
	{ id: "att-5", name: "Statuts_MAJ.pdf" },
	{ id: "att-6", name: "Statuts_MAJ.pdf" },
];

const generatedDocs: DossierGeneratedDoc[] = [
	{ id: "gen-1", name: "Contrat_preliminaire_v1.pdf" },
	{ id: "gen-2", name: "Rapport_audit_final.pdf" },
];

const chatMessages: DossierChatMessage[] = [
	{
		id: "msg-1",
		author: "TechCorp",
		content: "Bonjour",
		direction: "incoming",
	},
	{
		id: "msg-2",
		author: "TechCorp",
		content: "Bonjour, nous avons mis a jour les statuts comme demande.",
		direction: "incoming",
	},
	{
		id: "msg-3",
		author: "Vous",
		content: "Parfait, je verifie cela. Il manque encore les informations sur les dirigeants.",
		direction: "outgoing",
	},
];

export default function DossierDetailPage() {
	return (
		<div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
			<div className="space-y-4">
				<DossierHeader meta={dossierData.meta} />
				<DossierDetails data={dossierData.wizard} />
				<DossierDocuments attachments={attachments} generatedDocs={generatedDocs} />
			</div>

			<div className="space-y-4">
				<DossierActions urgency={dossierData.urgency} />
				<DossierChat messages={chatMessages} />
			</div>
		</div>
	);
}
