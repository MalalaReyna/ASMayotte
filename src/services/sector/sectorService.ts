import { genericGetList } from "@/api/common";
import { IActivitySector } from "@/interfaces/activity/activity";
const url = process.env.NEXT_PUBLIC_API_URL + "/SectorActivity";
export async function getAllActivitySectors(){
  return genericGetList<IActivitySector>(url,{limit:10000000});
}
