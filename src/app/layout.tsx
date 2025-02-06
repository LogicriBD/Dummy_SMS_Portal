import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { generateStaticMetadata } from "@/lib/Metadata";
import AppLayout from "@/components/wrappers/AppLayout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = generateStaticMetadata({
  pageTitle: "Home",
  description: "The home page consists of the dashboard which shows the user with the registered numbers and the most recent few messages",
  keywords: ["Home", "Dashboard"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
