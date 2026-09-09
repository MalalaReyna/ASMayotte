import AdvantageIllu from "@/components/illustrations/advantage-illu";
import HowIllu from "@/components/illustrations/how-illu";
import ThinkingIllu from "@/components/illustrations/thinking-illu";
import { ServiceClass } from "@/interfaces/service/service";
import { InfoSectionData } from "@/types/sectionType";

export function buildSectionsFromService(service?: ServiceClass): InfoSectionData[] {
  if (!service?.infoServiceData) return [];

  const audienceItems = (service.infoServiceData.AUDIENCE_TARGET || []).map((item) => ({
    boldContent: item.title,
    content: ` : ${item.description}`,
    variant: "point" as const,
  }));

  const advantagesItems = (service.infoServiceData.ADVANTAGES || []).map((item) => ({
    boldContent: item.title,
    content: ` : ${item.description}`,
    variant: "check" as const,
  }));

  const processItems = (service.infoServiceData.STEP_PROCESS || []).map((item, index, arr) => ({
    boldContent: item.title,
    content: ` : ${item.description}`,
    variant: "flow" as const,
    isLast: index === arr.length - 1,
  }));

  return [
    {
      title: "À qui s'adresse ce service ?",
      imagePosition: "left",
      illustration: <ThinkingIllu />,
      items: audienceItems,
    },
    {
      title: "Les Avantages",
      imagePosition: "right",
      illustration: <AdvantageIllu />,
      items: advantagesItems,
    },
    {
      title: "Comment ça marche ?",
      imagePosition: "left",
      illustration: <HowIllu />,
      items: processItems,
    },
  ];
}
