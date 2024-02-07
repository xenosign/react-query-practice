import React from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPages, getTest } from "../api/newApi";

export default function TestPage() {
  const queryClient = useQueryClient();

  const results = useInfiniteQuery({
    queryKey: ["pages"],
    queryFn: ({ pageParam }) => getPages(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log("allPages", allPages);
      console.log("allPageParams", allPageParams);
      console.log("lastPage", lastPage);
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });

  console.log(results);

  if (results.isPending) return <h1>로딩중</h1>;

  if (results.isError) return <h1>에러 발생</h1>;

  return <div>TestPage</div>;
}
