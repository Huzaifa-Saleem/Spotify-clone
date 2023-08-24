"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<Props> = ({ children, className }) => {
  const router = useRouter();

  const HandleLogout = () => {
    console.log("logout");
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
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium">
                Sign Up
              </Button>
            </div>
            <div>
              <Button className="bg-white px-6 py-2">Log in</Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
