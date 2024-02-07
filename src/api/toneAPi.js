const BASE_URL = "http://localhost:4000";

export async function getPlayer() {
  const response = await fetch(`${BASE_URL}/player`);
  const result = await response.json();
  console.log(result);
  return result;
}