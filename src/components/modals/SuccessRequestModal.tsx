"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type SuccessRequestModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessRequestModal({ open, onClose }: SuccessRequestModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50">
          <motion.button
            aria-label="Fermer le modal"
            onClick={onClose}
            className="absolute inset-0 w-full h-full bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <div className="relative z-10 min-h-full flex items-center justify-center p-4">
            <motion.div
              className="w-full max-w-[22.4rem] rounded-[3.5rem] border border-[#E8DDD3] bg-white p-[1.125rem] text-center shadow-sm"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <motion.div
                className="mx-auto mb-8 h-[3.625rem] w-[3.625rem] rounded-full bg-[#F3ECE6] flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.24 }}
              >
                <Check size={24} strokeWidth={2.2} className="text-[#7A430D]" />
              </motion.div>

              <h2 className="text-[2rem] leading-[1.1] font-bold text-[#6E3B06] mb-6">
                Demande envoyé
                <br />
                avec succès
              </h2>

              <p className="text-[1rem] leading-[1.35] text-[#8B847D] mb-10">
                Demande de création soumise avec succès !
                <br />
                Accédez à votre espace personnel pour suivre l&apos;avancement de votre dossier.
              </p>
              <div className="flex flex-col gap-y-3">
                <Link href={"/espace/dossier"}>
                  <button
                    type="button"
                    className="hover:cursor-pointer w-full rounded-full bg-outline border  py-5 text-dark text-[1.125rem] font-medium leading-none hover:opacity-85 transition"
                  >
                    Accéder à mon espace
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:cursor-pointer w-full rounded-full bg-[#220E00] py-5 text-white text-[1.125rem] font-medium leading-none hover:opacity-95 transition"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}