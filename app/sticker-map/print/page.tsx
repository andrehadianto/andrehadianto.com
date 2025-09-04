import { PropsWithChildren, Suspense } from "react";

import { PrintClient } from "@/modules/sticker-map";

export default function PrintPage() {
  return (
    <Suspense
      fallback={
        <span className="text-text-em-high font-mono text-sm">loading...</span>
      }
    >
      <PrintClient />
    </Suspense>
  );
}

PrintPage.layout = ({ children }: PropsWithChildren) => (
  <div className="relative">{children}</div>
);
