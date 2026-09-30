import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import localFont from "next/font/local";
import "./globals.css";
const sans = localFont({
  src: [
    { path: "../../public/fonts/dm-sans.ttf", weight: "400", style: "normal" },
    {
      path: "../../public/fonts/dm-sans-semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: "../../public/fonts/libre-caslon-display.ttf",
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://ceidbd.com"),
  alternates: { canonical: "./" },
  title: {
    default: "CEID — People. Evidence. Inclusive Change.",
    template: "%s | CEID",
  },
  description:
    "Centre for Equity, Inclusion and Development. Independent research, practical learning and community engagement for a more inclusive future.",
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
