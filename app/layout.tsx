import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { inter } from "@/common/fonts";
import { cn } from "@/common/functions";

import "@/styles/main.css";

export const metadata: Metadata = {
  title: "Andre Hadianto | Software Engineer",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicons/icon-light.png",
        href: "/favicons/icon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicons/icon.png",
        href: "/favicons/icon-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn(inter.className, inter.variable)} lang="en">
      <Toaster />
      <body>{children}</body>
    </html>
  );
}
