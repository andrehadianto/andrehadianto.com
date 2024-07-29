import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/CustomIcon";
import { Text } from "@/common/components/Text";
import { MY_EMAIL, Links } from "@/common/constants/links";

export const Footer = () => {
  return (
    <footer className="z-header border-border-base fixed bottom-0 w-full border-t px-2 py-2">
      <div className="mx-1 flex items-center justify-between sm:mx-2 md:mx-3 lg:mx-4">
        <div className="flex flex-1 justify-start">
          <Text as="p" className="font-bold">{`// Designer, Developer`}</Text>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="border-border-base flex w-fit items-center gap-2 border p-2">
            <Button
              external
              iconOnly
              as="a"
              href={Links.GITHUB}
              variant="ghost"
            >
              <Icon
                className="h-8 w-8"
                height={32}
                icon="lucide:github"
                width={32}
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
                className="h-8 w-8"
                height={32}
                icon="lucide:linkedin"
                width={32}
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="border-border-base flex w-fit items-center gap-2 border p-2">
            <Button iconOnly variant="ghost">
              <Icon
                className="h-8 w-8"
                height={32}
                icon="lucide:mail"
                width={32}
              />
            </Button>
            <Text>{MY_EMAIL}</Text>
          </div>
        </div>
      </div>
    </footer>
  );
};
