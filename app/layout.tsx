import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://nabimauro.vercel.app/";
const defaultDescription =
  "Invitación a nuestra boda.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nabila & Mauro",
  description: defaultDescription,
  openGraph: {
    title: "Nabila & Mauro",
    description: defaultDescription,
    url: "/",
    siteName: "Nabila & Mauro",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/h-gallery/IMG_OG.jpg",
        alt: "Nabila & Mauro — Nuestra boda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabila & Mauro",
    description: defaultDescription,
    images: ["/h-gallery/IMG_OG.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Dancing+Script:wght@400;600;700&family=Great+Vibes&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;600;700&family=Pacifico&family=Caveat:wght@400;700&family=Fredoka:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
