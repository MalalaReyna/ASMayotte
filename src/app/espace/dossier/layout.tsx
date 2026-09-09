import { auth } from "@/auth";
import AccessError from "@/components/errors/AccessError";
import { ROLE_ADMIN } from "@/constants/userRoleConsts";

export default async function DossierLayout({children}: { children: React.ReactNode }) {
  const session = await auth();
    if (session?.user.role !== ROLE_ADMIN) {
      return (<AccessError />)
    }
    return (
    <>
      {children}
    </>
  );
}