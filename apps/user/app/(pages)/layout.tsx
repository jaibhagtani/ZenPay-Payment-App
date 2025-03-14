
import { AppBarClient } from "../../components/appbarclient";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "ZenPay App",
  description: "A wallet app",
};

// Hello bvsi

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen bg-pink-50">
    <AppBarClient />
    {children}
    </div>
  );
}

