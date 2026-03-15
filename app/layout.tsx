import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabila & Mauro",
  description:
    "Invitación de boda de Nabila y Mauro. Acompáñanos en nuestro día especial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta
          name="description"
          content="Invitación de boda - Únete a nosotros en nuestro día especial"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Dancing+Script:wght@400;600;700&family=Great+Vibes&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
