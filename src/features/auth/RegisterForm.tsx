"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginRegisterCard from "@/features/auth/LoginRegisterCard";
import { RegisterFormValues, registerSchema } from "@/validations/auth/authSchema";
import { useMutation } from "@tanstack/react-query";
import { register as registerAuth } from "@/services/auth/authService";
import { toast } from "sonner";
export default function RegisterForm() {
    const registerMutation = useMutation({
        mutationFn: async (values: RegisterFormValues) => {
            return await registerAuth(values);
        },
        onSuccess: () => {
            toast.success("Inscription réussie ! Redirection en cours...");
        },
        onError: (err) => {
            toast.error(err.message ? err.message : "Une erreur est survenue lors de l'inscription.");
        }
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const [authError, setAuthError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setAuthError(null);

        try {
            await registerMutation.mutateAsync(values);

            const callbackUrl = searchParams.get("callbackUrl") || "";

            if (callbackUrl === "") {
                router.push("/login");
            } else {
                const loginRes = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                });

                if (!loginRes || loginRes.error) {
                    setAuthError("Compte créé, mais connexion impossible.");
                    return;
                }

                router.push(callbackUrl);
            }

        } catch (error) {
            return;
        }
    };

    return (
        <LoginRegisterCard className="mt-20 relative z-10" title={`Créer un compte ${searchParams.get("callbackUrl") ? "pour finaliser votre demande" : ""}`} description="Rejoignez la plateforme A&S Mayotte.">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[#7A430D] mb-1">Nom</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none focus:border-[#C49A77]"
                        placeholder="Votre nom"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#7A430D] mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none focus:border-[#C49A77]"
                        placeholder="exemple@email.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#7A430D] mb-1">Mot de passe</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none focus:border-[#C49A77]"
                        placeholder="********"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#7A430D] mb-1">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        {...register("confirmedPassword")}
                        className="w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none focus:border-[#C49A77]"
                        placeholder="********"
                    />
                    {errors.confirmedPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmedPassword.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#7A430D] mb-1">Numéro de téléphone</label>
                    <input
                        type="tel"
                        {...register("phone")}
                        className="w-full rounded-full border border-[#E6D8CC] px-4 py-3 outline-none focus:border-[#C49A77]"
                        placeholder="+262XXXXXX"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                {authError ? <p className="text-xs text-red-600">{authError}</p> : null}
                <button
                    type="submit"
                    disabled={isSubmitting || registerMutation.isPending}
                    className="hover:cursor-pointer w-full rounded-full bg-[#220E00] text-white py-3 font-medium hover:opacity-95 disabled:opacity-60"
                >
                    {isSubmitting || registerMutation.isPending ? "Inscription..." : "S'inscrire"}
                </button>
            </form>

            <p className="mt-4 text-sm text-[#8C7A6B]">
                Vous avez déjà un compte ?{" "}
                <Link href={`/login${searchParams ? `?${searchParams}` : ''}`} className="text-[#7A430D] font-semibold hover:underline">
                    Se connecter
                </Link>
            </p>
        </LoginRegisterCard>
    );
}