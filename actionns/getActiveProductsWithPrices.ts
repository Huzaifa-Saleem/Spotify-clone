import { IPrice, IProduct } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface ProductWithPrice extends IProduct {
  prices?: IPrice[];
}
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getActiveProductsWithPrices;
