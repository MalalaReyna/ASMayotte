"use client";

import PublicTenderMethodStep from "./PublicTenderMethodStep";

const steps = [
  { number: 1, title: "Vous choisissez un marché" },
  { number: 2, title: "Vous demandez un devis" },
  { number: 3, title: "Nous analysons le DCE" },
  { number: 4, title: "Nous préparons le dossier" },
  { number: 5, title: "Vous déposez une offre professionnelle" },
];

export default function PublicTenderMethodSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-outline bg-surface px-3 py-1 text-xs font-semibold text-secondary">
              Methode A&S Mayotte
            </span>
            <h2 className="text-h2-mobile md:text-h2 font-semibold text-dark sm:text-4xl">
              De l'opportunité au dépot conforme
            </h2>
            <p className="max-w-lg text-secondary">
              Une experience pensee pour transformer une veille marche public en demande
              de devis claire et exploitable.
            </p>
          </div>
          <div className="space-y-3">
            {steps.map((step) => (
              <PublicTenderMethodStep key={step.number} number={step.number} title={step.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
