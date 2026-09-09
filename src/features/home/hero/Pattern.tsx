
export default function Pattern({ className = "" }: { className?: string }) {
    return (
        <div
            className={`bg-surface rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 sm:p-8 ${className}`}
        >
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="h-6 bg-outline rounded-full w-1/3"></div>
                    <div className="h-6 bg-outline rounded-full w-2/3"></div>
                </div>

                <div className="flex gap-4">
                    <div className="h-6 bg-outline rounded-full w-2/3"></div>
                    <div className="h-6 bg-outline rounded-full w-1/3"></div>
                </div>

                <div className="flex gap-4">
                    <div className="h-6 bg-outline rounded-full w-3/4"></div>
                    <div className="h-6 bg-outline rounded-full w-1/4"></div>
                </div>

                <div className="flex gap-4">
                    <div className="h-6 bg-outline rounded-full w-1/2"></div>
                    <div className="h-6 bg-outline rounded-full w-1/2"></div>
                </div>

                <div className="flex gap-4">
                    <div className="h-6 bg-outline rounded-full w-5/6"></div>
                    <div className="h-6 bg-outline rounded-full w-1/6"></div>
                </div>
            </div>
        </div>
    );
}