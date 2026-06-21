import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.dennisdelgado.com";
const PUBLIC_PATH = "/gutcheck";
// Next does NOT prefix metadata URLs (canonical, og:url) with basePath, so we
// always point them at the full public path. Asset URLs (og:image, chunks) are
// prefixed automatically by basePath/assetPrefix at build time.
const PATH = PUBLIC_PATH;
const TITLE = "Gut Check — stress-test your product idea before you build it";
const DESCRIPTION =
  "A free 15-minute thinking exercise for first-time founders and vibe coders. Answer sharp PRD questions in your own words, get an honest reality check on your riskiest assumptions, and download a build-ready brief for Claude, ChatGPT, Cursor, or Lovable. No AI does the thinking for you.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Gut Check",
  },
  description: DESCRIPTION,
  applicationName: "Gut Check",
  authors: [{ name: "Dennis Delgado", url: SITE_URL }],
  creator: "Dennis Delgado",
  publisher: "Dennis Delgado",
  category: "technology",
  keywords: [
    "PRD",
    "product requirements document",
    "PRD template",
    "validate startup idea",
    "stress-test idea",
    "idea validation",
    "first-time founder",
    "vibe coding",
    "product strategy",
    "MVP scoping",
    "build brief",
    "Cursor",
    "Lovable",
    "Dennis Delgado",
  ],
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    type: "website",
    url: PATH,
    siteName: "Dennis Delgado",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@dennisdelgado",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Gut Check",
  url: `${SITE_URL}${PUBLIC_PATH}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (web)",
  description: DESCRIPTION,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Dennis Delgado", url: SITE_URL },
  inLanguage: "en",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
