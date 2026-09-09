export default function WizardCard({ title, description, children }: { title: string; description: string, children: React.ReactNode }) {
    return (

        <div className="flex flex-col gap-5 bg-white border border-2 h-fit border-outline max-w-[50rem] p-6 rounded-4xl">
            <div className="text-center px-3">
                <h2 className="font-medium text-h4-mobile md:text-h4">{title}</h2>
                <p className="text-secondary">{description}</p>
            </div>
            {children}
        </div>
    )
}