import type { Metadata } from "next";
import Link from "next/link";
import SWRegistration from "./SWRegistration";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MJ Experience",
  description:
    "Interactive Michael Jackson experience",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
              {/* Logo */}
              <Link
                href="/"
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  tracking-tight
                  hover:scale-105
                  transition
                  text-center
                "
              >
                MICHAEL JACKSON
              </Link>

              {/* Menu */}
              <nav className="flex flex-wrap justify-center gap-3 w-full sm:w-auto">
                <Link
                  href="/"
                  className="
                    px-5
                    py-2.5
                    rounded-2xl
                    bg-zinc-900
                    border
                    border-zinc-800
                    hover:border-white
                    hover:scale-105
                    active:scale-95
                    transition
                    text-sm
                    sm:text-base
                    font-bold
                    text-center
                    min-w-[110px]
                  "
                >
                  Home
                </Link>

                <Link
                  href="/musica"
                  className="
                    px-5
                    py-2.5
                    rounded-2xl
                    bg-zinc-900
                    border
                    border-zinc-800
                    hover:border-white
                    hover:scale-105
                    active:scale-95
                    transition
                    text-sm
                    sm:text-base
                    font-bold
                    text-center
                    min-w-[110px]
                  "
                >
                  Música
                </Link>
                <Link
                  href="/presentacion"
                  className="
    px-5
    py-2.5
    rounded-2xl
    bg-zinc-900
    border
    border-zinc-800
    hover:border-white
    hover:scale-105
    active:scale-95
    transition
    text-sm
    sm:text-base
    font-bold
    text-center
    min-w-[110px]
  "
                >
                  Baile
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <main className="flex-1">
          {children}
        </main>
        <SWRegistration />
      </body>
    </html>
  );
}