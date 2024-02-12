import { useEffect, useRef, useState } from "react";

// React Query
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

// API
import { addPlayer, getPlayer } from "../api/toneAPi";

export default function Tone() {
  const queryClient = useQueryClient();

  const [teamName, setTeamName] = useState("t1");
  const [newPlayer, setNewPlayer] = useState({});

  const inputRef = useRef();

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["team", teamName],
    queryFn: () => getPlayer(teamName),
    placeholderData: keepPreviousData,
  });

  // const { data, isLoading, isError, isPlaceholderData } = useInfiniteQuery({
  //   queryKey: ["team", teamName],
  //   queryFn: ({ pageParam }) => {
  //     console.log("pageParam", pageParam);
  //     return getPlayer(teamName);
  //   },
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
  //     return lastPage.hasMore ? lastPageParam + 1 : undefined;
  //   },
  // });

  const addPlayerMutation = useMutation({
    mutationFn: (newPlayer) => {
      addPlayer(teamName, newPlayer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team", teamName] });
    },
  });

  useEffect(() => {
    if (teamName === "t1") {
      queryClient.prefetchQuery({
        queryKey: ["team", "kt"],
        queryFn: () => getPlayer("kt"),
      });
    }
  }, [teamName, queryClient]);

  const handleAddPlayer = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: inputRef.current?.value,
      position: "SUB",
    };

    addPlayerMutation.mutate(newPlayer, {
      onSuccess: () => alert("선수 등록 성공"),
      onError: () => alert("선수 등록 실패"),
    });

    inputRef.current.value = "";
    queryClient.invalidateQueries();
  };

  if (isLoading) return <h1>로딩중</h1>;

  if (isError) return <h1>에러 발생</h1>;

  const players = data ?? [];

  return (
    <div>
      <div>
        <h1>{teamName}</h1>
        <button disabled={isPlaceholderData} onClick={() => setTeamName("t1")}>
          T1
        </button>
        <button disabled={isPlaceholderData} onClick={() => setTeamName("kt")}>
          KT
        </button>
        <ul>
          {players?.map((player, idx) => {
            return (
              <li key={idx}>
                ID : {player.name} / 포지션 : {player.position}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>선수 추가</h2>
        <input type="text" ref={inputRef} />
        <button onClick={handleAddPlayer}>추가하기</button>
      </div>
    </div>
  );
}
