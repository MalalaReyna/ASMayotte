import { serviceHandlers } from "./handlers/serviceHandler";
import { faqHandlers } from "./handlers/faqHandler";
import { testimonialHandlers } from "./handlers/testimonialHandler";
import { expertHandlers } from "./handlers/expertHandler";
import { authHandlers } from "./handlers/authHandler";
import { sectorHandlers } from "./handlers/sectorHandler";
import { wizardHandlers } from "./handlers/wizardHandler";
import { contactUsHandlers } from "./handlers/contactUsHandler";
import { marketHandlers } from "./handlers/marketHandler";
import { regionHandlers } from "./handlers/regionHandler";
import { devisHandlers } from "./handlers/devisHandler";
import { adminFileHandlers } from "./handlers/adminFileHandler";

export const handlers = [
  ...serviceHandlers,
  ...faqHandlers,
  ...testimonialHandlers,
  ...expertHandlers,
  ...authHandlers,
  ...sectorHandlers,
  ...wizardHandlers,
  ...contactUsHandlers,
  ...marketHandlers,
  ...regionHandlers,
  ...devisHandlers,
  ...adminFileHandlers
];