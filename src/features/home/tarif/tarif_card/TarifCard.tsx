import { Card } from "@/components/ui/card";
import { FeatureList } from "./FeatureList";
import { TarifCardButton } from "./TarifCardButton";
import { TarifCardHeader } from "./TarifCardHeader";

export interface TarifCardProps {
    badge: string;
    price: number;
    currency?: string;
    description: string;
    subtitle?: string;
    buttonLabel: string;
    isPopular?: boolean;
    onButtonClick?: () => void;
    features: Array<{
        label: string;
        included?: boolean;
    }>;
}

export function TarifCard({
    badge,
    price,
    currency,
    description,
    subtitle,
    buttonLabel,
    isPopular,
    onButtonClick,
    features,
}: TarifCardProps) {
    return (
        <section className="bg-white rounded-[2.5rem] h-full overflow-hidden">
            <Card className="p-4 border-secondary/10 rounded-[2.5rem] min-h-[23.75rem] transition-colors flex flex-col justify-between">
                <div>
                    <TarifCardHeader
                        badge={badge}
                        price={price}
                        currency={currency}
                        isPopular={isPopular}
                        description={description}
                        subtitle={subtitle}
                    />
                </div>
                <TarifCardButton label={buttonLabel} onClick={onButtonClick} />
            </Card>
            <div className="p-6">
                <FeatureList features={features} />
            </div>
        </section>
    );
}
