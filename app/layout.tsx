import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import WiyuBubble from "@/src/components/WiyuBubble";
import AnimationObserver from "@/src/components/AnimationObserver";
import CursorGlow from "@/src/components/CursorGlow";
import CustomCursor from "@/src/components/CustomCursor";
import MotionProvider from "@/src/components/MotionProvider";
import PromoBanner from "@/src/components/PromoBanner";

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
  // Only 600 (.headline) and 800 (.numeral) are used — 400/700 were dead weight.
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wiyuletech.com"),
  title: {
    default:
      "Wiyule Technology — Websites & AI WhatsApp Assistants for Businesses in Malawi & Zambia",
    template: "%s · Wiyule Technology",
  },
  description:
    "Wiyule Technology builds premium websites, booking systems and AI WhatsApp assistants, plus graphic design (posters, flyers and social content), for small businesses in Malawi and Zambia. Stop losing customers to slow replies. Launch in 7 days.",
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
    "graphic design Zambia",
    "poster and flyer design Malawi",
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
  verification: {
    google: "l1BzN-mXVUnQn-3dmwE5k5j9rJsBL8zeNh6RFPEpyHI",
  },
  category: "technology",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Wiyule Technology",
  description:
    "Wiyule Technology builds websites, booking systems and AI WhatsApp assistants for small businesses in Malawi and Zambia. Stop losing customers to slow replies. Launch in 7 days.",
  url: "https://wiyuletech.com",
  telephone: "+260774668193",
  email: "wiyuletechnology@gmail.com",
  foundingDate: "2026",
  founder: {
    "@type": "Person",
    name: "Tamsanga Kayuni",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lusaka",
    addressCountry: "ZM",
  },
  areaServed: [
    { "@type": "Country", name: "Zambia" },
    { "@type": "Country", name: "Malawi" },
  ],
  sameAs: ["https://instagram.com/wiyutechafrica"],
  knowsAbout: [
    "Web Development",
    "AI WhatsApp Assistants",
    "Business Automation",
    "Digital Marketing",
    "Graphic Design",
    "Google Business Profile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <MotionProvider>
          <PromoBanner />
          {children}
          <WiyuBubble />
          <AnimationObserver />
          <CursorGlow />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}