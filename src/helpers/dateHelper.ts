export function toIsoWithZeroTime(dateStr:string) {
  // Convertit "2026-05-21" -> "2026-05-21T00:00:00.000Z"
  if(!dateStr) return "";
  return new Date(dateStr + "T00:00:00.000Z").toISOString();
}
