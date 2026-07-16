import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/busca'], // Não indexar página de busca
    },
    sitemap: 'https://escolhacerta.vercel.app/sitemap.xml', // Trocar pelo domínio real depois
  };
}