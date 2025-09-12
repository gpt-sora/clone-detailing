import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const defaultMetadata: Metadata = {
  title: {
    default: "Ukiyo Crew — Car Detailing",
    template: "%s | Ukiyo Crew",
  },
  description:
    "Ukiyo Crew: detailing premium ispirato al Giappone. Interni, esterni, vano motore, protezione vernice, rimozione macchie e oscuramento vetri.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Ukiyo Crew — Car Detailing",
    description:
      "Ukiyo Crew: detailing premium ispirato al Giappone. Interni, esterni, vano motore, protezione vernice, rimozione macchie e oscuramento vetri.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ukiyo Crew — Car Detailing",
    description:
      "Ukiyo Crew: detailing premium ispirato al Giappone. Interni, esterni, vano motore, protezione vernice, rimozione macchie e oscuramento vetri.",
  },
};


