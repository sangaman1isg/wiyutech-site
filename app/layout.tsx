import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/src/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wiyutech.com"),
  title: {
    default:
      "Wiyule Technology — Websites & AI WhatsApp Assistants for Businesses in Malawi & Zambia",
    template: "%s · Wiyule Technology",
  },
  description:
    "Wiyule Technology builds premium websites, booking systems and AI WhatsApp assistants for small businesses in Malawi and Zambia. Stop losing customers to slow replies. Launch in 7 days.",
  keywords: [
    "Wiyule Technology",
    "website developer Lusaka",
    "website developer Zambia",
    "website developer Malawi",
    "WhatsApp AI assistant Africa",
    "business automation Lusaka",
    "business automation Lilongwe",
    "Africa SaaS",
    "African tech startup",
    "AI for African SMEs",
    "Lusaka web design",
    "Lilongwe web design",
    "automotive website Zambia",
    "restaurant website Malawi",
    "school website Zambia",
  ],
  authors: [{ name: "Wiyule Technology" }],
  creator: "Wiyule Technology",
  publisher: "Wiyule Technology",
  openGraph: {
    title: "Wiyule Technology — Built for Your Business",
    description:
      "Websites, booking systems & AI WhatsApp assistants for businesses in Malawi & Zambia.",
    type: "website",
    locale: "en_ZM",
    siteName: "Wiyule Technology",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiyule Technology — Built for Your Business",
    description:
      "Websites, booking systems & AI WhatsApp assistants for businesses in Malawi & Zambia.",
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
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}