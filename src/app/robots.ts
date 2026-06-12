import type { MetadataRoute } from "next";

const basis = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${basis}/sitemap.xml`,
  };
}
