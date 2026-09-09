"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Une erreur s'est produite :", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center flex items-center flex-col gap-4">
        <AlertTriangle size={50} className="text-red-500 mb-4" />
        <h1 className="text-h2-mobile md:text-h2 text-red-500">Une erreur est survenue</h1>
        <p className="text-gray-600 mt-2">Veuillez réessayer plus tard.</p>
        <button
          onClick={reset}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}