import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.FRONT_URL;

  return [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/entreprise-individuelle`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/micro-entreprise`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/sarl`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/eurl`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/sas`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/sasu`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/holding`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/creer-mon-entreprise/sci`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/reponse-marche-public`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/gestion-administrative`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/modifier-mon-entreprise`, lastModified: new Date().toISOString() },
  ];
}