"use client";
import React, { useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
// @ts-ignore
import useSound from "use-sound";

import { ISongs } from "@/types";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";

interface Props {
  song: ISongs;
  songUrl: string;
}

const PlayerContent: React.FC<Props> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = React.useState<number>(1);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  // icons
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.indexOf(player.activeId);
    const nextIndex = player.ids[currentIndex + 1];

    if (!nextIndex) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextIndex);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.indexOf(player.activeId);
    const previousIndex = player.ids[currentIndex - 1];

    if (!previousIndex) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousIndex);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onend: () => onPlayNext(),
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div
        className="
        flex
        w-full
        justify-start
    "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>

      {/* Mobile View */}
      <div
        className="
                flex
                md:hidden
                col-auto 
                w-full
                justify-end
                items-center
            "
      >
        <div
          onClick={handlePlay}
          className="
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-full
                bg-white
                p-1 
                cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="
                hidden
                md:flex
                h-full
                justify-center
                items-center
                w-full
                max-w-[772px]
                gap-x-6
            "
      >
        <AiFillStepBackward
          onclick={onPlayPrevious}
          size={30}
          className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition
                    "
        />
        <div
          onClick={handlePlay}
          className="
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    p-1 
                    cursor-pointer
                "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onclick={onPlayNext}
          size={30}
          className="
                    text-neutral-400
                    cursor-pointer
                    hover:text-white
                    transition
                    "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
