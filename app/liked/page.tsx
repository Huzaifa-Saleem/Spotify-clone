import getLikedSongs from "@/actionns/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();
  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        w-full
        h-full
        overflow-y-auto 
        overflow-x-hidden
        "
    >
      <Header>
        <div className="mt-20">
          <div
            className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-x-5
                    "
          >
            <div
              className="
                    relative
                    h-32
                    w-32
                    md:h-44
                    md:w-44
                    "
            >
              <Image
                src="/images/liked.png"
                layout="fill"
                objectFit="contain"
                alt="Liked Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1
                className="
                        text-white
                        text-4xl
                        sm:text-5xl
                        md:text-7xl
                        font-bold
                        "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
