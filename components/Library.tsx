import React from "react";

// icons
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { ISongs } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

const Library = ({ songs }: { songs: ISongs[] }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="
            flex
            items-center
            justify-between
            px-5 
            py-4"
      >
        <div
          className="
            inline-flex 
            items-center 
            gap-x-2"
        >
          {/* icon */}
          <TbPlaylist size={26} className="text-neutral-400" />

          <p
            className="
                text-neutral-400
                font-medium
                text-md
          "
          >
            Your Library
          </p>
        </div>
        <AiOutlinePlus
          size={20}
          onClick={onClick}
          className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
                "
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
