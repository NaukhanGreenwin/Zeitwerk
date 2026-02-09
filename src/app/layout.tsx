import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileMotionProvider from "@/components/MobileMotionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zeitwerk — Precision Business Automation",
  description:
    "Automate repetitive tasks with engineered precision. Zeitwerk helps businesses build safe, secure, and scalable automation solutions.",
  metadataBase: new URL("https://zeitwerk.io"),
  keywords: [
    "business automation",
    "workflow automation",
    "Canada",
    "process optimization",
    "Swiss precision",
    "Zeitwerk",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zeitwerk.io",
    siteName: "Zeitwerk",
    title: "Zeitwerk — Precision Business Automation",
    description:
      "Automate repetitive tasks with engineered precision. Safe, secure, and built to last.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Blocking script: adds .no-motion on mobile BEFORE first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(window.innerWidth<=768){document.documentElement.classList.add('no-motion')}`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-neutral-900`}>
        <MobileMotionProvider>{children}</MobileMotionProvider>
      </body>
    </html>
  );
}

