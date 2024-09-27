/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

import { Button } from "@/common/components/Button";
import { cn } from "@/common/functions";

export const PrintPage = () => {
  const [extraImage, setExtraImage] = useState<string[]>([]);

  const { query } = useRouter();
  const { imageSize, blackBorderSize, whiteBorderSize, files } = query as {
    imageSize: string;
    blackBorderSize: string;
    whiteBorderSize: string;
    files: string;
  };

  const parsedFiles: string[] = JSON.parse(files);

  if (!files || !imageSize || !blackBorderSize || !whiteBorderSize) {
    return (
      <span className="font-mono text-sm text-text-em-high">
        missing something. go back!
      </span>
    );
  }

  const parentWidth = 210;
  const parentHeight = 297;
  const childSize = imageSize || "1";

  const columns = Math.floor(parentWidth / Number(childSize));
  const rows = Math.floor(parentHeight / Number(childSize));

  const imageCount = columns * rows;

  const countPerImage = imageCount / parsedFiles.length;

  const renderImage = (file: string) => (
    <div className="h-fit w-fit border border-black">
      <div
        className="border-white"
        style={{
          boxSizing: "border-box",
          height: `${imageSize}mm`,
          width: `${imageSize}mm`,
          borderWidth: `${whiteBorderSize}mm`,
        }}
      >
        <img
          alt="sticker"
          className={cn("box-border border-black object-cover")}
          src={file}
          style={{ borderWidth: `${blackBorderSize}mm` }}
        />
      </div>
    </div>
  );

  return (
    <main className="flex flex-col gap-4">
      <section className="h-[297mm] w-[210mm] bg-white">
        <div
          className="relative grid h-full w-full place-content-start gap-0.5"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${childSize}mm, 1fr))`,
            gridAutoRows: `${childSize}mm`,
          }}
        >
          {parsedFiles.length > 0 &&
            parsedFiles.map((file) =>
              Array.from({ length: countPerImage }).map((_, index) =>
                renderImage(file),
              ),
            )}
          {extraImage.length > 0 && extraImage.map((file) => renderImage(file))}
        </div>
      </section>
      <div className="flex w-[210mm] flex-col gap-2">
        <div className="flex gap-2">
          <Button
            fullWidth
            onClick={() => setExtraImage([...extraImage, parsedFiles[0]])}
          >
            Add Extra Image
          </Button>
          <Button
            fullWidth
            onClick={() => setExtraImage(extraImage.slice(0, -1))}
          >
            Delete Last Extra Image
          </Button>
        </div>
        <span className="font-mono text-sm text-text-em-high">
          The white space above is the A4 paper.
        </span>
      </div>
    </main>
  );
};

PrintPage.layout = ({ children }: PropsWithChildren) => (
  <div className="relative">{children}</div>
);

export default PrintPage;
