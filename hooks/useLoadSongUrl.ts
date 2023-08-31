import { ISongs } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: ISongs) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return "";

  const { data } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song?.song_path);

  return data.publicUrl;
};

export default useLoadSongUrl;
