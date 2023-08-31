"use client";

import React from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import Input from "./Input";

interface Props {}

const SearchInput = () => {
  const [value, setValue] = React.useState<string>("");

  const debouncedValue = useDebounce<string>(value, 500);
  const router = useRouter();

  React.useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="Search for songs"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
