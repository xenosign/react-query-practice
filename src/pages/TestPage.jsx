import React from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPages, getTest } from "../newApi";

export default function TestPage() {
  const queryClient = useQueryClient();

  const {
    data: result,
    isPending,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["test"],
    queryFn: () => getPages(1, 2),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 10,
    placeholderData: keepPreviousData,
  });

  console.log(result);

  return <div>TestPage</div>;
}
