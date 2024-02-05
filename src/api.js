const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
}
export async function getPostsByUsername(username) {
  const response = await fetch(`${BASE_URL}/posts?username=${username}`);
  return await response.json();
}

export async function occurError() {
  throw new Error("에러 발생");
}

export async function uploadPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("업로드 실패");
  }

  return await response.json();
}
