const BASE_URL = "http://localhost:4000";

export async function getPlayer(teamName) {
  const url = `${BASE_URL}/players${teamName ? "?team=" + teamName : ""}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function addPlayer(teamName, newPlayer) {
  const response = await fetch(`${BASE_URL}/add?teamName=${teamName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });

  if (!response.ok) {
    throw new Error("업로드 실패");
  }

  return await response.json();
}

export async function getArr(page, length) {
  const url = `${BASE_URL}/infi/${page}/${length}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
