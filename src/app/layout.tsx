import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const monteserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vadanam",
  description: "Vedant's Watch Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={`${monteserrat.className} antialiased`}>
        <Toaster />
        <Navbar />
        <main className="wrapper m-auto min-w-[300px] p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
