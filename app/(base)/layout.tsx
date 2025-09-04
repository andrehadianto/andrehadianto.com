import { CoreLayout } from "@/common/components/CoreLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CoreLayout>{children}</CoreLayout>;
}
