import { Toaster } from "react-hot-toast";

import { inter } from "@/common/fonts";
import { cn } from "@/common/functions";

import "@/styles/main.css";

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
