const BASE_URL = "http://localhost:4000";

export async function getPlayer(teamName) {
  const url = `${BASE_URL}/players${teamName ? '?team=' + teamName : ''}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}