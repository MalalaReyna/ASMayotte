import { TarifCard } from "./tarif_card/TarifCard";
import { cards } from "./tarifData";

export function TarifCardList() {
    return (
        <ul className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-6">
            {cards.map((card, index) => (
                <li key={index}>
                    <TarifCard
                        badge={card.badge}
                        price={card.price}
                        currency={card.currency}
                        description={card.description}
                        isPopular={card.isPopular}
                        subtitle={card.subtitle}
                        buttonLabel={card.buttonLabel}
                        features={card.features}
                    />
                </li>
            ))}

        </ul>
    );
}