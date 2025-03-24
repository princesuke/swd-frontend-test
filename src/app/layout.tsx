import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import "@/lib/i18n";
import Header from "@/components/layout/Header";
import { ConfigProvider } from "antd";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "React Interactive Dashboard",
  description:
    "A modern single-page application featuring dynamic shape control and a localized person management system using Redux Toolkit and Ant Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#333333",
              colorText: "#555555",
              colorTextHeading: "#333333",
              fontFamily: "var(--font-geist-sans, sans-serif)",
            },
          }}
        >
          <Header />
          <main>{children}</main>
        </ConfigProvider>
      </body>
    </html>
  );
}
