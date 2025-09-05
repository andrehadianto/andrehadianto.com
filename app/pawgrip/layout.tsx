import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PawGrip x Climば | Point-of-sale tool",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full min-h-full">{children}</div>;
}
