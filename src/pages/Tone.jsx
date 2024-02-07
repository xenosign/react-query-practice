import React from 'react';
import { useEffect, useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getPlayer } from '../api/toneAPi';

export default function Tone() {
  const queryClient = useQueryClient();

  const {
    data: playerData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['t1'],
    queryFn: () => getPlayer(),    
  });  

  if (isPending) return <h1>로딩중</h1>;

  if (isError) return <h1>에러 발생</h1>;

  const players = playerData?.member ?? [];

  return (
    <div>
      <ul>
        {players.map((player) => {
          return <li key={player.id}>ID : {player.name} / 포지션 : {player.position}</li>
        })}
      </ul>
    </div>
  )
}
