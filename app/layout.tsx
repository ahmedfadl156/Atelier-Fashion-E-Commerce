import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "sonner";

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
        <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}


