import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { SegmentedControl } from "@/common/components/SegmentedControl";
import { Text } from "@/common/components/Text";

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

  const flyInMotion = (direction: "up" | "down" | "left" | "right") => {
    const initial = {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
    };
    const animate = { opacity: 1, x: 0, y: 0 };
    return { initial, animate, transition: { duration: 0.5 } };
  };

  const fadeInMotion = () => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  });

  return (
    <main className="h-screen-safe-no-footer mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 py-10 md:px-10 lg:px-24">
      <SegmentedControl
        options={OPTIONS}
        style="connected"
        value={selectedtab}
        onValueChange={setSelectedTab}
      />
      <div className="grid h-full w-full grid-flow-col grid-rows-3 gap-4">
        <motion.div
          {...flyInMotion("left")}
          className="col-span-1 row-span-2 rounded-md bg-red-400/10"
        >
          01
        </motion.div>
        <motion.div
          {...flyInMotion("up")}
          className="col-span-2 row-span-1 rounded-md bg-red-400/10"
        >
          02
        </motion.div>
        <motion.div
          {...flyInMotion("right")}
          className="col-span-2 row-span-1 rounded-md bg-red-400/10"
        >
          03
        </motion.div>
        <motion.div
          {...fadeInMotion()}
          className="col-span-1 row-span-1 rounded-md bg-primary-default"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <Image
              unoptimized
              alt="pfp"
              className="h-18 w-18 rounded-full"
              height={72}
              src="https://andrehadianto.github.io/andrehadianto.com/assets/pfp.png"
              width={72}
            />
            <Text as="h3" className="text-lg font-bold">
              Andre Hadianto Lesmana
            </Text>
          </div>
        </motion.div>
        <motion.div
          {...flyInMotion("down")}
          className="col-span-1 row-span-2 rounded-md bg-red-400/10"
        >
          05
        </motion.div>
      </div>
    </main>
  );
}
