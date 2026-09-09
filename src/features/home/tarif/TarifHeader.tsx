import { Euro } from "lucide-react";

export default function TarifHeader() {
    return (
        <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-medium text-secondary flex gap-2 items-center">
                    <Euro className="size-4 text-secondary" />
                    Tarifs transparents
                </span>
            </div>
            <h2 className="text-h2-mobile md:text-h2 font-bold text-foreground mb-4 px-2 text-balance">
                Choisissez votre formule
            </h2>
            <p className="text-h5 text-secondary max-w-2xl mx-auto text-balance">
                Des prix clairs et sans surprise. Tous nos forfaits incluent la validation juridique
                professionnelle.
            </p>
        </div>
    );
}