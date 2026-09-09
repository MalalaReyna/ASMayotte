import { Metadata } from "next";
import EspaceShellClient from "@/components/sidebar/EspaceShellClient";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Espace utilisateur | AS Mayotte"
  };
}
type EspaceLayoutProps = Readonly<{
  children: React.ReactNode;
}>;



export default async function EspaceLayout({ children }: EspaceLayoutProps) {
  const session=await auth();
  if(!session) {
    redirect("/login")
  }
  return (
    <EspaceShellClient>{children}</EspaceShellClient>
  );
}