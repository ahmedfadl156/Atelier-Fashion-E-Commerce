import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

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
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}


