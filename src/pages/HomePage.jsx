import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";

function HomePage() {
  const result = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  let posts = [];

  if (result.data) posts = result.data.results;

  console.log(posts);

  return (
    <div>
      <h1>홈페이지</h1>
      {posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
}

export default HomePage;
