import ThinkingIllu from "@/components/illustrations/thinking-illu";
import AdvantageIllu from "@/components/illustrations/advantage-illu";
import HowIllu from "@/components/illustrations/how-illu";

const dataEntreprise = {
  "entreprise-individuelle": {
    metaTitle: "Création d'Entreprise Individuelle à Mayotte | AS Mayotte",
    metaDescription: "Démarrage d'activité rapide avec l'Entreprise Individuelle (EI) à Mayotte. A&S Mayotte vous accompagne de A à Z. Simplifiez la création de votre entreprise avec notre expertise locale.",
    title: "Création d'Entreprise Individuelle (EI) à Mayotte",
    description: "L'Entreprise Individuelle (EI) est idéale pour démarrer rapidement une activité en votre nom, avec une gestion simple et une comptabilité adaptée à votre projet. A&S Mayotte vous accompagne de A à Z : choix du régime, formalités sur le Guichet Unique (INPI), déclaration d'activité, options fiscales/sociales et mise en conformité.",
    cta: "Créer mon EI",
    ctaLink: "/wizard?type=EI",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Indépendants / artisans / commerçants: souhaitant lancer une activité en nom propre",
      "Prestataires de services: conseil, BTP, transport, nettoyage, etc.",
      "Entrepreneurs: voulant une structure simple sans associés",
      "Créateurs: qui hésitent entre EI et micro-entreprise (comparaison incluse)",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Démarrage rapide: formalités simplifiées, création accélérée",
      "Démarrage rapide: formalités simplifiées, création accélérée",
      "Structure légère: gestion claire, obligations adaptées",
      "Choix des options: régime fiscal/social ajusté à votre situation",
      "Accompagnement conformité: activité déclarée, dossier complet, suivi",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Diagnostic & configuration: activité, régime, options, adresse, justificatifs",
      "Constitution du dossier: pièces + formulaires + vérifications",
      "Dépôt INPI (Guichet Unique): déclaration officielle et suivi",
      "Finalisation: réception des éléments (n° SIREN/SIRET) + conseils de démarrage",
    ],
    faqItems: [
      {
        id: "1",
        question: "Combien de temps pour créer une EI ?",
        answer: "En général, quelques jours selon la complétude du dossier et les délais de traitement.",
        categoryName: "EI",
      },
      {
        id: "2",
        question: "Quels documents faut-il fournir ?",
        answer:
          "Pièce d’identité, justificatif de domicile, informations d’activité (nature, adresse, date de début), et éléments spécifiques selon le métier.",
        categoryName: "EI",
      },
      {
        id: "3",
        question: "EI ou micro-entreprise : lequel choisir ?",
        answer:
          "Cela dépend de votre chiffre d’affaires estimé, de vos charges, et de votre besoin de déduction/organisation. On vous oriente avec une recommandation claire.",
        categoryName: "EI",
      },
      {
        id: "4",
        question: "Dois-je ouvrir un compte bancaire ?",
        answer:
          "Selon votre situation et vos flux, c’est fortement recommandé. On vous guide sur la mise en place.",
        categoryName: "EI",
      },
      {
        id: "5",
        question: "Puis-je modifier mon activité plus tard ?",
        answer:
          "Oui. Des modifications sont possibles (adresse, activité, options). Nous pouvons gérer les formalités.",
        categoryName: "EI",
      },
      {
        id: "6",
        question: "A&S Mayotte s’occupe-t-il de tout ?",
        answer: "Oui : vérification, dépôt, suivi, relances si nécessaire et conseils.",
        categoryName: "EI",
      },
    ],
  },
  "micro-entreprise": {
    metaTitle: "Création de Micro-entreprise à Mayotte | AS Mayotte",
    metaDescription:
      "Lancement rapide de micro-entreprise à Mayotte et en toute sécurité. A&S Mayotte vous accompagne sur toute la démarche et conseils pratiques pour démarrer sans erreur.",
    title: "Création de Micro-entreprise (Auto-entrepreneur) à Mayotte",
    description:
      "La micro-entreprise est la solution la plus simple pour se lancer : formalités rapides, cotisations proportionnelles au chiffre d’affaires et gestion allégée. A&S Mayotte sécurise votre création : choix de l’activité, options, déclarations INPI et conseils pour démarrer sans erreur.",
    cta: "Créer ma micro-entreprise",
    ctaLink: "/wizard?type=Micro-Entreprise",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Débutants: souhaitant lancer une activité rapidement",
      "Activités de services: prestations, conseil, nettoyage, etc.",
      "Profils variés : petite vente / e-commerce / commerce",
      "Complément de revenus: activité secondaire",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Création rapide: démarches simplifiées",
      "Charges proportionnelles au CA: meilleure lisibilité",
      "Gestion accessible: obligations réduites",
      "Accompagnement stratégique: options, conformité, erreurs évitées",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Analyse de l’activité: catégorie, code APE, date de début",
      "Paramétrage: options utiles selon projet et territoire",
      "Dépôt INPI (Guichet Unique): création officielle + suivi",
      "Après-création: conseils facturation, documents, organisation",
    ],
    faqItems: [
      {
        id: "1",
        question: "Combien de temps pour obtenir mon SIRET ?",
        answer:
          "Après dépôt complet, les délais varient selon le traitement administratif.",
        categoryName: "Micro",
      },
      {
        id: "2",
        question: "Quels documents dois-je fournir ?",
        answer:
          "Identité, justificatif, informations sur l’activité (adresse, date de début, nature).",
        categoryName: "Micro",
      },
      {
        id: "3",
        question: "Y a-t-il un plafond de chiffre d’affaires ?",
        answer:
          "Oui, la micro-entreprise est encadrée par des seuils. Nous vous expliquons ceux applicables à votre activité.",
        categoryName: "Micro",
      },
      {
        id: "4",
        question: "Puis-je facturer des entreprises et collectivités ?",
        answer:
          "Oui, y compris marchés. Nous vous conseillons selon votre activité et vos objectifs.",
        categoryName: "Micro",
      },
      {
        id: "5",
        question: "Et si je dépasse les seuils ?",
        answer:
          "Vous pouvez changer de régime ou de forme juridique (EI, SARL, SAS…). Nous vous accompagnons.",
        categoryName: "Micro",
      },
      {
        id: "6",
        question: "Puis-je embaucher en micro-entreprise ?",
        answer:
          "C’est possible mais parfois moins optimal. Nous vous conseillons selon votre projet.",
        categoryName: "Micro",
      },
    ],
  },

  "sarl": {
    metaTitle: "Création de SARL à Mayotte | Cabinet A&S Mayotte",
    metaDescription:
      "Création de SARL à Mayotte avec A&S Mayotte : statuts sur mesure, annonce légale, dépôt INPI et accompagnement complet jusqu’au KBIS.",
    title: "Création de SARL à Mayotte",
    description:
      "La SARL est une forme solide et rassurante, idéale pour entreprendre à plusieurs. A&S Mayotte rédige vos statuts sur mesure, prépare le dossier et gère toutes les formalités jusqu’à l’immatriculation.",
    cta: "Créer ma SARL",
    ctaLink: "/wizard?type=SARL",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Entrepreneurs seuls: EURL",
      "Associés: création de SARL",
      "Activités : projets avec investissements, matériel, charges importantes",
      "Dirigeants : souhaitant un cadre juridique structuré",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Cadre juridique structuré: règles claires entre associés",
      "Crédibilité: clients, banques, partenaires",
      "Statuts sur mesure: répartition des parts, pouvoirs, clauses",
      "Accompagnement complet: annonce légale, dépôt, suivi",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Préparation: associés, capital, siège, activité",
      "Rédaction : statuts actes (gérance, décisions)",
      "Annonce : légale + dépôt INPI",
      "Immatriculation: réception KBIS + conseils",
    ],
    faqItems: [
      {
        id: "1",
        question: "Quel capital pour une SARL ?",
        answer:
          "Aucun minimum imposé, mais un capital cohérent est recommandé selon l’activité.",
        categoryName: "SARL",
      },
      {
        id: "2",
        question: "EURL ou SARL : quelle différence ?",
        answer:
          "EURL = 1 associé. SARL = plusieurs associés. Le fonctionnement s’adapte.",
        categoryName: "SARL",
      },
      {
        id: "3",
        question: "Peut-on domicilier la société chez soi ?",
        answer:
          "Oui sous conditions. Nous vérifions votre situation.",
        categoryName: "SARL",
      },
      {
        id: "4",
        question: "Gérez-vous l’annonce légale ?",
        answer:
          "Oui, nous prenons en charge la publication et l’intégration au dossier.",
        categoryName: "SARL",
      },
      {
        id: "5",
        question: "Peut-on ajouter un associé plus tard ?",
        answer:
          "Oui via cession ou augmentation de capital. Nous gérons les actes.",
        categoryName: "SARL",
      },
    ],
  },

  "eurl": {
    metaTitle: "Création de EURL à Mayotte | Cabinet A&S Mayotte",
    metaDescription:
      "Création de EURL à Mayotte avec A&S Mayotte : statuts sur mesure, annonce légale, dépôt INPI et accompagnement complet jusqu’au KBIS.",
    title: "Création de EURL à Mayotte",
    description:
      "L'EURL est une forme solide et rassurante, idéale pour entreprendre seul. A&S Mayotte rédige vos statuts sur mesure, prépare le dossier et gère toutes les formalités jusqu’à l’immatriculation.",
    cta: "Créer mon EURL",
    ctaLink: "/wizard?type=EURL",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Entrepreneurs seuls: EURL",
      "Associés: création de SARL",
      "Activités : projets avec investissements, matériel, charges importantes",
      "Dirigeants : souhaitant un cadre juridique structuré",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Cadre juridique structuré: règles claires entre associés",
      "Crédibilité: clients, banques, partenaires",
      "Statuts sur mesure: répartition des parts, pouvoirs, clauses",
      "Accompagnement complet: annonce légale, dépôt, suivi",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Préparation: associés, capital, siège, activité",
      "Rédaction : statuts actes (gérance, décisions)",
      "Annonce : légale + dépôt INPI",
      "Immatriculation: réception KBIS + conseils",
    ],
    faqItems: [
      {
        id: "1",
        question: "Quel capital pour une EURL ?",
        answer:
          "Aucun minimum imposé, mais un capital cohérent est recommandé selon l’activité.",
        categoryName: "EURL",
      },
      {
        id: "2",
        question: "EURL ou SARL : quelle différence ?",
        answer:
          "EURL = 1 associé. SARL = plusieurs associés. Le fonctionnement s’adapte.",
        categoryName: "EURL",
      },
      {
        id: "3",
        question: "Peut-on domicilier la société chez soi ?",
        answer:
          "Oui sous conditions. Nous vérifions votre situation.",
        categoryName: "EURL",
      },
      {
        id: "4",
        question: "Gérez-vous l’annonce légale ?",
        answer:
          "Oui, nous prenons en charge la publication et l’intégration au dossier.",
        categoryName: "EURL",
      },
      {
        id: "5",
        question: "Peut-on ajouter un associé plus tard ?",
        answer:
          "Oui via cession ou augmentation de capital. Nous gérons les actes.",
        categoryName: "EURL",
      },
    ],
  },

  "sas": {
    metaTitle: "Création de SAS à Mayotte | Cabinet A&S Mayotte",
    metaDescription:
      "Création rapide et sécurisé de SAS à Mayotte avec A&S Mayotte : statuts personnalisés, annonce légale, dépôt INPI et accompagnement complet jusqu’au KBIS.",
    title: "Création de SAS à Mayotte",
    description:
      "La SAS est une forme moderne, flexible et évolutive, parfaite pour structurer un projet ambitieux et organiser une gouvernance sur mesure.",
    cta: "Créer ma SAS",
    ctaLink: "/wizard?type=SAS",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Projets à plusieurs associés : structuration claire dès le départ",
      "Entrée d’investisseurs : cadre sécurisé et adaptable",
      "Entreprises en croissance : organisation prête à évoluer",
      "Structures préparant une holding : anticipation stratégique",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Flexibilité maximale : organisation et gouvernance sur mesure",
      "Évolutive : entrée et sortie d’associés simplifiées",
      "Image professionnelle : crédibilité renforcée auprès des partenaires",
      "Statuts sécurisés : rédaction personnalisée et conforme",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Cadrage du projet : associés, capital, organisation et clauses clés",
      "Rédaction des statuts : nomination du président et actes nécessaires",
      "Formalités juridiques : annonce légale et dépôt INPI",
      "Immatriculation : obtention du KBIS et conseils opérationnels",
    ],
    faqItems: [
      {
        id: "1",
        question: "SAS ou SARL : que choisir ?",
        answer:
          "La SAS est plus flexible, la SARL plus encadrée. Nous vous orientons selon vos objectifs.",
        categoryName: "SAS",
      },
      {
        id: "2",
        question: "Faut-il un président ?",
        answer:
          "Oui, la SAS doit obligatoirement avoir un président.",
        categoryName: "SAS",
      },
      {
        id: "3",
        question: "Peut-on prévoir des clauses de protection ?",
        answer:
          "Oui (agrément, préemption, etc.), adaptées à votre situation.",
        categoryName: "SAS",
      },
    ],
  },
  "sasu": {
    metaTitle: "Création de SASU Mayotte (SAS associé unique) | AS Mayotte",
    metaDescription:
      "Création rapide et sécurisée de SASU à Mayotte avec A&S Mayotte : statuts sur mesure, annonce légale, dépôt INPI et accompagnement complet jusqu’au KBIS. Structure idéale pour entreprendre seul.",
    title: "Création de SASU à Mayotte (SAS à associé unique)",
    description:
      "La SASU est idéale pour entreprendre seul tout en conservant une structure évolutive. Vous démarrez seul et pouvez accueillir des associés plus tard. A&S Mayotte vous accompagne sur la rédaction des statuts, la création et la mise en conformité.",
    cta: "Créer ma SASU",
    ctaLink: "/wizard?type=SASU",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Entrepreneurs seuls : consulting, services, BTP, commerce ou transport",
      "Créateurs souhaitant une structure évolutive : possibilité d’accueillir des associés plus tard",
      "Dirigeants recherchant plus de flexibilité qu’une EURL : organisation adaptable",
      "Projets avec perspective de croissance : anticipation d’une future holding",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Création en solo : structure solide et professionnelle",
      "Évolutive : transformation en SAS multi-associés simplifiée",
      "Statuts sur mesure : clauses adaptées et protection optimisée",
      "Accompagnement complet : dossier, formalités et suivi sécurisé",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Cadrage du projet : activité, capital, siège et options",
      "Rédaction des statuts : nomination du président et actes initiaux",
      "Formalités juridiques : annonce légale et dépôt INPI",
      "Immatriculation : obtention du KBIS et conseils opérationnels",
    ],
    faqItems: [
      {
        id: "1",
        question: "SASU ou EURL : que choisir ?",
        answer:
          "Le choix dépend de votre projet, de votre besoin d’évolution et de votre organisation. Nous vous orientons clairement.",
        categoryName: "SASU",
      },
      {
        id: "2",
        question: "Puis-je me verser une rémunération ?",
        answer:
          "Oui. Nous vous expliquons les options possibles selon votre situation.",
        categoryName: "SASU",
      },
      {
        id: "3",
        question: "Puis-je transformer la SASU en SAS ?",
        answer:
          "Oui, en faisant entrer un associé. Nous adaptons les statuts et formalités.",
        categoryName: "SASU",
      },
      {
        id: "4",
        question: "Le siège peut-il être chez moi ?",
        answer:
          "Souvent oui, sous conditions. Nous vérifions votre situation.",
        categoryName: "SASU",
      },
      {
        id: "5",
        question: "Puis-je répondre à des marchés publics ?",
        answer:
          "Oui, c’est possible. Nous pouvons aussi vous accompagner sur votre dossier.",
        categoryName: "SASU",
      },
    ],
  },
  "holding": {
    metaTitle: "Création de Holding à Mayotte (SAS/SARL Holding) | AS Mayotte",
    metaDescription:
      "Structuration de votre groupe avec une holding à Mayotte. A&S Mayotte vous accompagne durant toute la démarche : stratégie, rédaction et création complète.",
    title: "Création de Holding à Mayotte (SAS Holding / SARL Holding)",
    description:
      "La holding permet de structurer un groupe, organiser plusieurs sociétés et piloter vos investissements. A&S Mayotte vous accompagne sur la stratégie, la rédaction des statuts et la création complète.",
    cta: "Créer ma holding",
    ctaLink: "/wizard?type=Holding",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Entrepreneurs avec plusieurs sociétés : structuration et vision globale",
      "Dirigeants souhaitant centraliser la gestion : pilotage stratégique simplifié",
      "Projets de croissance : rachat, création de filiales ou développement structuré",
      "Stratégies long terme : organisation patrimoniale et expansion maîtrisée",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Structure de groupe : organisation claire entre sociétés",
      "Pilotage centralisé : décisions stratégiques et investissements coordonnés",
      "Optimisation possible : mécanismes adaptés selon votre situation",
      "Préparation de l’avenir : transmission et développement sécurisés",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Audit stratégique : objectifs, sociétés existantes et schéma cible",
      "Choix du format : SAS Holding ou SARL Holding selon votre organisation",
      "Rédaction juridique : statuts personnalisés et annonce légale",
      "Création officielle : dépôt INPI, immatriculation et plan d’action",
    ],
    faqItems: [
      {
        id: "1",
        question: "Qu’est-ce qu’une holding ?",
        answer:
          "Une société mère qui détient des parts d’autres sociétés et organise la stratégie du groupe.",
        categoryName: "Holding",
      },
      {
        id: "2",
        question: "SAS ou SARL holding ?",
        answer:
          "Le choix dépend de votre organisation, associés et objectifs. Nous vous conseillons.",
        categoryName: "Holding",
      },
      {
        id: "3",
        question: "Est-ce que cela réduit automatiquement les impôts ?",
        answer:
          "Non automatiquement. Certains mécanismes existent selon conditions. Nous vous expliquons clairement.",
        categoryName: "Holding",
      },
      {
        id: "4",
        question: "Faut-il déjà avoir une société ?",
        answer:
          "Non. On peut créer la holding avant ou après selon la stratégie.",
        categoryName: "Holding",
      },
      {
        id: "5",
        question: "Gérez-vous les apports ou cessions ?",
        answer:
          "Oui, nous pouvons gérer les actes et formalités selon votre opération.",
        categoryName: "Holding",
      },
    ],
  },
  "sci": {
    metaTitle: "Création de SCI à Mayotte | Cabinet A&S Mayotte",
    metaDescription:
      "Création simple et rapide de SCI à Mayotte avec A&S Mayotte : statuts personnalisés, dépôt INPI, immatriculation et conseils pour structurer votre investissement immobilier.",
    title: "Création de SCI à Mayotte (Gestion & investissement immobilier)",
    description:
      "La SCI est une solution efficace pour acheter, détenir et gérer un bien immobilier à plusieurs, organiser la répartition et préparer la transmission. A&S Mayotte rédige vos statuts sur mesure et gère les formalités.",
    cta: "Créer ma SCI",
    ctaLink: "/wizard?type=SCI",
    illustrationTargetAudience: <ThinkingIllu />,
    targetAudience: [
      "Familles ou associés : achat et gestion d’un bien immobilier en commun",
      "Entrepreneurs : structuration d’un patrimoine immobilier professionnel",
      "Projets de location : investissement et gestion optimisée",
      "Transmission patrimoniale : organisation et répartition anticipées",
    ],
    illustrationAdvantages: <AdvantageIllu />,
    advantages: [
      "Organisation claire : répartition des parts et règles de décision définies",
      "Alternative à l’indivision : prévention des blocages entre associés",
      "Transmission facilitée : stratégie patrimoniale encadrée",
      "Statuts personnalisés : clauses adaptées à votre projet immobilier",
    ],
    illustrationHowItWorks: <HowIllu />,
    howItWorks: [
      "Cadrage du projet : associés, apports, capital et objet immobilier",
      "Rédaction des statuts : nomination du gérant et organisation interne",
      "Formalités juridiques : dépôt INPI et suivi de l’immatriculation",
      "Création effective : obtention du KBIS et conseils de gestion",
    ],
    faqItems: [
      {
        id: "1",
        question: "SCI : IR ou IS ?",
        answer:
          "Les deux régimes existent. Le choix dépend de votre objectif patrimonial. Nous vous orientons.",
        categoryName: "SCI",
      },
      {
        id: "2",
        question: "Combien d’associés minimum ?",
        answer:
          "Une SCI nécessite au minimum deux associés.",
        categoryName: "SCI",
      },
      {
        id: "3",
        question: "Peut-on créer une SCI pour sa résidence principale ?",
        answer:
          "Oui, sous réserve de bien cadrer les objectifs et règles.",
        categoryName: "SCI",
      },
      {
        id: "4",
        question: "Quel capital pour une SCI ?",
        answer:
          "Aucun minimum imposé, mais un capital cohérent est recommandé.",
        categoryName: "SCI",
      },
      {
        id: "5",
        question: "Gérez-vous les modifications ultérieures ?",
        answer:
          "Oui : changement gérant, siège, cession de parts, etc.",
        categoryName: "SCI",
      },
    ],
  },
};

export default dataEntreprise;