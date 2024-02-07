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

  const [teamName, setTeamName] = useState('t1');
  const [render, setRender] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['team', teamName],
    queryFn: () => getPlayer(teamName),   
    placeholderData: keepPreviousData,    
  });  

  if (isLoading) return <h1>로딩중</h1>;

  if (isError) return <h1>에러 발생</h1>;

  const players = data ?? [];

  return (
    <div>
      <ul>
        <h1>{teamName}</h1>
        {players.map((player) => {
          return <li key={player.id}>ID : {player.name} / 포지션 : {player.position}</li>
        })}
      </ul>          
      <button onClick={() => setTeamName('t1')}>T1</button>
      <button onClick={() => setTeamName('kt')}>KT</button>
      <button onClick={() => setRender(prev => !prev)}>리렌더</button>
    </div>
  )
}
