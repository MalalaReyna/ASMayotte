import { genericGetList } from "@/api/common";
import { IFAQItem } from "@/interfaces/faqItem";
const url = process.env.NEXT_PUBLIC_API_URL + "/Faq";
export async function getAllHomeFAQItems() {
  return genericGetList<IFAQItem>(url, { search: "Accueil" });
}
