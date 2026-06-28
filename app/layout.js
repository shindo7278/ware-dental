import "./globals.css";
import { clinic } from "@/clinic.config";

export const metadata = {
  title: clinic.seo.defaultTitle,
  description: clinic.seo.defaultDescription,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
