import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    return [
      // Static assets caching
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      // Security headers per tutte le pagine
      {
        source: "/(.*)",
        headers: [
          // HSTS - Force HTTPS (solo in produzione)
          ...(isDev ? [] : [
            { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" }
          ]),
          // Content Security Policy - Prevenzione XSS
          { 
            key: "Content-Security-Policy", 
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // TODO: rimuovere unsafe-inline dopo refactor
              "style-src 'self' 'unsafe-inline'", // TailwindCSS richiede unsafe-inline
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "connect-src 'self' https://api.resend.com",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Prevenzione clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevenzione MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer policy per privacy
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Feature policy - Limitare API browser
          { 
            key: "Permissions-Policy", 
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()" 
          },
          // XSS Protection (legacy ma utile)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // DNS prefetch control
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Cross-Origin policies
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
