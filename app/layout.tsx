import { CoreLayout } from "@/common/components/CoreLayout";
import { inter } from "@/common/fonts";
import { cn } from "@/common/functions";

import "@/styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn(inter.className, inter.variable)} lang="en">
      <body>
        <CoreLayout>{children}</CoreLayout>
      </body>
    </html>
  );
}
