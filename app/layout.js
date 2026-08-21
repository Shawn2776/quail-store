import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { AuthAnalytics } from "@/components/AuthAnalytics";
import { ClarityAnalytics } from "@/components/ClarityAnalytics";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plexmono",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "2776 Quail Co.",
  description: "Fresh Coturnix quail eggs, raised local. Local pickup only.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}>
        <body>
          <CartProvider>{children}</CartProvider>
          <Analytics />
          <AuthAnalytics />
          <ClarityAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
