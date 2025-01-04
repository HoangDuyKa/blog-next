"use client";
import Tables from "@/components/Table";
import useSWR from "swr";

const Blogs = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) return <div>loading...</div>;

  return <Tables blogs={data?.sort((a: any, b: any) => b.id - a.id)} />;
};

export default Blogs;
