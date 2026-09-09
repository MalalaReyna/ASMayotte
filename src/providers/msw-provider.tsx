"use client";

import { useEffect, useState } from "react";

export default function MSWProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMockReady, setMockReady] = useState(false);

    const isMockingEnabled = process.env.NODE_ENV === "development";

    useEffect(() => {
        const f = async () => {
            if (isMockingEnabled) {
                try {
                    const { worker } = await import("@/mocks/browser");
                    await worker.start({
                        onUnhandledRequest: "bypass",
                    });
                    setMockReady(true);
                } catch (error) {
                    console.error("Failed to start MSW worker:", error);
                    setMockReady(false);
                }
            }
        };
        f();
    }, []);

    if (isMockingEnabled && !isMockReady) {
        return null;
    }
    return <>{children}</>;
}