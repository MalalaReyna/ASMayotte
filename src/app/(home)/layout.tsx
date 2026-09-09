import { Footer } from "@/features/home/footer/Footer";
import { Header } from "@/features/home/hero/Header";
import { getAllServices } from "@/services/serviceClass/serviceClassService";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const servicesData = await getAllServices();

  return (
    <>
      <Header servicesData={servicesData} />
      <main>{children}</main>
      <Footer />
    </>
  );
}