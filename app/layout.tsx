import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Thoriq Saputra",
  description: "Personal portfolio of Thoriq Saputra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
