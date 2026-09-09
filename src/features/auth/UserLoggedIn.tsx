import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserLoggedInProps {
    userName: string;
    onLogOut: () => void;
}

export default function UserLoggedIn({ userName, onLogOut }: UserLoggedInProps) {
    const router=useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 👉 Fermer si clic en dehors
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bouton utilisateur */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-11 h-11 rounded-full bg-white hover:cursor-pointer 
                           flex items-center justify-center shadow-md 
                           hover:scale-105 active:scale-95 transition-all duration-200"
            >
                <UserIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute right-0 mt-3 w-56 rounded-xl 
                                   bg-white 
                                   border border-gray-200 shadow-xl 
                                   overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="px-4 py-3">
                            <p className="text-xs text-gray-500">Connecté en tant que</p>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {userName}
                            </p>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Actions */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push("/espace/devis");
                            }}
                            className="hover:cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm 
                                       hover:bg-outline  transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4"/>
                            Accéder à mon espace
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogOut();
                            }}
                            className="hover:cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 text-sm 
                                       text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Se déconnecter
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}