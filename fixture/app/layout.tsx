import type { ReactNode } from "react";

export const metadata = { title: "Pinboard", description: "A tiny feedback board" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto" }}>{children}</body>
    </html>
  );
}
