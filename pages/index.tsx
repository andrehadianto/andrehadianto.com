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
    <main className="sm:h-screen-safe-no-footer mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 pb-24 pt-10 sm:pb-10 md:px-10 lg:px-24">
      <SegmentedControl
        options={OPTIONS}
        style="connected"
        value={selectedtab}
        onValueChange={setSelectedTab}
      />
      <div className="grid h-full w-full grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-3">
        <motion.div
          {...flyInMotion("left", 100, 0.2)}
          className="col-span-2 row-span-1 min-h-40 rounded-md bg-[#FF8709] p-2 sm:col-span-1 sm:row-span-2"
        >
          <div className="flex flex-col gap-2">
            <Text
              as="h2"
              className="text-darkText-em-high text-balance text-lg font-bold sm:text-2xl"
            >
              Projects
            </Text>
          </div>
        </motion.div>
        <motion.div
          {...flyInMotion("up", 100, 0.4)}
          className="col-span-2 row-span-1 min-h-40 rounded-md bg-primary-default p-2 sm:col-span-2"
        >
          <div className="flex flex-col gap-2">
            <Text
              as="h2"
              className="text-balance text-lg font-bold sm:text-2xl"
            >
              My Tech Stacks
            </Text>
          </div>
        </motion.div>
        <motion.div
          {...fadeInMotion()}
          className="col-span-2 row-span-1 min-h-40 rounded-md bg-surface-base p-2 sm:col-span-1"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <Image
              unoptimized
              alt="pfp"
              className="md:h-18 md:w-18 h-10 w-10 rounded-full"
              height={72}
              src="https://andrehadianto.github.io/andrehadianto.com/assets/pfp.png"
              width={72}
            />
            <div className="space-y-1">
              <Text
                as="h3"
                className="text-balance text-center text-lg font-bold"
              >
                {`Hello, I'm `}
                <span className="text-element-primary">Andre</span>
              </Text>
              <Text
                as="h3"
                className="text-balance text-center text-lg font-bold"
              >
                {`Based in Singapore 🇸🇬`}
              </Text>
            </div>
          </div>
        </motion.div>
        <motion.div
          {...flyInMotion("right", 100, 0.6)}
          className="col-span-2 row-span-1 min-h-40 rounded-md bg-[#FFD074] p-2 sm:col-span-1 sm:row-span-2"
        >
          <div className="flex flex-col gap-2">
            <Text
              as="h2"
              className="text-darkText-em-high text-balance text-lg font-bold sm:text-2xl"
            >
              About Me / Blog?
            </Text>
          </div>
        </motion.div>
        <motion.div
          {...flyInMotion("down", 100, 0.8)}
          className="col-span-2 row-span-1 min-h-40 rounded-md bg-nice1 p-2"
        >
          <div className="flex flex-col gap-2">
            <Text
              as="h2"
              className="text-balance text-lg font-bold sm:text-2xl"
            >
              Work Experiences
            </Text>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
