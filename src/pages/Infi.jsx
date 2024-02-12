import { useEffect, useRef, useState } from "react";

// React Query
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getArr } from "../api/toneAPi";

export default function Infi() {
  const { data, isLoading, isError, isPlaceholderData } = useInfiniteQuery({
    queryKey: ["pages"],
    queryFn: ({ pageParam }) => {
      return getArr(pageParam, 5);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log("lastPage", lastPage);
      console.log("lastPageParam", lastPageParam);
      console.log("allPages", allPages);
      console.log("allPages", allPageParams);
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });

  console.log(data);

  // https://oliveyoung.tech/blog/2023-10-04/useInfiniteQuery-scroll/

  const pages = data?.pages[0] ?? [];

  return (
    <div>
      <ul>
        {pages?.map((page, idx) => {
          return <li key={idx}>{page}</li>;
        })}
      </ul>
    </div>
  );
}
