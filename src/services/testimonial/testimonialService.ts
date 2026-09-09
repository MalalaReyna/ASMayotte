import { genericGetList } from "@/api/common";
import { Testimonial } from "@/interfaces/testimonial";
const url = process.env.NEXT_PUBLIC_API_URL + "/Testimonial";
export async function getAllTesti(){
  return genericGetList<Testimonial>(url);
}
