#!/usr/bin/env node
/**
 * fetch-repo-state.mjs — 从 GitHub API 拉取仓库当前状态，生成 repo-state.json，
 * 供 build-data.mjs 合并进 data.js 实现站点自动更新。
 *
 * 用法：
 *   node tools/fetch-repo-state.mjs MoYeRanqianzhi/BCI
 *   node tools/fetch-repo-state.mjs MoYeRanqianzhi/BCI --token=ghp_xxx --out=repo-state.json
 *
 * Token 优先级：--token= > GH_TOKEN/GITHUB_TOKEN 环境变量 > 本地 gh 登录 > 匿名（仅公开仓库）。
 * 私有仓库必须提供有 contents:read 权限的 token。
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const repo = process.argv[2];
if (!repo) { console.error("用法: node tools/fetch-repo-state.mjs <owner/repo> [--token=xxx] [--out=path]"); process.exit(1); }

let token = "";
const argToken = process.argv.find((a) => a.startsWith("--token="));
if (argToken) token = argToken.slice(8);
else if (process.env.GH_TOKEN) token = process.env.GH_TOKEN;
else if (process.env.GITHUB_TOKEN) token = process.env.GITHUB_TOKEN;
else {
  try { token = execSync("gh auth token 2>/dev/null | head -1", { encoding: "utf8" }).trim(); } catch { token = ""; }
}

const outArg = process.argv.find((a) => a.startsWith("--out="));
const here = path.dirname(new URL(import.meta.url).pathname);
const outFile = outArg ? outArg.slice(6) : path.join(here, "..", "repo-state.json");

const H = { "User-Agent": "bci-site-builder", Accept: "application/vnd.github+json" };
if (token) H.Authorization = "Bearer " + token;

async function api(url) {
  const res = await fetch(url, { headers: H });
  if (res.status === 404) throw new Error("404: " + url + " —— 仓库不存在或 token 无权限（私有仓库需 contents:read）");
  if (res.status === 403) throw new Error("403: " + url + " —— 速率受限或 token 权限不足");
  if (!res.ok) throw new Error(res.status + ": " + url);
  return res.json();
}

console.log("→ 拉取 " + repo + " 的当前状态…");

const meta = await api("https://api.github.com/repos/" + repo);
const tree = await api("https://api.github.com/repos/" + repo + "/git/trees/" + meta.default_branch + "?recursive=1");
const commitsRaw = await api("https://api.github.com/repos/" + repo + "/commits?per_page=100");
const commits = (Array.isArray(commitsRaw) ? commitsRaw : []).map((c) => ({
  sha: c.sha.slice(0, 7),
  message: c.commit.message.split("\n")[0],
  date: c.commit.author.date.slice(0, 10),
  author: c.commit.author.name,
}));

async function fileText(p) {
  try {
    const d = await api("https://api.github.com/repos/" + repo + "/contents/" + p + "?ref=" + meta.default_branch);
    return Buffer.from(d.content, "base64").toString("utf8");
  } catch { return null; }
}

const files = (tree.tree || [])
  .filter((f) => f.type === "blob" && f.path)
  .map((f) => ({ ...f, name: f.path.split("/").pop(), path: f.path }));
const stat = {
  commits: commits.length,
  files: files.length,
  bytes: files.reduce((s, f) => s + (f.size || 0), 0),
  mdFiles: files.filter((f) => f.name.endsWith(".md")).length,
  pdf: files.filter((f) => f.name.endsWith(".pdf")).length,
  refsFiles: files.filter((f) => f.path.startsWith("references/")).length,
};

const todoMd = (await fileText(".agents/TODO.md")) || "";
const researchMd = (await fileText("RESEARCH.md")) || "";
const allCheckMd = (todoMd + "\n---\n" + researchMd).split("\n").filter((l) => /^\s*- \[/.test(l)).join("\n");
const mdLines = todoMd.split("\n").filter((l) => l.trim().length > 0).length;

const state = {
  builtAt: new Date().toISOString(),
  repo: {
    name: meta.name, fullName: meta.full_name, url: meta.html_url,
    visibility: meta.visibility, private: meta.private,
    branch: meta.default_branch, pushedAt: meta.pushed_at, createdAt: meta.created_at,
  },
  stats: { commits: stat.commits, files: stat.files, bytes: stat.bytes,
           mdFiles: stat.mdFiles, pdf: stat.pdf, refsFiles: stat.refsFiles, mdLines },
  commits,
  treeFiles: files.map((f) => ({ path: f.path, size: f.size })),
  todoMd,
  researchMd,
  allCheckMd,
};

fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(state, null, 2));
const mb = (stat.bytes / 1048576).toFixed(1);
console.log("✓ 已生成 " + outFile);
console.log("  提交 " + stat.commits + " · 文件 " + stat.files + " · " + mb + " MB · 文献 " + stat.pdf + " 篇 · TODO 行 " + mdLines);
