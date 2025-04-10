import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
const inter = Inter({ subsets: ["latin"] });
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { OnboardingContextProvider } from "@/context/context";

// import { ourFileRouter } from "~/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "NileCare",
      url: "https://care.niletech.co",
    },
  ],
  creator: "NileCare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@nilecare",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>
          <OnboardingContextProvider>
            <ThemeProvider
              attribute="class"
              // defaultTheme="system"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </OnboardingContextProvider>
        </Providers>
      </body>
    </html>
  );
}
