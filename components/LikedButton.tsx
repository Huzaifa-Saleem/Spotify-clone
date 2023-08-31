"use client";

import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface Props {
  songId: string;
}

const LikedButton: React.FC<Props> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkLiked = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setLiked(true);
      }
    };

    checkLiked();
  }, [liked, user, supabaseClient, songId]);

  const Icon = liked ? AiFillHeart : AiOutlineHeart;

  const handleClick = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (liked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error("Something went wrong");
      } else {
        setLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert([
        {
          user_id: user.id,
          song_id: songId,
        },
      ]);
      if (error) {
        toast.error("Something went wrong");
      } else {
        toast.success("Liked");
        setLiked(true);
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        hover:opacity-80
        transition-opacity
        "
      onClick={handleClick}
    >
      <Icon color={liked ? "#22c55e" : "#ffffff"} size={25} />
    </button>
  );
};

export default LikedButton;
