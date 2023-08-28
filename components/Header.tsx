"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<Props> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const HandleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logout Successfully");
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div
        className="w-full mb-4 flex items-center justify-between
    "
      >
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => {
              router.back();
            }}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-70
            transition
          "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-80
            transition
          "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => {}}
            className="
                rounded-full
                bg-white
                p-2
                flex
                items-center
                justify-center
                hover:opacity-70
                transition
                "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => {}}
            className="
                rounded-full
                bg-white
                p-2
                flex
                items-center
                justify-center
                hover:opacity-70
                transition
                "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="flex gap-x-4 justify-center
         items-center"
        >
          {user ? (
            <div
              className="
              flex
              gap-x-4
              items-center
            "
            >
              <Button className="bg-white px-6 py-2" onClick={HandleLogout}>
                Logout
              </Button>
              <Button
                onClick={() => {
                  router.push("account");
                }}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium hover:text-white"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
