import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Permanent_Marker } from "next/font/google";
import { StickerDefs } from "@/components/stickers/sticker-art";
import { Providers } from "@/components/site/providers";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hand = Permanent_Marker({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Uknow Calcos | Stickers personalizados en vinilo premium",
  description:
    "Creá el sticker de tu logo, tu mascota o tu idea. Calcos troquelados de vinilo premium, listos en máximo 4 días hábiles y con envíos a todo el país.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#141518" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      suppressHydrationWarning
      className={`${display.variable} ${geistSans.variable} ${geistMono.variable} ${hand.variable} antialiased`}
    >
      <body id="top" className="min-h-full overflow-x-clip">
        <StickerDefs />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
