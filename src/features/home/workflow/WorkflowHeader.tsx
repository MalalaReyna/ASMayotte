import { Zap } from "lucide-react";

export function WorkflowHeader() {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="font-medium text-secondary flex gap-2 items-center">
          <Zap className="size-4 text-secondary" />
          Processus simplifié
        </span>
      </div>
      <h2 className="text-h2-mobile md:text-h2 font-bold text-foreground mb-4">
        De votre DCE au depot, un accompagnement complet.
      </h2>
      <p className="text-h5 text-secondary max-w-4xl mx-auto">
        Une methode claire pour construire une reponse conforme, convaincante et prete a etre deposee.
      </p>
    </div>
  );
}
