import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { config, chains } from "@/config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { cookieToInitialState } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Treasury Manager",
  description:
    "Institutional treasury management with AI-powered portfolio rebalancing",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const initialState = cookieToInitialState(
    config(),
    headersList.get("cookie")
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
