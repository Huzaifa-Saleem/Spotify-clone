"use client";
import { ISongs } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";
import useOnPlay from "@/hooks/useOnPlay";

interface Props {
  songs: ISongs[];
}

const SearchContent: React.FC<Props> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 px-6 w-full text-neutral-400">
        No results found
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => {
        return (
          <div key={song.id}>
            <div className="flex items-center gap-x-4 w-full">
              <div className="flex-1">
                <MediaItem
                  data={song}
                  key={song.id}
                  onClick={(id: string) => onPlay(id)}
                />
              </div>
              <LikedButton songId={song.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchContent;
