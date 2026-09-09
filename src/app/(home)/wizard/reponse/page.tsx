"use client"
import SuccessRequestModal from "@/components/modals/SuccessRequestModal";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { verifyPaymentSession } from "@/services/wizard/wizardService";

export default function WizardReponse() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(true);
    const sessionId = searchParams.get("session_id");

    const { data, isLoading, isError, isFetched } = useQuery({
        queryKey: ["verify-session", sessionId],
        queryFn: () => verifyPaymentSession(String(sessionId)),
        enabled: Boolean(sessionId),
        retry: false,
    });

    useEffect(() => {
        if (!sessionId) return;

        if (data) {
            setIsSuccess(Boolean(data.paid));
        } else if (isError) {
            setIsSuccess(false);
        }
    }, [sessionId, data, isError]);

    useEffect(() => {
        if (!sessionId || !isFetched) return;

        const url = new URL(window.location.href);
        url.searchParams.delete("success");
        url.searchParams.delete("session_id");
        window.history.replaceState({}, "", url.toString());
    }, [sessionId, isFetched]);

    if (sessionId && isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-secondary">
                Verification du paiement...
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-[100vh]">
            <SuccessRequestModal
                open={openSuccessModal}
                onClose={() => {
                    setOpenSuccessModal(false)
                    router.push("/");
                }}
            />
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Paiement échoué</h1>
            <p className="text-center text-gray-600">Votre paiement n’a pas pu être traité. Veuillez réessayer.</p>
            <button
                onClick={() => router.push("/wizard")}
                className="rounded-full px-5 py-2.5 border border-[#E6D8CC] text-[#7A430D] hover:bg-[#7A430D] hover:text-white transition-colors"
            >
                Retour
            </button>
        </div>
    );
}