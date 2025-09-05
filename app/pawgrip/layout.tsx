import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PawGrip x Climば | Point-of-sale tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full min-h-full">{children}</div>;
}
