export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
