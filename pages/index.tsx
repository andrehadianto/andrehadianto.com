import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { SegmentedControl } from "@/common/components/SegmentedControl";
import { Text } from "@/common/components/Text";
import { fadeInMotion, flyInMotion } from "@/common/functions";

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
    <main className="h-screen-safe-no-footer mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 py-10 md:px-10 lg:px-24">
      <SegmentedControl
        options={OPTIONS}
        style="connected"
        value={selectedtab}
        onValueChange={setSelectedTab}
      />
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-4">
        <motion.div
          {...flyInMotion("left", 100, 0.2)}
          className="col-span-1 row-span-2 rounded-md bg-red-400/10"
        >
          01
        </motion.div>
        <motion.div
          {...flyInMotion("down", 100, 0.4)}
          className="col-span-2 row-span-1 rounded-md bg-red-400/10"
        >
          02
        </motion.div>
        <motion.div
          {...fadeInMotion()}
          className="col-span-1 row-span-1 rounded-md bg-primary-default"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Image
              unoptimized
              alt="pfp"
              className="h-10 w-10 md:h-18 md:w-18 rounded-full"
              height={72}
              src="https://andrehadianto.github.io/andrehadianto.com/assets/pfp.png"
              width={72}
            />
            <Text
              as="h3"
              className="text-balance text-center text-sm font-bold md:text-lg"
            >
              Andre Hadianto Lesmana
            </Text>
          </div>
        </motion.div>
        <motion.div
          {...flyInMotion("up", 100, 0.6)}
          className="col-span-1 row-span-2 rounded-md bg-red-400/10"
        >
          03
        </motion.div>
        <motion.div
          {...flyInMotion("right", 100, 0.8)}
          className="col-span-2 row-span-1 rounded-md bg-red-400/10"
        >
          05
        </motion.div>
      </div>
    </main>
  );
}
