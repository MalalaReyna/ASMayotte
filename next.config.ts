import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.75'],
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://blog.digitalcook.fr/wp-content/uploads/**"),
      new URL("https://asmayotte.com/wp-content/uploads/**"),
      new URL("https://png.pngtree.com/**"),
      new URL(process.env.NEXT_PUBLIC_BACK_URL + "/**"),
    ],
  },
  // pour redirection des anciennes urls vers les nouvelles
  redirects: async () => {
    return [
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/accueil",
        destination: "/",
        permanent: true,
      },
      {
        source: "/qui-sommes-nous",
        destination: "/",
        permanent: true,
      },
      {
        source: "/conseil-juridique",
        destination: "/conseil-juridique",
        permanent: true,
      },
      {
        source: "/evolution-de-l-activite-de-l-entreprise",
        destination: "/",
        permanent: true,
      },
      {
        source: "/offre-demplois",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
