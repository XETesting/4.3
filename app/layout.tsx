import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tip Calculator",
  description: "Calculate tips easily and share your thoughts in the comments",
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[var(--background)]">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
