/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import "./globals.css";
import ServerUpdate from "@/components/effects/server-update";
import TitleBar from "@/components/molecules/title-bar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import JotaiProvider from "@/providers/jotai-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Orbit Launcher",
  description: "Modern SA-MP launcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background h-screen overflow-hidden font-sans antialiased",
          fontSans.variable,
        )}
      >
        <JotaiProvider>
          <ServerUpdate />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TitleBar />
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="bottom-center" richColors />
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
