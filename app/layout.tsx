
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bem vindo | Senac Aprendiz",
  description: "Plataforma de aprendizado do Senac",
  icons: {
    icon: "/app/favicon.ico?v=2", // 👈 mude o número a cada troca
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <html
      lang="pt-BR"
      className={cn(geistSans.variable, geistMono.variable, inter.variable)}
      suppressHydrationWarning
    >
      <body className={cn("h-full antialiased font-sans")} suppressHydrationWarning>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
