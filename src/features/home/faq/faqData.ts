import { IFAQItem } from "@/interfaces/faqItem";

export const faqItems: IFAQItem[] = [
  {
    id: "1",
    question: 'Combien de temps faut-il pour créer mon entreprise ?',
    categoryName:'Générale',
    answer:
      'Le processus complet prend généralement entre 7 et 10 jours ouvrés. Cela inclut la validation juridique de votre dossier (24-48h), le dépôt auprès des autorités compétentes (3-5 jours) et l\'obtention de votre Kbis officiel. Nous vous tenons informé à chaque étape du processus.',
  },
  {
    id: "2",
    question: 'Que se passe-t-il si mon dossier est rejeté ?',
    categoryName:'Juridique',
    answer:
      'Si votre dossier est rejeté, nous analysons les raisons du rejet avec vous et le corrigeons gratuitement. Nous résoummettons ensuite votre dossier sans frais supplémentaires jusqu\'à approbation.',
  },
  {
    id: "3",
    question: 'Est-ce que le service est vraiment 100% en ligne ?',
    categoryName:'Générale',
    answer:
      'Oui, tout peut être traité en ligne. Vous n\'avez besoin de vous déplacer nulle part. Tous les documents peuvent être signés électroniquement et les démarches sont entièrement dématérialisées pour votre confort.',
  },
  {
    id: "4",
    question: 'Quelle forme juridique choisir pour mon entreprise ?',
    categoryName:'Juridique',
    answer:
      'Le choix dépend de votre situation personnelle et professionnelle. Auto-entrepreneur, EIRL, SARL, SAS... chaque forme a ses avantages et inconvénients. Nos experts peuvent vous conseiller gratuitement sur la meilleure option pour votre projet.',
  },
  {
    id: "5",
    question: 'Mes statuts sont-ils conformes à la législation française ?',
    categoryName:'Générale',
    answer:
      'Absolument. Tous nos documents sont rédigés par des juristes expérimentés et conformes à la législation en vigueur. Ils respectent les dernières mises à jour légales et sont adaptés à votre situation spécifique.',
  }
];
