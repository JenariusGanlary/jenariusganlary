const KEY = "d57a05759ee544d4be6afa531dc1d30a";
const HOST = "jenariusganlary.com";

async function pingIndexNow() {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: [
        `https://${HOST}/sitemap.xml`,
      ],
    }),
  });
  console.log("IndexNow ping status:", res.status);
}

pingIndexNow();