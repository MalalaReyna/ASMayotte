import { genericGetList } from "@/api/common";
import { IExpert } from "@/interfaces/expert";
const url = process.env.NEXT_PUBLIC_API_URL + "/TeamMember";
export async function getAllExperts(){
  return genericGetList<IExpert>(url);
}
