"use client";

import { ISongs } from "@/types";
import SongItem from "./SongItem";

interface Props {
  songs: ISongs[];
}

const PageContent: React.FC<Props> = ({ songs }) => {
  if (songs.length === 0)
    return (
      <div className="flex w-full h-full">
        <div className="text-white">No songs found!</div>
      </div>
    );

  return (
    <div
      className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4
  "
    >
      {songs.map((item) => (
        <SongItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
