import NotificationList from "@/features/espace/notification/NotificationList";
import { NotificationItem } from "@/types/notification/notificationTypes";

const notifications: NotificationItem[] = [
	{
		id: "1",
		title: "Nouveau message de Jean Dupont",
		description: "Pouvez-vous me confirmer la date de l'audience pour la semaine prochaine ? J'ai besoin de préparer les documents.",
		timeLabel: "2 hours ago",
		kind: "message",
		group: "today",
		isRead: false,
	},
	{
		id: "2",
		title: "Dossier #REF-849 validé",
		description: "Toutes les pièces requises ont été vérifiées et approuvées par le greffe.",
		timeLabel: "5 hours ago",
		kind: "success",
		group: "today",
		isRead: true,
	},
	{
		id: "3",
		title: "Urgent: délai de réponse pour #REF-915",
		description: "Il reste moins de 48h pour soumettre les conclusions à la cour d'appel.",
		timeLabel: "8 hours ago",
		kind: "warning",
		group: "today",
		isRead: false,
	},
	{
		id: "4",
		title: "Nouvelle pièce jointe ajoutée au dossier #REF-2023",
		description: "Document \"Rapport_Expertise_Financiere_v2.pdf\" téléversé par M. Lefebvre.",
		timeLabel: "Yesterday, 14:30",
		kind: "file",
		group: "yesterday",
		isRead: true,
	},
	{
		id: "5",
		title: "Création du dossier #REF-1045",
		description: "Nouveau dossier de litige commercial initialisé dans le système.",
		timeLabel: "Oct 12",
		kind: "file",
		group: "lastWeek",
		isRead: true,
	},
];

export default function NotificationPage() {
	return (
		<div className="space-y-4">
			<NotificationList notifications={notifications} />
		</div>
	);
}
