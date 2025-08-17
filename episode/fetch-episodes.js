const fs = require("fs");

const url = "https://rickandmortyapi.com/graphql";
const episodeIds = [1, 2, 3, 4];

async function fetchEpisode(id) {
  const query = fs.readFileSync(`episode-page-${id}.graphql`, "utf8");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  fs.writeFileSync(`characters-page-${id}-output.json`, JSON.stringify(data, null, 2));
  console.log(`Saved episode-id-${id}-output.json`);
}

async function main() {
  for (const id of episodeIds) {
    await fetchEpisode(id);
  }
}

main();
