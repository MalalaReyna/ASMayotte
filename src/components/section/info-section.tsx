interface InfoSectionProps {
    title: string;
    imagePosition: "left" | "right";
    illustration: React.ReactNode;
    children: React.ReactNode;
}

export default function InfoSection({ title, imagePosition, children, illustration }: InfoSectionProps) {
    return (
        <section className="py-12 px-6 lg:px-8 max-w-6xl mx-auto flex justify-between gap-15 items-center">
            {imagePosition === "left" && (
                <div className="hidden md:block w-full md:w-auto h-auto">
                    {illustration}
                </div>
            )}
            <div className="">
                <h2 className="text-h2-mobile md:text-h2 font-bold mb-6">{title}</h2>
                <div className="text-h5-mobile md:text-h5">{children}</div>
            </div>
            {imagePosition === "right" && (
                <div className="hidden md:block w-full md:w-auto h-auto">
                    {illustration}
                </div>
            )}
        </section>
    )
}