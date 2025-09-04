"use client";
/* eslint-disable @next/next/no-img-element */
import { type FilePondFile } from "filepond";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { FilePond } from "react-filepond";

import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/CustomIcon";
import { Footer } from "@/common/components/Footer";
import { Input } from "@/common/components/Input";
import { cn } from "@/common/functions";

import "filepond/dist/filepond.min.css";

export const StickerMap = () => {
  const router = useRouter();
  const [files, setFiles] = useState<Blob[]>([]);
  const [tinyFiles, setTinyFiles] = useState<Blob[]>([]);

  const [imageSize, setImageSize] = useState(51);
  const [blackBorderSize, setBlackBorderSize] = useState(1);
  const [whiteBorderSize, setWhiteBorderSize] = useState(2);

  const handleFilePondChange = (items: FilePondFile[]) => {
    setFiles(items.map((item) => item.file));
  };

  const handleTinyFilePondChange = (items: FilePondFile[]) => {
    setTinyFiles(items.map((item) => item.file));
  };

  const handleNavigateToPrint = () => {
    const params = new URLSearchParams({
      imageSize: String(imageSize),
      blackBorderSize: String(blackBorderSize),
      whiteBorderSize: String(whiteBorderSize),
      files: JSON.stringify(files.map((file) => URL.createObjectURL(file))),
      tinyFiles: JSON.stringify(
        tinyFiles.map((file) => URL.createObjectURL(file)),
      ),
    });
    router.push(`/sticker-map/print?${params.toString()}`);
  };

  return (
    <main className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-center gap-10 px-2 pt-10 pb-24 sm:pb-40">
      <div className="border-b-border-base mx-auto flex flex-col gap-10 border-b pb-10 md:flex-row">
        <FilePond
          acceptedFileTypes={["img/png", "img/jpg", "img/jpeg"]}
          allowMultiple={true}
          className="w-[400px]"
          files={files}
          labelIdle="Drag & Drop your main image files"
          name="main-image"
          onupdatefiles={handleFilePondChange}
        />
        <FilePond
          acceptedFileTypes={["img/png", "img/jpg", "img/jpeg"]}
          allowMultiple={true}
          className="w-[400px]"
          files={tinyFiles}
          labelIdle="Drag & Drop your tiny image files"
          name="tiny-image"
          onupdatefiles={handleTinyFilePondChange}
        />
        <div className="border-border-base flex h-fit flex-col gap-2 rounded-md border p-4">
          <Input
            contentProps={{
              className: "max-w-[220px]",
            }}
            id="image-size"
            label="Image Size"
            min={0}
            placeholder="in mm"
            rightContent={<span className="text-text-em-mid">mm</span>}
            type="number"
            value={imageSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setImageSize(e.target.valueAsNumber)}
          />
          <Input
            contentProps={{
              className: "max-w-[220px]",
            }}
            id="black-border-size"
            label="Black Border Size"
            min={0}
            placeholder="in mm"
            rightContent={<span className="text-text-em-mid">x2 mm</span>}
            type="number"
            value={blackBorderSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setBlackBorderSize(e.target.valueAsNumber)}
          />
          <Input
            contentProps={{
              className: "max-w-[220px]",
            }}
            id="white-border-size"
            label="White Border Size"
            min={0}
            placeholder="in mm"
            rightContent={<span className="text-text-em-mid">x2 mm</span>}
            type="number"
            value={whiteBorderSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setWhiteBorderSize(e.target.valueAsNumber)}
          />
          <div className="flex items-end justify-between pt-2 pl-1">
            <span className="text-text-em-high font-mono font-medium">{`LENGTH ${imageSize}mm (${Math.round((imageSize / 25.4) * 100) / 100}inch)`}</span>
            <span className="text-text-em-mid font-mono text-xs">
              25.4mm/inch
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 rounded-md bg-white/10 p-10">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="border-white"
              style={{
                boxSizing: "border-box",
                height: `${imageSize}mm`,
                width: `${imageSize}mm`,
                borderWidth: `${whiteBorderSize}mm`,
              }}
            >
              <img
                alt={`sticker-${index}`}
                className={cn("box-border border-black object-cover")}
                src={URL.createObjectURL(file)}
                style={{ borderWidth: `${blackBorderSize}mm` }}
              />
            </div>
          ))
        ) : (
          <div className="text-text-em-mid flex flex-col items-center gap-2">
            <Icon
              className="h-8 w-8"
              height={32}
              icon="lucide:squirrel"
              width={32}
            />
            <span>There is no image yet!</span>
          </div>
        )}
      </div>
      <div className="grow" />
      <div>
        <Button onClick={handleNavigateToPrint}>Go to print page</Button>
      </div>
    </main>
  );
};

StickerMap.layout = ({ children }: PropsWithChildren) => (
  <div className="relative">
    {children}
    <Footer />
  </div>
);

export default StickerMap;
