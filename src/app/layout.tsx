import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forge.foundryframe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FORGE by Foundry Frame",
    template: "%s | FORGE",
  },
  description: "FORGE by Foundry Frame. Production-ready website kits and starter systems for founders and developers who want to launch fast.",
  keywords: [
    "creative agency",
    "design agency",
    "branding",
    "web design",
    "Ohio",
    "digital marketing",
    "content creation",
    "visual identity",
    "UX/UI design",
    "conversion optimization",
    "ongoing support",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FORGE by Foundry Frame",
    description:
      "Production-ready website kits and starter systems for founders and developers who want to launch fast.",
    siteName: "FORGE by Foundry Frame",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FORGE by Foundry Frame",
    description:
      "Production-ready website kits and starter systems for founders and developers who want to launch fast.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
