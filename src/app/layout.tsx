import type { Metadata } from "next";
import { Fraunces, Caveat, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aliza's Thread House | Handmade Embroidery & Crochet in Pakistan",
    template: "%s | Aliza's Thread House",
  },
  description:
    "Handmade embroidery hoop art, crochet keychains, bag charms, and custom crochet gifts made to order in Pakistan. Shop online with EasyPaisa & JazzCash, or message us on WhatsApp.",
  keywords: [
    "handmade crochet Pakistan",
    "crochet keychains Pakistan",
    "embroidery hoop art",
    "crochet bag charms",
    "custom crochet gifts",
    "crochet rose bag",
    "handmade embroidery Pakistan",
    "crochet cardigan Pakistan",
    "amigurumi keychain",
    "Aliza's Thread House",
    "personalized name keychain crochet",
    "EasyPaisa JazzCash handmade shop",
  ],
  authors: [{ name: "Aliza's Thread House" }],
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Aliza's Thread House",
    title: "Aliza's Thread House | Handmade Embroidery & Crochet",
    description:
      "Unique embroidery art and cozy crochet creations, handmade to order in Pakistan. Custom designs, keychains, bags, and more.",
    images: [{ url: "/brand/logo.png", width: 1254, height: 1254 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliza's Thread House | Handmade Embroidery & Crochet",
    description: "Handmade embroidery and crochet, made to order in Pakistan.",
    images: ["/brand/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${caveat.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
