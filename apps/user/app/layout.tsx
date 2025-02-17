import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppBarClient } from "../components/appbarclient";
// import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenPay App",
  description: "A wallet app",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <Providers>
          <body className={inter.className}>
              <div className="min-w-screen bg-pink-50">
                <AppBarClient />
                {children}
              </div>
          </body>
        </Providers>
      </html>
  );
}

