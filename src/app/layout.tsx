import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense, type ReactNode } from "react"

import { AppShell } from "@/components/shell/app-shell"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "AION — Event intelligence",
    template: "%s · AION",
  },
  description:
    "Agentic event-intelligence and prediction operating system. What changed, why, and how sure we are.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  )
}
