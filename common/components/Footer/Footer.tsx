"use client";
import { motion } from "motion/react";

import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/CustomIcon";
import { Text } from "@/common/components/Text";
import { MY_EMAIL, Links } from "@/common/constants/links";
import { flyInMotion } from "@/common/functions";

export const Footer = () => {
  return (
    <motion.footer
      {...flyInMotion("down")}
      className="fixed bottom-0 z-header w-full border-t border-border-base bg-bg-base/60 px-2 py-2 backdrop-blur-sm after:pointer-events-none after:absolute after:inset-0 after:border-t-2 after:border-t-white/20"
    >
      <div className="mx-1 flex h-full items-center justify-between sm:mx-2 md:mx-3 lg:mx-4">
        <div className="flex flex-1 justify-start">
          <Text
            as="p"
            className="text-xs font-bold sm:text-sm lg:text-base"
          >{`// Designer, Developer`}</Text>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex w-fit items-center gap-2 rounded-md border border-border-base p-2">
            <Button
              external
              iconOnly
              as="a"
              href={Links.GITHUB}
              variant="ghost"
            >
              <Icon
                className="h-6 w-6"
                height={24}
                icon="lucide:github"
                width={24}
              />
            </Button>
            <Button
              external
              iconOnly
              as="a"
              href={Links.LINKEDIN}
              variant="ghost"
            >
              <Icon
                className="h-6 w-6"
                height={24}
                icon="lucide:linkedin"
                width={24}
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex h-16 w-fit min-w-16 items-center justify-center gap-2 rounded-md border border-border-base p-2">
            <Button
              external
              iconOnly
              as="a"
              href="mailto:andrehadiantolesmana@gmail.com"
              variant="ghost"
            >
              <Icon
                className="h-6 w-6"
                height={24}
                icon="lucide:mail"
                width={24}
              />
            </Button>
            <Text as="p" className="hidden md:block">
              {MY_EMAIL}
            </Text>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
