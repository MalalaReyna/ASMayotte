"use client"

import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "sonner"

export function AuthGuard() {
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            toast.error("Votre session a expiré. Veuillez vous reconnecter.")
            signOut({ callbackUrl: "/login" })
        }
    }, [session])

    return null
}