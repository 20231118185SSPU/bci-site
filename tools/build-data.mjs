#!/usr/bin/env node
/**
 * build-data.mjs — 把 fetch-repo-state.mjs 拉到的 repo-state.json
 * 合并进 assets/data.js，自动刷新「可测量」的进度指标：
 *   提交数 / 文件数 / 体积 / 文献数 / TODO 行数
 *   → timeline 追加新提交 · progress 环重算 · roadmap 待办状态
 *   → tree 尺寸与新增文件 · meta 的 headSha/branch/同步时间
 * 保留「不可测量」的人工精修内容（创新点、模型卡、文献注记等）。
 *
 * 用法：
 *   node tools/build-data.mjs [--state=repo-state.json] [--data=assets/data.js]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const here = path.dirname(new URL(import.meta.url).pathname);
const arg = (k, d) => {
  const a = process.argv.find((x) => x.startsWith("--" + k + "="));
  return a ? a.slice(k.length + 3) : d;
};
const statePath = arg("state", path.join(here, "..", "repo-state.json"));
const dataPath = arg("data", path.join(here, "..", "assets", "data.js"));

if (!fs.existsSync(statePath)) {
  console.error("✗ 缺少 " + statePath + "，请先运行: node tools/fetch-repo-state.mjs <owner/repo>");
  process.exit(1);
}
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

/* ---- 载入当前 data.js（沙箱：window.BCI 导出） ---- */
const raw = fs.readFileSync(dataPath, "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(raw, sandbox);
const D = sandbox.window.BCI;
if (!D) { console.error("✗ data.js 未导出 window.BCI"); process.exit(1); }

const s = state.stats, r = state.repo;
const mb = (s.bytes / 1048576);
const has = (c) => state.commits.some((x) => x.sha === c);

console.log("→ 合并状态: " + r.fullName + " (" + r.branch + ")");

/* 1) meta */
D.meta.visibility = r.private ? "Private" : "Public";
D.meta.branch = r.branch;
D.meta.pushedAt = r.pushedAt;
D.meta.lastCommit = state.commits[0] ? state.commits[0].date : D.meta.lastCommit;
D.meta.headSha = state.commits[0] ? state.commits[0].sha : D.meta.headSha;
D.meta.firstCommit = state.commits.length ? state.commits[state.commits.length - 1].date : D.meta.firstCommit;
D.meta.syncedAt = state.builtAt;
D.meta.stats = { commits: s.commits, files: s.files, mb: Math.round(mb * 10) / 10,
                 pdf: s.pdf, mdLines: s.mdLines, mdFiles: s.mdFiles, refsFiles: s.refsFiles };

/* 2) stats 条：值全部换成本次拉取 */
const rawStats = [
  { label: "Git 提交", unit: "commits", key: "commits", icon: "commit" },
  { label: "核心文献", unit: "篇 PDF", key: "pdf", icon: "book" },
  { label: "TODO 行", unit: "行", key: "mdLines", icon: "doc" },
  { label: "仓库体积", unit: "MB", key: "mb", icon: "disk", decimals: 1 },
];
D.stats = rawStats.map((x) => ({ ...x, value: s[x.key] ?? 0 }));

/* 3) timeline：保留旧决策条目，把新提交作为 Git 提交追加 */
const HEAD = state.commits[0];
const newCommits = state.commits.filter((c) => !D.timeline.some((t) => t.sha === c.sha));
for (const c of newCommits.slice().reverse()) {
  D.timeline.push({
    date: c.date, sha: c.sha, type: "commit",
    title: c.message, desc: "由自动同步拉取的仓库提交（" + c.author + "）",
    tags: ["Git", "自动同步"],
  });
}
D.timeline.sort((a, b) => (a.date < b.date ? -1 : 1));
/* HEAD 标记 */
D.timeline.forEach((t) => { delete t.head; });
const headItem = D.timeline[D.timeline.length - 1];
if (headItem && headItem.sha === HEAD.sha) headItem.head = true;

/* 4) progress：按勾选框重算申报书/工程进度（TM 在 TODO.md + RESEARCH.md 中匹配任务文本） */
/* 合并 TODO.md + RESEARCH.md 的勾选框（每次构建时从最新文本现算，避免快照过期） */
const allCheckMd = [state.todoMd, state.researchMd, state.allCheckMd].filter(Boolean).join("\n");
const allChecks = allCheckMd.split("\n").filter((l) => /^\s*- \[/.test(l));
const isDone = (l) => /\[x\]/i.test(l);
/* 归一化：去空白、去括号尾注、小写——避免 "实现 LCA" vs "实现LCA" 匹配失败 */
const norm = (t) => String(t).replace(/\s+/g, "").replace(/[（(].*$/, "").toLowerCase();
const phaseDone = (kw, tasks) => {
  const names = tasks.map((t) => norm(t));
  const inPhase = allChecks.filter((l) => {
    const text = norm(l.replace(/^\s*- \[.\]\s*/, ""));
    return names.some((n) => n && text.includes(n)) || (kw && text.includes(norm(kw)));
  });
  return { done: inPhase.filter(isDone).length, total: inPhase.length };
};
const engTotal = D.roadmap.reduce((n, p) => n + p.tasks.length, 0);
let engDone = 0;
D.roadmap.forEach((p) => {
  const r2 = phaseDone("", p.tasks);
  if (r2.total > 0) {
    p.status = r2.done === r2.total ? "done" : r2.done > 0 ? "doing" : "pending";
    engDone += r2.done;
  } else {
    /* 未匹配到明确任务时退化为按阶段标题匹配 */
    const r3 = phaseDone(p.title, []) ;
    if (r3.total > 0) { p.status = r3.done > 0 ? "doing" : "pending"; }
  }
});
const engPct = engTotal ? Math.round((engDone / engTotal) * 100) : 0;
const propTotal = D.proposal.length;
const propDone = D.proposal.filter((p) => p.done).length;

D.progress = {
  overall: Math.round(propDone / propTotal * 30 + engPct * 0.35 + Math.min(100, s.commits * 4)),
  rings: [
    { key: "research", label: "文献调研", pct: Math.round(Math.min(100, s.pdf * 100 / 22)), done: s.pdf, total: 22, unit: "篇", color: "#00e5a0", note: "仓库 references/ 共 " + s.pdf + " 篇文献 PDF" },
    { key: "commit", label: "提交活跃度", pct: Math.min(100, s.commits * 15), done: s.commits, total: Math.max(s.commits, 10), unit: "次", color: "#22d3ee", note: "master 分支累计 " + s.commits + " 次提交" },
    { key: "proposal", label: "申报书", pct: Math.round(propDone / propTotal * 100), done: propDone, total: propTotal, unit: "条", color: "#facc15", note: "条目勾选 " + propDone + " / " + propTotal + "（在 data.js proposal 中更新）" },
    { key: "engineering", label: "技术实现", pct: engPct, done: engDone, total: engTotal, unit: "任务", color: "#f472b6", note: "TODO.md 勾选 " + engDone + " / " + engTotal + " 项" },
  ],
};

/* 5) 文件树：用快照尺寸更新，并追加新顶层文件 */
const sizeOf = (p) => { const f = state.treeFiles.find((x) => x.path === p); return f ? f.size : null; };
const fmt = (b) => b == null ? "" : b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : b > 1024 ? Math.round(b / 1024) + " KB" : b + " B";
const apply = (names, sizes) => { /* recursive size lookup for known paths */ };
D.tree.forEach((n) => {
  const exact = sizeOf(n.name);
  if (exact != null) n.size = fmt(exact);
  (n.children || []).forEach((c) => {
    const px = path.join(n.name.replace(/\/$/, ""), c.name.replace(/\/$/, ""));
    const s2 = sizeOf(px) ?? (c.name.includes("22 ×") ? (s.refsFiles * 1048576) : null);
    if (s2 != null) n.size = n.size || fmt(s2);
  });
});
/* 新顶层文件（快照有而树里没有） */
const knownTop = new Set(D.tree.map((n) => n.name.replace(/\/$/, "")));
const newTop = state.treeFiles.map((f) => f.path.split("/")[0]).filter((x) => x && !knownTop.has(x));
const seen = new Set();
newTop.forEach((x) => {
  if (seen.has(x)) return; seen.add(x);
  const cs = state.treeFiles.filter((f) => f.path.startsWith(x + "/"));
  const total = cs.reduce((a, c) => a + c.size, 0);
  D.tree.push({ name: x + (cs.length ? "/" : ""), type: cs.length ? "dir" : "md",
                size: fmt(total) || (sizeOf(x) != null ? fmt(sizeOf(x)) : ""),
                desc: "自动同步 · 新增于 " + D.meta.lastCommit });
});

/* 6) 写入 */
const out = "/* BCI 项目进度可视化 · data.js（build-data.mjs 自动生成于 " + state.builtAt.slice(0, 10) + "）\n * 自动刷新部分来自 repo-state.json；人工精修内容保留。\n */\nwindow.BCI = " + JSON.stringify(D, null, 2).replace(/"url":/g, '"url":') + ";\n";
fs.writeFileSync(dataPath, out);
console.log("✓ data.js 已更新");
console.log("  提交 " + s.commits + " · 文件 " + s.files + " · " + (Math.round(mb * 10) / 10) + " MB · 文献 " + s.pdf + " 篇");
console.log("  申报书 " + propDone + "/" + propTotal + " · 工程 " + engDone + "/" + engTotal);
console.log("  整体进度 " + D.progress.overall + "% · 同步时间 " + state.builtAt);
