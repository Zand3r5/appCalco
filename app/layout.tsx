import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Geist, Geist_Mono } from "next/font/google";
import { StickerDefs } from "@/components/stickers/sticker-art";
import { Providers } from "@/components/site/providers";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Tema Calcos | Stickers personalizados en vinilo premium",
  description:
    "Creá el sticker de tu logo, tu mascota o tu idea. Calcos troquelados de vinilo premium, listos en máximo 4 días hábiles y con envíos a todo el país.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#16181f" },
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
