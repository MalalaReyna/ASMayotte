import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/providers/AuthSessionProvider";
import MSWProvider from "@/providers/msw-provider";
import AppQueryClientProvider from "@/providers/tanstack-query-providers";
import { Toaster } from "sonner";
import { AuthGuard } from "@/guards/AuthGuard";
import { ensureServerMocking } from "@/mocks/server/init";
const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(process.env.FRONT_URL || "http://localhost:3000"),
  title: "AS Mayotte - Cabinet juridique et création d'entreprise à Mayotte",
  description: "AS Mayotte vous accompagne dans la création et la gestion de votre entreprise avec des services adaptés à vos besoins.",
  keywords: "creation entreprise mayotte, gestion entreprise mayotte, modification entreprise mayotte, conseil juridique, cabinet juridique, Mayotte, creation societe Mayotte",
  authors: [{ name: "A&S Mayotte", url: process.env.FRONT_URL }],
  robots: "index, follow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
  },
  alternates: {
    canonical: "./",
  },
  other: {
    "msvalidate.01": "A0FEDCF2799D1C0C1CDF3D819E0B47C7",
    "google-site-verification": "Y9e4ymv0-Y-19XEihfQ_FOvqKocRi3bBopp0Y60g1cc",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ensureServerMocking();
  return (
    <html lang="fr">
      <body
        className={`${outfitSans.variable} antialiased select-none`}
      >
        <AppQueryClientProvider>
          <MSWProvider>
            <AuthSessionProvider>
              <AuthGuard />
              {children}
            </AuthSessionProvider>
          </MSWProvider>
        </AppQueryClientProvider>
        <Toaster duration={5000} />
      </body>
    </html>
  );
}
