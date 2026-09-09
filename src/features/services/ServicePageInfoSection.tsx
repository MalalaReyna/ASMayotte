import InfoSection from "@/components/section/info-section";
import CustomLi from "@/components/li/custom-li";
import { InfoSectionData } from "@/types/sectionType";

export default function ServicePageInfoSection({
    sections,
}: {
    sections: InfoSectionData[];
}) {
    return (
        <article className="py-10">
            {sections.map((section, index) => (
                <InfoSection
                    key={index}
                    title={section.title}
                    imagePosition={section.imagePosition}
                    illustration={section.illustration}
                >
                    <ul className="list-none">
                        {section.items.map((item, i) => (
                            <CustomLi
                                key={i}
                                variant={item.variant}
                                isLast={item.isLast}
                            >
                                <span className="font-bold">{item.boldContent}</span>{item.content}
                            </CustomLi>
                        ))}
                    </ul>
                </InfoSection>
            ))}
        </article>
    );
}