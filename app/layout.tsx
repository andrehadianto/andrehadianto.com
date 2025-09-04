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
      <body>{children}</body>
    </html>
  );
}
