import LoginForm from "@/features/auth/LoginForm";
import { auth } from "@/auth";
export default async function LoginPage() {
    //redirect to / if already logged in
    const session = await auth()
    if (session) return <div>Already authenticated</div>
    
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-10">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/images/herobg.png')] bg-cover bg-center"></div>

            {/* Fade to white overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
            <LoginForm />
        </section>
    );
}