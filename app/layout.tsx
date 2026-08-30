import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Raj Kapadia - AI Agent Engineer, TrishiAI Founder and Calorie Buddy AI Creator',
  description: 'Raj Kapadia builds production-ready AI agents, conversational systems, and full-stack AI products. Founder of TrishiAI and creator of Calorie Buddy AI.',
  alternates: {
    canonical: 'https://rajkapadia.com',
  },
  twitter: {
    card: 'summary',
    creator: '@RaajKapadia',
    title: 'Raj Kapadia - AI Agent and Applied LLM Engineer',
    description: 'Founder of TrishiAI and creator of Calorie Buddy AI, building production AI agents and full-stack LLM products.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar></Navbar>
          {children}
          <Toaster></Toaster>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
