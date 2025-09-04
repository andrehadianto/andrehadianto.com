"use client";
/* eslint-disable @next/next/no-img-element */
import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useState } from "react";

import { Button } from "@/common/components/Button";
import { cn } from "@/common/functions";

export const PrintPage = () => {
  const [extraImage, setExtraImage] = useState<string[]>([]);
  const [tinyImage, setTinyImage] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const imageSize = searchParams.get("imageSize") ?? "";
  const blackBorderSize = searchParams.get("blackBorderSize") ?? "";
  const whiteBorderSize = searchParams.get("whiteBorderSize") ?? "";
  const filesParam = searchParams.get("files") ?? "";
  const tinyFilesParam = searchParams.get("tinyFiles") ?? "";

  let parsedFiles: string[] = [];
  let parsedTinyFiles: string[] = [];
  try {
    parsedFiles = JSON.parse(filesParam || "[]");
  } catch {}
  try {
    parsedTinyFiles = JSON.parse(tinyFilesParam || "[]");
  } catch {}

  if (!filesParam || !imageSize || !blackBorderSize || !whiteBorderSize) {
    return (
      <span className="text-text-em-high font-mono text-sm">
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

  const countPerImage =
    parsedFiles.length > 0 ? Math.floor(imageCount / parsedFiles.length) : 0;

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

  const renderTinyImage = (file: string) => (
    <div className="h-fit w-fit border border-black">
      <div
        className="border-white"
        style={{
          boxSizing: "border-box",
          height: `35mm`,
          width: `35mm`,
          borderWidth: `2mm`,
        }}
      >
        <img
          alt="sticker"
          className={cn("box-border border-black object-cover")}
          src={file}
          style={{ borderWidth: `1mm` }}
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
          {tinyImage.length > 0 &&
            tinyImage.map((file) => renderTinyImage(file))}
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
        <div className="flex gap-2">
          <Button
            fullWidth
            onClick={() => setTinyImage([...tinyImage, parsedTinyFiles[0]])}
          >
            Add Tiny Image
          </Button>
          <Button
            fullWidth
            onClick={() => setTinyImage(tinyImage.slice(0, -1))}
          >
            Delete Last Tiny Image
          </Button>
        </div>
        <span className="text-text-em-high font-mono text-sm">
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
