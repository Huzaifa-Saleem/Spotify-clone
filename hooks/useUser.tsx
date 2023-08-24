import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

import { ISubscription, IUserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type IUserContext = {
  user: User | null;
  accessToken: string | null;
  userDetail: IUserDetails | null;
  isLoading: boolean;
  subscription: ISubscription | null;
};

export const UserContext = createContext<IUserContext | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;

  // states
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [userDetail, setUserDetail] = useState<IUserDetails | null>(null);
  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  // functions
  const getUserDetail = () => supabase?.from("users").select("*").single();
  const getSubscription = () =>
    supabase
      ?.from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  // effects
  useEffect(() => {
    if (user && !isLoadingData && !userDetail && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetail(), getSubscription()]).then(
        (results) => {
          const userDetailPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailPromise.status === "fulfilled") {
            setUserDetail(userDetailPromise.value.data as IUserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as ISubscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetail(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    user,
    accessToken,
    userDetail,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
