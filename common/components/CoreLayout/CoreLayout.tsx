import { PropsWithChildren } from "react";

import { Footer } from "@/common/components/Footer";

export const CoreLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen-safe relative overflow-hidden">
      {children}
      <Footer />
    </div>
  );
};
