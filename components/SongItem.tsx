"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { ISongs } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface Props {
  data: ISongs;
  onClick: (id: string) => void;
}

const SongItem: React.FC<Props> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative
        group
        cursor-pointer
        flex    
        flex-col
        items-center
        justify-center
        rounded-md
        bg-neutral-400/5
        overflow-hidden
        gap-x-4
        hover:bg-neutral-400/10
        transition
        p-3
    "
    >
      <div
        className="
            relative
            aspect-square
            w-full
            h-full
            rounded-md
            overflow-hidden
        "
      >
        <Image
          src={imagePath || "/images/liked.png"}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={data.title}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-2">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p
          className="
            text-neutral-400
            text-sm
            pb-4
            w-full
            truncate
        "
        >
          {data.author}
        </p>
      </div>
      <div
        className="
        absolute
        bottom-24
        right-5
      "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
