import { GetMarketResponse } from "@/types/market/marketType";

export const formatMarketDate = (value?: string) => {
  if (!value) return "Date inconnue";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  const formatted = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted.replace(
    /\b\w/,
    (char) => char.toUpperCase()
  );
};

export const formatMarketPrice = (market: GetMarketResponse) => {
  if (market.displayPrice) return market.displayPrice;
  if (typeof market.price === "number" && !Number.isNaN(market.price)) {
    return `${market.price} EUR`;
  }
  return "Montant non renseigne";
};

export const formatMarketDuration = (value?: number) => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return `${value} mois`;
  }
  return "Durée non renseignée";
};

export const extracttagss = (market: GetMarketResponse) => {
  const raw = [market.tags, market.typeMarket].filter(Boolean) as string[];
  const tags = raw.flatMap((tag) =>
    tag
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );

  return Array.from(new Set(tags));
};
