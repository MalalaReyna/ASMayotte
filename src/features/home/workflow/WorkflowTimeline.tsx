"use client";
import { useEffect, useRef, useState } from "react";
import { WorkflowStep } from "./WorkflowStep";
import FormIllustrationCard from "../cards/FormIllustrationCard";
import JuryIllustrationCard from "../cards/JuryIllustrationCard";
import DocumentIllustrationCard from "../cards/DocumentIllustrationCard";
import DocumentOkIllustrationCard from "../cards/DocumentOkIllustrationCard";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
  iconBadge: string;
  duration: string;
  image: React.ReactNode;
}

const steps: TimelineStep[] = [
  {
    number: 1,
    title: "Détecter des opportunités",
    description:
      "Identification des marchés correspondant à l’activité et aux capacités de l’entreprise.",
      iconBadge: "/icons/workflow/steps/step1.png",
    duration: "Veille ciblée",
    image: <FormIllustrationCard />,
  },
  {
    number: 2,
    title: "Analyse du marché",
    description:
      "Analyse du RC, du CCTP, des critères, des contraintes et de la stratégie de réponse.",
      iconBadge: "/icons/workflow/steps/step2.png",
    duration: "Analyse & stratégie",
    image: <JuryIllustrationCard />,
  },
  {
    number: 3,
    title: "Construction de l'offre",
    description:
      "Mémoire technique, DC1, DC2, acte d'engagement, BPU, DPGF, DQE et planning.",
      iconBadge: "/icons/workflow/steps/step3.png",
    duration: "Dossier complet",
    image: <DocumentIllustrationCard />,
  },
  {
    number: 4,
    title: "Vérification et dépôt",
    description:
      "Contrôle final du dossier et accompagnement jusqu’au dépôt sur la plateforme de l’acheteur.",
      iconBadge: "/icons/workflow/steps/step4.png",
    duration: "Prêt au dépôt",
    image: <DocumentOkIllustrationCard />,
  },
];

export function WorkflowTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // État pour la progression de la barre
  const [isActive, setIsActive] = useState(false); // État pour savoir si la section est visible

  // Fonction pour calculer la progression
  const handleScroll = () => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Vérifie si la section est visible
      if (top <= windowHeight && top + height >= 0) {
        setIsActive(true);

        // Calcul de la progression avec un léger retard
        const scrollProgress = Math.min(
          Math.max((windowHeight - top) / height - 0.35, 0), // Ajout d'un retard de 20%
          1
        );
        setProgress(scrollProgress);
      } else {
        setIsActive(false);
      }
    }
  };

  // Ajoute un écouteur de défilement
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative flex md:justify-center">
      {/* Barre verticale animée */}
      <div
        className="absolute md:left-1/2 md:transform md:-translate-x-1/2 md:block  top-0 w-1 z-10 bg-primary rounded-full"
        style={{
          height: `${progress * 100}%`, // Hauteur basée sur la progression
          transition: isActive ? "height 0.1s linear" : "none", // Animation fluide
        }}
      ></div>
      {/* Barre verticale */}
      <div
        className="h-full absolute md:left-1/2 md:transform md:-translate-x-1/2 md:block  top-0 w-1 z-5 bg-outline rounded-full"
      ></div>

      {/* Liste des étapes */}
      <ul className="relative z-10 space-y-12 md:space-y-16 ml-6 md:ml-0">
        {steps.map((step, index) => (
          <WorkflowStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            iconBadge={step.iconBadge}
            duration={step.duration}
            imagePosition={index % 2 === 0 ? "left" : "right"}
            image={step.image}
          />
        ))}
      </ul>
    </div>
  );
}