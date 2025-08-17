const fs = require("fs");

const url = "https://rickandmortyapi.com/graphql";
const pages = [1, 2, 3, 4];

async function fetchPage(page) {
  const query = fs.readFileSync(`characters-page-${page}.graphql`, "utf8");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  fs.writeFileSync(`characters-page-${page}-output.json`, JSON.stringify(data, null, 2));
  console.log(`Saved characters-page-${page}-output.json`);
}

async function main() {
  for (const page of pages) {
    await fetchPage(page);
  }
}

main();
