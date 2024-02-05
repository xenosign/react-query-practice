import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, occurError, uploadPost } from "../api";
import { useState } from "react";

function HomePage() {
  const queryClient = useQueryClient();

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

  const [content, setContent] = useState("");
  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { username: "codeit", content };

    uploadPostMutation.mutate(newPost, {
      onSuccess: () => {
        alert("포스트가 성공적으로 업로드 되었습니다!");
      },
    });

    setContent("");
    queryClient.invalidateQueries();
  };

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
      <form onSubmit={handleSubmit}>
        <input name="content" value={content} onChange={handleInputChange} />
        <button
          disabled={uploadPostMutation.isPending || !content}
          type="submit"
        >
          업로드
        </button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.user.name}: {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
