import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "../api";

function HomePage() {
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 10,
  });
  console.log("result", result);

  const username = 'codeit'; // 임의로 username을 지정
  const { data: postsDataByUsername } = useQuery({
    queryKey: ['posts', username],
    queryFn: () => getPostsByUsername(username),
  });

  console.log("postsDataByUsername", postsDataByUsername);

  return (
    <div>
      <h1>홈페이지</h1>
    </div>
  );
}

export default HomePage;
