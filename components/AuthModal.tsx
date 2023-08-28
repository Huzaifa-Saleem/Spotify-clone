"use client";

import { useEffect } from "react";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";

//
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Log in to your account to continue"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={["google", "github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
