export type InfoSectionData = {
  title: string;
  imagePosition: "left" | "right";
  illustration: React.ReactNode;
  items: {
    boldContent: string;
    content: string;
    variant: "point" | "check" | "flow";
    isLast?: boolean;
  }[];
};
