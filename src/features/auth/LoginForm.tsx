"use client"
import { signIn } from "next-auth/react";
import { LoginFormValues, loginSchema } from "@/validations/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginRegisterCard from "./LoginRegisterCard";
import { toast } from "sonner";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [authError, setAuthError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit = async (values: LoginFormValues) => {
        setAuthError(null);

        const callbackUrl = searchParams.get("callbackUrl") || "";

        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (!result || result.error) {
            setAuthError("Email ou mot de passe invalide.");
            toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
            return;
        }

        callbackUrl ? router.push(callbackUrl) : router.push("/");
        toast.success("Connexion réussie ! Redirection en cours...");
    };
    return (
        <LoginRegisterCard className="relative z-10" title={`${searchParams.get("callbackUrl") ? "Connectez-vous pour finaliser votre demande" : "Connexion"}`} description="Accédez à votre espace.">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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

                {authError ? <p className="text-xs text-red-600">{authError}</p> : null}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="hover:cursor-pointer w-full rounded-full bg-[#220E00] text-white py-3 font-medium hover:opacity-95 disabled:opacity-60"
                >
                    {isSubmitting ? "Connexion..." : "Se connecter"}
                </button>
            </form>
            <p className="mt-4 text-sm text-[#8C7A6B]">
                Pas de compte ?{" "}
                <Link href={`/register${searchParams ? `?${searchParams}` : ''}`} className="text-[#7A430D] font-semibold hover:underline">
                    Créer un compte
                </Link>
            </p>
        </LoginRegisterCard>
    )

}