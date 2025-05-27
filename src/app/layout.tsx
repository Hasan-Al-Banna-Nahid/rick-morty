import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BannerWrapper from "./components/ui/shared/Banner";
import Image from "next/image";
import logo from "@/../public/assets/Logo.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rick & Morty",
  description: "Created by Nahid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:max-w-[1800px]`}
      >
        <BannerWrapper>
          <Image
            src={logo}
            className="w-auto h-auto mx-auto"
            alt="Rick & Morty Logo"
          />
          {children}
        </BannerWrapper>
      </body>
    </html>
  );
}
