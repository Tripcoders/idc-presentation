import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IDC Digital Transformation — Board Presentation",
  description: "Industrial Development Corporation of South Africa — Comprehensive Digital Transformation & Infrastructure Modernization Presentation",
  keywords: ["IDC", "digital transformation", "infrastructure modernization", "security assessment", "South Africa"],
  authors: [{ name: "HexStrike AI Cybersecurity" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23191c1f'/><text x='8' y='23' font-family='Inter' font-weight='700' font-size='18' fill='white'>I</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
