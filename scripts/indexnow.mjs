// Pings IndexNow (used by Bing, Yandex, and others) whenever you publish or
// update content, so those engines can crawl it faster instead of waiting
// for their normal schedule. Run with: npm run indexnow
//
// Docs: https://www.indexnow.org/documentation

import fs from "fs";
import path from "path";

const KEY = "d57a05759ee544d4be6afa531dc1d30a";
const HOST = "www.jenariusganlary.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function getPostSlugs() {
  const postsDir = path.join(process.cwd(), "posts");
  return fs.readdirSync(postsDir).map((filename) => filename.replace(/\.md$/, ""));
}

function buildUrlList() {
  const staticPages = ["", "/blog", "/about", "/contact", "/resources", "/newsletter"];
  const postUrls = getPostSlugs().map((slug) => `/blog/${slug}`);
  return [...staticPages, ...postUrls].map((p) => `https://${HOST}${p}`);
}

async function pingIndexNow() {
  const urlList = buildUrlList();

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  let res;
  try {
    res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });
  } catch (err) {
    console.error("Network error reaching IndexNow API:", err.message);
    process.exitCode = 1;
    return;
  }

  const bodyText = await res.text();

  console.log("Status:", res.status, res.statusText);
  if (bodyText) console.log("Response body:", bodyText);

  // IndexNow status codes, per their docs:
  // 200 = OK, 202 = Accepted (key not yet validated, will retry), 400 = bad request,
  // 403 = key not valid / key file mismatch, 422 = URLs don't belong to host / key mismatch,
  // 429 = too many requests
  if (res.status === 200 || res.status === 202) {
    console.log("Success — IndexNow accepted the submission.");
  } else if (res.status === 403 || res.status === 422) {
    console.error(
      `Failed: this usually means the key file at ${KEY_LOCATION} doesn't match, isn't reachable yet, or the site hasn't been deployed since it was added. Check that URL loads in a browser and returns exactly "${KEY}".`
    );
    process.exitCode = 1;
  } else {
    console.error("Failed — see status/body above for details.");
    process.exitCode = 1;
  }
}

pingIndexNow();