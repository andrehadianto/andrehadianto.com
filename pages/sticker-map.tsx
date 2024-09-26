import { type FilePondFile } from "filepond";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { FilePond } from "react-filepond";

import { Icon } from "@/common/components/CustomIcon";
import { Footer } from "@/common/components/Footer";
import { Input } from "@/common/components/Input";
import { cn } from "@/common/functions";

import "filepond/dist/filepond.min.css";

export const StickerMap = () => {
  const [files, setFiles] = useState<Blob[]>([]);

  const [imageSize, setImageSize] = useState(300);
  const [blackBorderSize, setBlackBorderSize] = useState(4);
  const [whiteBorderSize, setWhiteBorderSize] = useState(8);

  const handleFilePondChange = (items: FilePondFile[]) => {
    setFiles(items.map((item) => item.file));
  };

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 pb-24 pt-10 sm:pb-40">
      <div className="mx-auto flex gap-10 border-b border-b-border-base pb-10">
        <FilePond
          acceptedFileTypes={["img/png", "img/jpg", "img/jpeg"]}
          allowMultiple={true}
          className="w-[400px]"
          files={files}
          onupdatefiles={handleFilePondChange}
        />
        <div className="flex h-fit flex-col gap-2 rounded-md border border-border-base p-4">
          <Input
            id="image-size"
            label="Image Size"
            placeholder="in px"
            rightContent={<span className="text-text-em-mid">px</span>}
            type="number"
            value={imageSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setImageSize(e.target.valueAsNumber)}
          />
          <Input
            id="black-border-size"
            label="Black Border Size"
            placeholder="in px"
            rightContent={<span className="text-text-em-mid">px</span>}
            type="number"
            value={blackBorderSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setBlackBorderSize(e.target.valueAsNumber)}
          />
          <Input
            id="white-border-size"
            label="White Border Size"
            placeholder="in px"
            rightContent={<span className="text-text-em-mid">px</span>}
            type="number"
            value={whiteBorderSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setWhiteBorderSize(e.target.valueAsNumber)}
          />
          <div className="flex items-end justify-between pl-1 pt-2">
            <span className="font-mono font-medium text-text-em-high">{`TOTAL ${imageSize + blackBorderSize + whiteBorderSize}px (${(imageSize + blackBorderSize + whiteBorderSize) / 300}inch)`}</span>
            <span className="font-mono text-xs text-text-em-mid">300dpi</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-10 rounded-md bg-white/10 p-10">
        {files.length > 0 ? (
          files.map((file, index) => {
            return (
              <div
                key={index}
                className={cn("h-full border-black outline outline-white", {})}
                style={{
                  borderWidth: blackBorderSize,
                  outlineWidth: whiteBorderSize,
                }}
              >
                <Image
                  alt={`sticker-${index}`}
                  className={cn("object-cover", {})}
                  height={imageSize}
                  src={URL.createObjectURL(file)}
                  width={imageSize}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-em-mid">
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
