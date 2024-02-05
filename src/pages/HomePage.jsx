import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, occurError } from "../api";

function HomePage() {
  const {
    data: postData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000 * 10,
  });

  if (isPending) return <h1>로딩 중</h1>;

  if (isError) return <h1>에러 발생</h1>;

  const posts = postData?.results ?? [];

  console.log(posts);

  // const username = 'codeit'; // 임의로 username을 지정
  // const { data: postsDataByUsername } = useQuery({
  //   queryKey: ['posts', username],
  //   queryFn: () => getPostsByUsername(username),
  // });

  return (
    <div>
      <h1>홈페이지</h1>
    </div>
  );
}

export default HomePage;
