#!/usr/bin/env node
/* push-via-api.mjs — Git Data API 整树推送（blobs→tree→commit→ref）
 * 适用：github.com 直连被阻断、但 api.github.com 可用（如本机网络）。
 * 用法：node tools/push-via-api.mjs <目录> <owner/repo> <branch> <token>
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.argv[2] || ".");
const REPO = process.argv[3];
const BRANCH = process.argv[4];
const TOKEN = process.argv[5];
if (!REPO || !BRANCH || !TOKEN) { console.error("用法: node push-via-api.mjs <dir> <owner/repo> <branch> <token>"); process.exit(1); }

const H = { Authorization: "Bearer " + TOKEN, Accept: "application/vnd.github+json", "User-Agent": "api-push" };
async function api(method, url, body) {
  const res = await fetch("https://api.github.com" + url, { method, headers: H, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) { const t = await res.text(); throw new Error(method + " " + url + " -> " + res.status + ": " + t.slice(0, 220)); }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("json") ? res.json() : res.text();
}

/* ------ 遍历 ------ */
function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push({ rel: path.relative(ROOT, p).split(path.sep).join("/"), abs: p });
  }
  return out;
}
const skip = /^(repo-state\.json|assets\/data\.bak\.js|tools\/\.ghtoken\.tmp)$/;
const files = walk(ROOT).filter((f) => !skip.test(f.rel));
console.log("待推送:", files.length, "个文件");

/* ------ blobs（全部 base64） ------ */
const treeItems = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const b = await api("POST", "/repos/" + REPO + "/git/blobs", {
    content: fs.readFileSync(f.abs).toString("base64"),
    encoding: "base64",
  });
  treeItems.push({ path: f.rel, mode: "100644", type: "blob", sha: b.sha });
  if ((i + 1) % 8 === 0) console.log("  blob", (i + 1) + "/" + files.length);
}
console.log("blobs 完成");

/* ------ 树（含原有 README 等文件的 tree sha 锚定） ------ */
let baseTreeSha = null;
try {
  const branch = await api("GET", "/repos/" + REPO + "/git/ref/heads/" + BRANCH);
  const commitObj = await api("GET", "/repos/" + REPO + "/git/commits/" + branch.object.sha);
  baseTreeSha = commitObj.tree.sha;
  console.log("base tree:", baseTreeSha.slice(0, 8));
} catch { console.log("无 base 树（全新仓库也可以）"); }

const tree = await api("POST", "/repos/" + REPO + "/git/trees", { base_tree: baseTreeSha || undefined, tree: treeItems });
console.log("tree:", tree.sha.slice(0, 8));

/* ------ commit & ref ------ */
const now = new Date().toISOString();
const commit = await api("POST", "/repos/" + REPO + "/git/commits", {
  message: "feat: BCI 进度看板（自动同步管线）",
  tree: tree.sha,
  author: { name: "bci-sync-bot", email: "actions@users.noreply.github.com", date: now },
  committer: { name: "bci-sync-bot", email: "actions@users.noreply.github.com", date: now },
});
console.log("commit:", commit.sha.slice(0, 7));
if (baseTreeSha) {
  await api("PATCH", "/repos/" + REPO + "/git/refs/heads/" + BRANCH, { sha: commit.sha, force: true });
} else {
  try { await api("PATCH", "/repos/" + REPO + "/git/refs/heads/" + BRANCH, { sha: commit.sha, force: true }); }
  catch { await api("POST", "/repos/" + REPO + "/git/refs", { ref: "refs/heads/" + BRANCH, sha: commit.sha }); }
}
console.log("✓ refs/heads/" + BRANCH + " -> " + commit.sha.slice(0, 7));
