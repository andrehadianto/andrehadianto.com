/* eslint-disable @next/next/no-img-element */
import { type FilePondFile } from "filepond";
import { PropsWithChildren, useState } from "react";
import { FilePond } from "react-filepond";

import { Icon } from "@/common/components/CustomIcon";
import { Footer } from "@/common/components/Footer";
import { Input } from "@/common/components/Input";
import { cn } from "@/common/functions";

import "filepond/dist/filepond.min.css";

export const StickerMap = () => {
  const [files, setFiles] = useState<Blob[]>([]);

  const [imageSize, setImageSize] = useState(46);
  const [blackBorderSize, setBlackBorderSize] = useState(1);
  const [whiteBorderSize, setWhiteBorderSize] = useState(2);

  const handleFilePondChange = (items: FilePondFile[]) => {
    setFiles(items.map((item) => item.file));
  };

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-2 pb-24 pt-10 sm:pb-40">
      <div className="mx-auto flex flex-col gap-10 border-b border-b-border-base pb-10 md:flex-row">
        <FilePond
          acceptedFileTypes={["img/png", "img/jpg", "img/jpeg"]}
          allowMultiple={true}
          className="w-[400px]"
          files={files}
          onupdatefiles={handleFilePondChange}
        />
        <div className="flex h-fit flex-col gap-2 rounded-md border border-border-base p-4">
          <Input
            contentProps={{
              className: "max-w-[220px]",
            }}
            id="image-size"
            label="Image Size"
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
            placeholder="in mm"
            rightContent={<span className="text-text-em-mid">x2 mm</span>}
            type="number"
            value={whiteBorderSize}
            wrapperProps={{ orientation: "horizontal" }}
            onChange={(e) => setWhiteBorderSize(e.target.valueAsNumber)}
          />
          <div className="flex items-end justify-between pl-1 pt-2">
            <span className="font-mono font-medium text-text-em-high">{`LENGTH ${imageSize + blackBorderSize * 2 + whiteBorderSize * 2}mm (${Math.round(((imageSize + blackBorderSize * 2 + whiteBorderSize * 2) / 25.4) * 100) / 100}inch)`}</span>
            <span className="font-mono text-xs text-text-em-mid">
              25.4mm/inch
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10 rounded-md bg-white/10 p-10">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index}>
              <img
                alt={`sticker-${index}`}
                className={cn(
                  "border-black object-cover outline outline-white",
                )}
                src={URL.createObjectURL(file)}
                style={{
                  borderWidth: `${blackBorderSize}mm`,
                  outlineWidth: `${whiteBorderSize}mm`,
                  height: `${imageSize}mm`,
                  width: `${imageSize}mm`,
                }}
              />
            </div>
          ))
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
