# 监碳司 BCI · 进度看板（自动同步版）

> 网站本身是纯静态 HTML/CSS/JS，零依赖；但进度数据每次都由 GitHub Actions
> 从你的私有仓库 `MoYeRanqianzhi/BCI` 拉取后自动生成，推新内容即自动更新。

## 目录结构

```
bci-site/
├── index.html               # 页面入口
├── assets/
│   ├── data.js              # 站点数据（⚠ build-data.mjs 自动生成，勿手改可测字段）
│   ├── style.css            # 样式
│   └── app.js               # 渲染逻辑
├── repo-state.json          # 仓库状态快照（自动生成）
├── tools/
│   ├── fetch-repo-state.mjs # 从 GitHub API 拉取 repo 当前状态
│   └── build-data.mjs       # 合并快照 → data.js
├── .github/workflows/
│   ├── deploy.yml           # 🕐 网站仓库：定时/手动/推送触发 → 生成 + 部署 Pages
│   └── bci-push.yml         # 🚀 BCI 仓库：每次 push 后通知网站仓库刷新
└── README.md                # 本文件
```

## 同步管线是怎么工作的

```
你 push 到 BCI 仓库                                  GitHub Actions（网站仓库）
┌──────────────────────┐   repository_dispatch   ┌─────────────────────────────┐
│ bci-push.yml         │ ───────────────────────▶ │ deploy.yml                  │
│ (on: push)           │                          │  1. fetch-repo-state.mjs   │
└──────────────────────┘                          │     → 提交数/文件/图勾选/时间线│
                                       ────────▶ │  2. build-data.mjs          │
   （也可只靠 deploy.yml 每天定时跑，              │     → 合并进度 → data.js     │
     不需要 bci-push.yml）                        │  3. 部署到 GitHub Pages     │
                                                  └─────────────────────────────┘
```

**自动更新的内容**（每次都重算）：提交数/文件数/仓库体积/文献数、Git 时间线新增提交、
申报书与技术实现进度（按 TODO.md 与 RESEARCH.md 的 `- [x]` 勾选统计）、文件树尺寸。
**保留人工精修内容**：创新点文案、模型卡解说、文献一句注记等机器无法推断的部分。

## 一分钟部署（先把网站放上 GitHub）

### 第 1 步：推送网站仓库

```bash
cd bci-site
git init && git add -A && git commit -m "feat: BCI 进度看板"
gh repo create MoYeRanqianzhi/bci-site --public --source=. --push
```

然后打开 `Settings → Pages → Source = GitHub Actions`。

### 第 2 步：给私有仓库一个读取密钥

> BCI 是私有的，Actions 里必须有一个「能读 BCI」的 token；若 BCI 之后改为公开可跳过此步。

1. GitHub → 头像 → Settings → Developer settings → Personal access tokens → Fine-grained tokens → 生成
2. Repository access：只选 **MoYeRanqianzhi/BCI**
3. Permissions：Contents → **Read-only**（够用了）
4. 到网站仓库 `Settings → Secrets → Actions` 添加 `BCI_PAT` = 该 token

### 第 3 步：让 push 立即触发（可选但推荐）

1. 再生成一个 fine-grained token，Repository access 选 **网站仓库**，Contents → **Read/Write**
2. 到 **BCI 仓库** `Settings → Secrets → Actions` 添加 `AUTOSITE_PAT` = 该 token
3. 从此每次 `git push` 到 BCI，网站 1~2 分钟内自动刷新（Actions → deploy.yml 可看进度）

> 只做了第 1、2 步也没关系：deploy.yml 每天 15:30（北京时间）会定时同步一次，
> 也可以随时在 Actions 页面手动 Run workflow。

## 本地更新（不依赖 GitHub Actions）

```bash
# 用你机器上已登录的 gh（本例即 BCI 仓库拥有者）
node tools/fetch-repo-state.mjs MoYeRanqianzhi/BCI --out=repo-state.json
node tools/build-data.mjs --state=repo-state.json --data=assets/data.js
# 浏览器直接打开 index.html 即可看到“自动同步”徽标
```

## 要点与坑

- **私有仓库的浏览器读取**：站点数据必须在 Actions 服务端生成，页面上不能直接 fetch 私有 API。
- **data.js 会被覆盖**：只手改 `proposal`（申报书勾选）、`papers`、`innovations`、`models` 这些语义字段；
  统计/时间线/进度环由 build 重算。想强制改回来就编辑 `tools/build-data.mjs` 里的对应段。
- **提交历史只拉最近 100 条**：需要完整历史时在 fetch 脚本里把 `commits?per_page=100` 改为分页循环。
- **页面截图验证**：`index.html?static=1` 关闭动画、显示最终数值，适合 Print / 截图。

---
*由 DeepSeek 辅助搭建 · 数据源 MoYeRanqianzhi/BCI · 最后更新 2026-08-31*