import { useState } from "react";

import { SegmentedControl } from "@/common/components/SegmentedControl";

export default function Home() {
  const [selectedtab, setSelectedTab] = useState("home");

  const OPTIONS = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Projects",
      value: "project",
    },
    {
      label: "Contact",
      value: "contact",
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col items-center px-24 py-10">
      <SegmentedControl
        options={OPTIONS}
        style="connected"
        value={selectedtab}
        onValueChange={setSelectedTab}
      />
    </main>
  );
}
