interface HeroProps {
    children: React.ReactNode,
    className?: string
}
export function Hero({ children, className }: HeroProps) {
    return (
        <article className={`relative overflow-hidden ${className}`}>
            <div className={`bg-[url('/images/herobg.png')] flex items-center justify-start bg-contain bg-center relative ${className}`}>
                <div className="z-10 w-full mx-auto">
                    {children}
                </div>
            </div>
        </article>
    )
}