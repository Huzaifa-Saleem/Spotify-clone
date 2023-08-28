import { ISongs } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<ISongs[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionsData, error: sessionsError } =
    await supabase.auth.getSession();

  if (sessionsError) {
    console.log(sessionsError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionsData?.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsByUserId;
