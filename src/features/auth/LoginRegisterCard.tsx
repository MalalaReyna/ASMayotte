interface LoginRegisterCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?:string;
}

export default function LoginRegisterCard({ className,title, description, children }: LoginRegisterCardProps) {
    return (
        <div className={`${className} w-full max-w-md rounded-3xl border border-[#E6D8CC] bg-white p-6 md:p-8 shadow-sm`}>
            <h1 className="text-3xl font-bold text-[#7A430D]">{title}</h1>
            <p className="mt-2 text-sm text-[#8C7A6B]">{description}</p>
            {children}
        </div>
    )
}