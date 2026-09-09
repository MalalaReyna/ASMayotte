export const TOTAL_STEPS = 6;

export function normalizeStep(step?: number) {
  if (!Number.isFinite(step)) return 1;
  if ((step as number) < 1 || (step as number) > TOTAL_STEPS) return 1;
  return step as number;
}

export function getStepFromHash() {
  if (typeof window === "undefined") return 1;
  const n = Number(window.location.hash.replace("#", ""));
  return normalizeStep(n);
}

export function replaceHash(step: number) {
  const nextHash = `#${step}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`
    );
  }
}

export const stepMeta = {
  1: { title: "Structure juridique", description: "Choisissez la forme adaptée à votre projet" },
  2: { title: "Votre entreprise", description: "Informations principales de votre future entreprise." },
  3: { title: "Type d'activité", description: "Sélectionnez le type d'activité qui correspond le mieux à votre projet." },
  4: { title: "Associés", description: "Renseignez les informations des Associés de l'entreprise." },
  5: { title: "Dirigeants", description: "Sélectionnez les dirigeants parmi les associés ou ajoutez des dirigeants non associés." },
  6: { title: "Dernière vérification", description: "Vérifiez vos informations avant la finalisation." },
} as const;

export const stepInfo = {
  1: "Besoin d'aide ? Notre équipe peut vous conseiller sur la structure la plus adaptée à votre situation.",
  2: "L'adresse du siège social doit être une adresse physique valide. Elle apparaîtra sur tous vos documents officiels.",
  3: "Le choix de votre type d'activité détermine les obligations légales et fiscales applicables à votre entreprise.",
  4: "La somme des parts doit être égale à 100%. Assurez-vous que les informations sont exactes.",
  5: "Vous devez désigner au moins un dirigeant.",
  6: "Une fois votre demande soumise, notre équipe la traitera dans les 48h et vous contactera pour finaliser votre dossier.",
} as const;
