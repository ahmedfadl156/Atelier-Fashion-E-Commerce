import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Fashion",
  description: "Discover timeless elegance with our curated collection of minimalist fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: "'Liberation Serif', Georgia, serif" }}
      >
        {children}
      </body>
    </html>
  );
}

