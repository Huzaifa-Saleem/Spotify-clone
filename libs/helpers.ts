import { IPrice } from "@/types";

export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return url;
};

interface IPostData {
  url: string;
  data?: {
    price: IPrice;
  };
}

export const postData = async ({ url, data }: IPostData) => {
  console.log("postData", url, data);

  const response = await fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      credentials: "same-origin",
      body: JSON.stringify(data),
    }),
  });

  if (!response.ok) {
    console.log("response", response);
    throw new Error(response.statusText);
  }

  return response.json();
};

export const toDateTime = (secs: number) => {
  const t = new Date("1970-01-01T00:30:00Z");
  t.setSeconds(secs);
  return t;
};
