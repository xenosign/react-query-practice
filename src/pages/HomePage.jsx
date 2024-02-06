import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  getPosts,
  getPostsByUsername,
  occurError,
  uploadPost,
  getUserInfo,
} from "../api";
import { useEffect, useState } from "react";

function HomePage() {
  const queryClient = useQueryClient();

  const [currentUsername, setCurrentUsername] = useState("");

  const [page, setPage] = useState(0);
  const PAGE_LIMIT = 3;

  // const {
  //   data: postsData,
  //   isPending,
  //   isError,
  //   isPlaceholderData,
  // } = useQuery({
  //   queryKey: ["posts", page],
  //   queryFn: () => getPosts(page, PAGE_LIMIT),
  //   staleTime: 60 * 1000,
  //   gcTime: 60 * 1000 * 10,
  //   placeholderData: keepPreviousData,
  // });

  const {
    data: postsData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam, PAGE_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log("allPages", allPages);
      console.log("allPageParams", allPageParams);
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });

  // useEffect(() => {
  //   if (!isPlaceholderData && postsData?.hasMore) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["posts", page + 1],
  //       queryFn: () => getPosts(page + 1, PAGE_LIMIT),
  //     });
  //   }
  // }, [isPlaceholderData, postsData, queryClient, page]);

  const { data: userInfoData, isPending: isUserInfoPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(currentUsername),
    enabled: !!currentUsername,
  });

  const handleLoginButtonClick = () => {
    setCurrentUsername("codeit");
  };

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

  const loginMessage = isUserInfoPending
    ? "로그인 중입니다..."
    : `${userInfoData?.name}님 환영합니다!`;

  if (isPending) return <h1>로딩 중</h1>;

  if (isError) return <h1>에러 발생</h1>;

  // console.log(postsData);

  // const posts = postsData?.results ?? [];

  const postsPages = postsData?.pages ?? [];

  // const username = 'codeit'; // 임의로 username을 지정
  // const { data: postsDataByUsername } = useQuery({
  //   queryKey: ['posts', username],
  //   queryFn: () => getPostsByUsername(username),
  // });

  return (
    <div>
      {currentUsername ? (
        loginMessage
      ) : (
        <button onClick={handleLoginButtonClick}>codeit으로 로그인</button>
      )}
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
        {postsPages.map((postPages) =>
          postPages.results.map((post) => (
            <li key={post.id}>
              {post.user?.name}: {post.content}
            </li>
          ))
        )}
      </ul>
      {/* <div>
        <button
          disabled={page === 0 || isPlaceholderData}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          &lt;
        </button>
        <button
          disabled={!postsData?.hasMore || isPlaceholderData}
          onClick={() => setPage((old) => old + 1)}
        >
          &gt;
        </button>
      </div> */}
      <div>
        <button
          onClick={fetchNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          더 불러오기
        </button>
      </div>
    </div>
  );
}

export default HomePage;
