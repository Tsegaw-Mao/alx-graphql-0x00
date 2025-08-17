const fs = require("fs");

const url = "https://rickandmortyapi.com/graphql";

// --- Individual character IDs ---
const characterIds = [1, 2, 3, 4];

// --- Paginated character pages ---
const characterPages = [1, 2, 3, 4];

// --- Episode IDs ---
const episodeIds = [1, 2, 3, 4];

// --- Fetch individual character by ID ---
async function fetchCharacter(id) {
  const query = `
    query {
      character(id: ${id}) {
        id
        name
        status
        species
        type
        gender
      }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  fs.writeFileSync(`character-id-${id}-output.json`, JSON.stringify(data, null, 2));
  console.log(`Saved character-id-${id}-output.json`);
}

// --- Fetch paginated characters ---
async function fetchCharacterPage(page) {
  const query = `
    query {
      characters(page: ${page}) {
        results {
          id
          name
          status
          image
        }
      }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  fs.writeFileSync(`characters-page-${page}-output.json`, JSON.stringify(data, null, 2));
  console.log(`Saved characters-page-${page}-output.json`);
}

// --- Fetch episode by ID ---
async function fetchEpisode(id) {
  const query = `
    query {
      episode(id: ${id}) {
        id
        name
        air_date
        episode
      }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  fs.writeFileSync(`characters-page-${id}-output.json`, JSON.stringify(data, null, 2));
  console.log(`Saved episode-id-${id}-output.json`);
}

// --- Main function to run all fetches ---
async function main() {
  console.log("Fetching individual characters...");
  for (const id of characterIds) {
    await fetchCharacter(id);
  }

  console.log("\nFetching paginated character lists...");
  for (const page of characterPages) {
    await fetchCharacterPage(page);
  }

  console.log("\nFetching episodes...");
  for (const id of episodeIds) {
    await fetchEpisode(id);
  }

  console.log("\nAll data fetched successfully!");
}

main();
