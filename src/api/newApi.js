const BASE_URL = "http://localhost:4000";

export async function getTest() {
  const response = await fetch(`${BASE_URL}/test`);
  const result = await response.json();
  return result;
}

export async function getPages(page, limit) {
  const response = await fetch(`${BASE_URL}/pages/${page}/${limit}`);
  const result = await response.json();
  return result;
}
