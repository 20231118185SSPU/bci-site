/* BCI 项目进度可视化 · data.js（build-data.mjs 自动生成于 2026-08-31）
 * 自动刷新部分来自 repo-state.json；人工精修内容保留。
 */
window.BCI = {
  "meta": {
    "nameCN": "监碳司",
    "nameEN": "Bureau of Carbon Intelligence",
    "abbr": "BCI",
    "subtitle": "基于深度学习的数据中心全生命周期碳效评估与算电协同优化平台",
    "tagline": "用 LCA 把碳算清楚，用 TFT + DQN 把碳降下去。",
    "repo": "MoYeRanqianzhi/BCI",
    "repoUrl": "https://github.com/MoYeRanqianzhi/BCI",
    "visibility": "Private",
    "branch": "master",
    "headSha": "0cdcb6c",
    "competition": "首届全国大学生零碳科技创新大赛",
    "track": "开放赛道 · 智能控碳",
    "group": "本科生组",
    "form": "软件系统（Web 交互平台）",
    "keywords": [
      "算电协同",
      "全生命周期评价 LCA",
      "碳感知调度",
      "深度强化学习",
      "碳使用效率 CUE"
    ],
    "lastCommit": "2026-08-30",
    "firstCommit": "2026-08-20",
    "pushedAt": "2026-08-30T07:59:03Z",
    "syncedAt": "2026-08-30T07:59:03Z",
    "stats": {
      "commits": 5,
      "files": 42,
      "mb": 66.5,
      "pdf": 23,
      "mdLines": 20,
      "mdFiles": 17,
      "refsFiles": 25
    }
  },
  "stats": [
    {
      "label": "Git 提交",
      "unit": "commits",
      "key": "commits",
      "icon": "commit",
      "value": 5
    },
    {
      "label": "核心文献",
      "unit": "篇 PDF",
      "key": "pdf",
      "icon": "book",
      "value": 23
    },
    {
      "label": "TODO 行",
      "unit": "行",
      "key": "mdLines",
      "icon": "doc",
      "value": 20
    },
    {
      "label": "仓库体积",
      "unit": "MB",
      "key": "mb",
      "icon": "disk",
      "decimals": 1,
      "value": 0
    }
  ],
  "progress": {
    "overall": 34,
    "rings": [
      {
        "key": "research",
        "label": "文献调研",
        "pct": 100,
        "done": 23,
        "total": 22,
        "unit": "篇",
        "color": "#00e5a0",
        "note": "仓库 references/ 共 23 篇文献 PDF"
      },
      {
        "key": "commit",
        "label": "提交活跃度",
        "pct": 75,
        "done": 5,
        "total": 10,
        "unit": "次",
        "color": "#22d3ee",
        "note": "master 分支累计 5 次提交"
      },
      {
        "key": "proposal",
        "label": "申报书",
        "pct": 46,
        "done": 6,
        "total": 13,
        "unit": "条",
        "color": "#facc15",
        "note": "条目勾选 6 / 13（在 data.js proposal 中更新）"
      },
      {
        "key": "engineering",
        "label": "技术实现",
        "pct": 0,
        "done": 0,
        "total": 20,
        "unit": "任务",
        "color": "#f472b6",
        "note": "TODO.md 勾选 0 / 20 项"
      }
    ]
  },
  "timeline": [
    {
      "date": "2026-07-09",
      "type": "decision",
      "title": "选题决策定型",
      "desc": "15 个智能控碳候选方案收敛至「算电协同 + LCA + 深度学习」；否决 MADRL 电力系统建模路线（团队无电气工程背景，答辩风险高）。",
      "tags": [
        "决策",
        "路线"
      ]
    },
    {
      "date": "2026-07-09",
      "type": "decision",
      "title": "技术选型与事实核查",
      "desc": "确定 TFT / LightGBM / DQN / 自研 LCA 引擎四模型架构；并行启动 8 个智能体核查 7 项关键数据，4 项确认、3 项修正（6.7 分钟）。",
      "tags": [
        "技术栈",
        "核查"
      ]
    },
    {
      "date": "2026-08-20",
      "sha": "6096d11",
      "type": "commit",
      "title": "初始提交：项目基础材料与选题决策记录",
      "desc": "建立仓库骨架：RESEARCH.md 主文档、.agents 记忆系统、竞赛规则与申报书模板入库。",
      "tags": [
        "Git"
      ]
    },
    {
      "date": "2026-08-20",
      "sha": "b7c6bf5",
      "type": "commit",
      "title": "文献下载与通读：22 篇核心论文 PDF 及逐篇总结",
      "desc": "覆盖 LCA 基础、LLM 碳足迹、碳感知调度、模型方法、指标与政策五大类；产出 3 批共 34KB 结构化总结。",
      "tags": [
        "Git",
        "文献"
      ]
    },
    {
      "date": "2026-08-30",
      "sha": "1695fb5",
      "type": "commit",
      "title": "添加项目名称与核心目的，扩展多 Agent 支持",
      "desc": "新增 AGENTS.md（19.5KB）以支持 Claude 之外的更多 AI 协作端。",
      "tags": [
        "Git",
        "文档"
      ]
    },
    {
      "date": "2026-08-30",
      "sha": "d945f9f",
      "type": "commit",
      "title": "定名英文名 BCI（Bureau of Carbon Intelligence）",
      "desc": "从 CarbonScope / DCarbon / CarbonSentry 四选一，保留中文名「监碳司」的官署意象，Intelligence 双关 AI。",
      "tags": [
        "Git",
        "命名"
      ]
    },
    {
      "date": "2026-08-30",
      "sha": "0cdcb6c",
      "type": "commit",
      "title": "归档 GitHub 私有仓库参考记忆",
      "desc": "仓库地址、推送方式与未跟踪文件情况写入记忆系统，保证上下文清除后可无缝衔接。",
      "tags": [
        "Git",
        "记忆"
      ],
      "head": true
    }
  ],
  "architecture": {
    "layers": [
      {
        "key": "assess",
        "name": "评估层",
        "en": "Assessment",
        "color": "#00e5a0",
        "model": "自研 LCA 引擎",
        "desc": "基于 ISO 14040/14044 的 cradle-to-grave 四阶段碳足迹计量，引入 CUE 碳效指标补充 PUE。",
        "io": "输入：数据中心参数 → 输出：分阶段碳排 + CUE 评级"
      },
      {
        "key": "predict",
        "name": "预测层",
        "en": "Prediction",
        "color": "#22d3ee",
        "model": "TFT + LightGBM",
        "desc": "TFT 预测区域电网未来 24h 碳强度（含注意力可解释性）；LightGBM 预测 AI 训练任务能耗。",
        "io": "输入：电力结构 + ERA5 气象 + 任务参数 → 输出：碳强度曲线 + 能耗画像"
      },
      {
        "key": "optimize",
        "name": "优化层",
        "en": "Optimization",
        "color": "#a78bfa",
        "model": "DQN 强化学习",
        "desc": "在 Gym 模拟环境中学习「立即执行 / 延迟 / 迁移」策略，奖励函数平衡碳排、SLA 与绿电利用率。",
        "io": "输入：碳强度预测 + 任务队列 → 输出：任务编排方案"
      }
    ],
    "loop": [
      "感知 · 碳强度预测",
      "认知 · 任务能耗画像",
      "决策 · 调度优化",
      "评估 · LCA 碳效"
    ]
  },
  "models": [
    {
      "name": "TFT",
      "full": "Temporal Fusion Transformer",
      "role": "电网碳强度预测",
      "color": "#22d3ee",
      "why": "多尺度时间注意力 + 变量选择网络，内置可解释性，直接命中评审「计算逻辑透明」硬性要求。",
      "base": "Lim et al., IJoF 2021（Google Cloud AI）",
      "rejected": "LSTM —— 保留为对比基线",
      "metrics": [
        "未来 24h 逐小时预测",
        "MAE / RMSE 对比 4 组基线",
        "注意力权重可视化"
      ]
    },
    {
      "name": "LightGBM",
      "full": "Gradient Boosting Decision Tree",
      "role": "任务能耗预测",
      "color": "#facc15",
      "why": "样本量仅 100–200 条，树模型比神经网络更稳；特征重要性天然可解释。",
      "base": "MLPerf Energy + 公开论文能耗数据",
      "rejected": "神经网络 —— 样本量不足",
      "metrics": [
        "输入：参数量 / GPU 型号 / batch / 轮数",
        "输出：总能耗 kWh + 训练时长",
        "特征重要性排序"
      ]
    },
    {
      "name": "DQN",
      "full": "Deep Q-Network",
      "role": "碳感知调度策略",
      "color": "#a78bfa",
      "why": "比贪心多出「向前看」的能力——现在碳强度中等但 3 小时后更低，值得等。",
      "base": "Mnih et al., Nature 2015 + Stable Baselines3",
      "rejected": "纯贪心（过于简单）、MADRL（需电力系统建模）",
      "metrics": [
        "状态：碳强度 + 预测 + 队列 + GPU 利用率",
        "动作：执行 / 延迟 / 迁移",
        "奖励：−α碳排 −βSLA +γ绿电"
      ]
    },
    {
      "name": "LCA",
      "full": "Life Cycle Assessment Engine",
      "role": "全生命周期碳计量",
      "color": "#00e5a0",
      "why": "补全被绝大多数工具忽略的设备体现碳——可再生能源供电下占生命周期碳排的 30%–50%。",
      "base": "ISO 14040 / 14044 / 14064 + GHG Protocol",
      "rejected": "仅算 Scope 2 运营碳的传统口径",
      "metrics": [
        "建设期 · 设备制造 · 运营期 · 退役期",
        "CUE = CO₂排放 / IT 能耗",
        "排放因子全部标注来源"
      ]
    }
  ],
  "experiment": {
    "title": "碳感知调度对比实验设计",
    "note": "预期减碳幅度，以 FIFO 为基准；DQN 相对贪心多出的 10–15 个百分点来自基于 TFT 预测的「向前看」能力。",
    "strategies": [
      {
        "name": "FIFO 先来先服务",
        "low": 0,
        "high": 0,
        "color": "#64748b",
        "desc": "基线，完全不考虑碳强度"
      },
      {
        "name": "历史均值调度",
        "low": 8,
        "high": 12,
        "color": "#38bdf8",
        "desc": "按历史统计的低碳时段排任务"
      },
      {
        "name": "贪心调度",
        "low": 15,
        "high": 20,
        "color": "#facc15",
        "desc": "每时段选当前碳强度最低时执行"
      },
      {
        "name": "DQN 调度（本方案）",
        "low": 25,
        "high": 35,
        "color": "#00e5a0",
        "desc": "TFT 预测驱动 + 强化学习策略优化",
        "hero": true
      }
    ]
  },
  "proposal": [
    {
      "name": "参赛项目名称",
      "limit": "—",
      "done": true,
      "note": "监碳司(BCI)——基于深度学习的数据中心全生命周期碳效评估与算电协同优化平台"
    },
    {
      "name": "关键词",
      "limit": "—",
      "done": true,
      "note": "算电协同 / LCA / 碳感知调度 / 深度强化学习 / CUE"
    },
    {
      "name": "团队类型",
      "limit": "—",
      "done": true,
      "note": "本/专科生组"
    },
    {
      "name": "赛道方向",
      "limit": "—",
      "done": true,
      "note": "■ 智能控碳"
    },
    {
      "name": "主要呈现形式",
      "limit": "—",
      "done": true,
      "note": "软件系统"
    },
    {
      "name": "一、项目简介",
      "limit": "≤800 字",
      "done": true,
      "note": "746 字已定稿，7 项数据全部核查通过"
    },
    {
      "name": "二、研究背景与意义",
      "limit": "≤1000 字",
      "done": false,
      "note": "政策背景 + 碳排现状 + 现有核算缺陷"
    },
    {
      "name": "三、国内外研究现状",
      "limit": "≤1000 字",
      "done": false,
      "note": "LLMCarbon / CarbonScaling / 碳感知调度 / LCA 应用"
    },
    {
      "name": "四、项目研究内容",
      "limit": "≤5000 字",
      "done": false,
      "note": "7 个子章节：LCA / TFT / LightGBM / DQN / 对比实验 / CUE / 平台"
    },
    {
      "name": "五、项目特色与创新之处",
      "limit": "≤500 字",
      "done": false,
      "note": "四个创新点已提炼，待成文"
    },
    {
      "name": "六、AI 使用情况披露",
      "limit": "≤200 字",
      "done": false,
      "note": "如实披露 AI 辅助范围"
    },
    {
      "name": "七、呈现形式与附件",
      "limit": "—",
      "done": false,
      "note": "系统截图 / 训练曲线 / 对比图表 / 碳报告样例"
    },
    {
      "name": "参考文献",
      "limit": "—",
      "done": false,
      "note": "22 篇已通读，待按格式整理"
    }
  ],
  "roadmap": [
    {
      "phase": "阶段一",
      "period": "第 1–2 周",
      "title": "数据准备与 LCA 引擎",
      "color": "#00e5a0",
      "status": "pending",
      "tasks": [
        "爬取整理各省电力结构数据，估算碳强度时序",
        "收集 ERA5 气象数据（风速 / 辐照度 / 温度）",
        "构建四阶段排放因子数据库",
        "收集 GPU / 服务器 PCF 体现碳数据",
        "实现 LCA 计算引擎（Python）",
        "实现 CUE 评分模型"
      ]
    },
    {
      "phase": "阶段二",
      "period": "第 2–3 周",
      "title": "机器学习模型开发",
      "color": "#22d3ee",
      "status": "pending",
      "tasks": [
        "TFT 碳强度预测模型训练与评估",
        "LSTM 基线模型对比",
        "LightGBM 任务能耗预测模型",
        "构建 Gym 调度模拟环境",
        "DQN 调度策略训练",
        "对比实验 FIFO / 贪心 / 历史均值 / DQN"
      ]
    },
    {
      "phase": "阶段三",
      "period": "第 3–4 周",
      "title": "系统集成与可视化",
      "color": "#a78bfa",
      "status": "pending",
      "tasks": [
        "Streamlit Web 平台搭建",
        "LCA 饼图 / 碳强度曲线 / 调度甘特图 / 东数西算地图 / CUE 评分卡",
        "碳报告自动生成（PDF / Word）",
        "系统测试与优化"
      ]
    },
    {
      "phase": "阶段四",
      "period": "第 4–5 周",
      "title": "材料撰写与路演",
      "color": "#facc15",
      "status": "pending",
      "tasks": [
        "申报书各章节撰写",
        "答辩 PPT 制作",
        "路演稿撰写",
        "演示视频录制"
      ]
    }
  ],
  "papers": [
    {
      "file": "Gupta2021_Chasing_Carbon_HPCA",
      "title": "Chasing Carbon: The Elusive Environmental Footprint of Computing",
      "venue": "IEEE HPCA",
      "year": 2021,
      "cat": "LCA 基础",
      "note": "体现碳超越运营碳的奠基之作；可再生能源下 >80% 碳排来自硬件制造。"
    },
    {
      "file": "Acun2023_Carbon_Explorer_ASPLOS",
      "title": "Carbon Explorer: A Holistic Framework for Designing Carbon Aware Datacenters",
      "venue": "ACM ASPLOS",
      "year": 2023,
      "cat": "碳感知调度",
      "note": "Meta 碳感知数据中心设计框架，可再生 + 储能 + 调度三维权衡。"
    },
    {
      "file": "Lim2021_TFT_IJoF",
      "title": "Temporal Fusion Transformers for Interpretable Multi-horizon Time Series Forecasting",
      "venue": "Int. J. of Forecasting",
      "year": 2021,
      "cat": "模型方法",
      "note": "本项目碳强度预测模型的原始论文，SOTA + 三大可解释性能力。"
    },
    {
      "file": "Mnih2015_DQN_Nature",
      "title": "Human-level control through deep reinforcement learning (DQN)",
      "venue": "Nature",
      "year": 2015,
      "cat": "模型方法",
      "note": "调度策略的算法基础：经验回放 + 目标网络。"
    },
    {
      "file": "Faiz2024_LLMCarbon_ICLR",
      "title": "LLMCarbon: Modeling the End-to-End Carbon Footprint of Large Language Models",
      "venue": "ICLR",
      "year": 2024,
      "cat": "LLM 碳足迹",
      "note": "端到端 LLM 碳足迹预测，误差 ≤8.2%，远优于 mlco2 的 >69%。"
    },
    {
      "file": "Falk2025_More_Than_Carbon_A100_LCA",
      "title": "More than Carbon: Cradle-to-Grave Environmental Impacts of GenAI Training on the Nvidia A100",
      "venue": "arXiv",
      "year": 2025,
      "cat": "LCA 基础",
      "note": "A100 GPU 摇篮到坟墓的多维环境影响评估。"
    },
    {
      "file": "Fu2024_LLMCO2_Inference_Carbon",
      "title": "LLMCO2: Advancing Accurate Carbon Footprint Prediction for LLM Inferences",
      "venue": "arXiv",
      "year": 2024,
      "cat": "LLM 碳足迹",
      "note": "推理阶段碳足迹预测，补齐训练之外的另一半。"
    },
    {
      "file": "Radovanovic2021_Carbon_Aware_Computing_Google",
      "title": "Carbon-Aware Computing for Datacenters",
      "venue": "IEEE Trans. Power Systems",
      "year": 2021,
      "cat": "碳感知调度",
      "note": "Google 生产级碳感知计算系统，时移负载的工业界标杆。"
    },
    {
      "file": "Lambert2026_Cradle_to_Cloud_AI_LCA_Review",
      "title": "From Cradle to Cloud: A Life Cycle Review of AI's Environmental Footprint",
      "venue": "ACM FAccT",
      "year": 2026,
      "cat": "LCA 基础",
      "note": "AI 环境足迹的生命周期综述，最新方法论盘点。"
    },
    {
      "file": "Guidi2026_US_Hyperscale_DC_Carbon",
      "title": "Assessing the Carbon Emissions and Energy Consumption of U.S. Hyperscale Data Centers",
      "venue": "arXiv · Harvard",
      "year": 2026,
      "cat": "指标与政策",
      "note": "美国超大规模数据中心碳排与能耗实证评估。"
    },
    {
      "file": "CarbonScaling2025_Neural_Scaling_Carbon",
      "title": "CarbonScaling: Extending Neural Scaling Laws for Carbon Footprint in LLMs",
      "venue": "ACM",
      "year": 2026,
      "cat": "LLM 碳足迹",
      "note": "把神经缩放定律扩展到碳足迹维度。"
    },
    {
      "file": "Rodriguez2025_CEO_DC_HPC_Decarbonization",
      "title": "CEO-DC: Driving Decarbonization in HPC Data Centers with Actionable Insights",
      "venue": "arXiv · EPFL",
      "year": 2025,
      "cat": "指标与政策",
      "note": "HPC 数据中心脱碳的可操作决策洞察。"
    },
    {
      "file": "Yang2025_Carbon_Aware_Container_Scheduling_Survey",
      "title": "A Survey on Task Scheduling in Carbon-Aware Container Orchestration",
      "venue": "arXiv",
      "year": 2025,
      "cat": "碳感知调度",
      "note": "碳感知容器编排调度综述，梳理本方案的对标基线。"
    },
    {
      "file": "Jadhav2026_DC_Lifecycle_CoDesign",
      "title": "Data Center Life Cycle Co-Design Optimization",
      "venue": "arXiv",
      "year": 2026,
      "cat": "LCA 基础",
      "note": "数据中心生命周期协同设计优化。"
    },
    {
      "file": "DRL_Job_Scheduling_Survey2025",
      "title": "Deep Reinforcement Learning for Job Scheduling: A Survey",
      "venue": "arXiv",
      "year": 2025,
      "cat": "模型方法",
      "note": "DRL 作业调度全景综述，支撑 DQN 选型论证。"
    },
    {
      "file": "GreenGrid2010_CUE_WhitePaper32",
      "title": "Carbon Usage Effectiveness (CUE): A Green Grid Data Center Sustainability Metric",
      "venue": "The Green Grid WP#32",
      "year": 2010,
      "cat": "指标与政策",
      "note": "CUE 指标的原始定义来源，创新点二的方法学依据。"
    },
    {
      "file": "Sharma2026_DC_Sustainability_Metrics_IEEE",
      "title": "Data Center Sustainability Metrics",
      "venue": "IEEE Spectrum",
      "year": 2026,
      "cat": "指标与政策",
      "note": "PUE / CUE / WUE 等指标体系的最新讨论。"
    },
    {
      "file": "Wadenstein2025_LCA_Scientific_Computing_EPJC",
      "title": "Life Cycle Assessment of Scientific Computing",
      "venue": "Eur. Phys. J. C 85:612",
      "year": 2025,
      "cat": "LCA 基础",
      "note": "科学计算设施 LCA 实证，系统边界设定可直接借鉴。"
    },
    {
      "file": "Smith2026_Carbon_Accounting_DC_IT_Sustainability",
      "title": "Carbon Accounting in Data Centers and IT Sustainability",
      "venue": "Sustainability (MDPI)",
      "year": 2026,
      "cat": "LCA 基础",
      "note": "数据中心碳核算规范，对标评审「符合行业规范」要求。"
    },
    {
      "file": "Yadav2025_DQN_Cloud_Scheduling_SciRep",
      "title": "DQN-based Cloud Task Scheduling",
      "venue": "Scientific Reports",
      "year": 2025,
      "cat": "模型方法",
      "note": "DQN 云调度的近期实证，证明工程可行性。"
    },
    {
      "file": "NDRC2024_DC_Green_LowCarbon_Plan",
      "title": "数据中心绿色低碳发展专项行动计划",
      "venue": "国家发改委等四部门",
      "year": 2024,
      "cat": "指标与政策",
      "note": "80% 绿电目标的最早出处，2026.03 升级为硬性要求。"
    },
    {
      "file": "CASPER2024_Carbon_Aware_Scheduling",
      "title": "CASPER: Carbon-Aware Scheduling and Provisioning",
      "venue": "arXiv",
      "year": 2024,
      "cat": "碳感知调度",
      "note": "碳感知调度与资源供给联合优化。"
    }
  ],
  "scoring": {
    "total": {
      "low": 83,
      "high": 93,
      "max": 100
    },
    "verdict": "区域赛一等奖有力竞争者，上限触及特等奖",
    "items": [
      {
        "name": "选题契合度与问题价值",
        "low": 17,
        "high": 19,
        "max": 20,
        "note": "算电协同 + 双碳政策精准对标"
      },
      {
        "name": "科学性与技术水平",
        "low": 26,
        "high": 28,
        "max": 30,
        "note": "TFT + DQN + LCA 方法论规范，对比实验严谨"
      },
      {
        "name": "创新性",
        "low": 16,
        "high": 18,
        "max": 20,
        "note": "四个创新点清晰，体现碳补全是实质差异化"
      },
      {
        "name": "零碳效益与可行路径",
        "low": 12,
        "high": 14,
        "max": 15,
        "note": "三策略量化对比 + 80% 绿电对标"
      },
      {
        "name": "完成度与综合呈现",
        "low": 12,
        "high": 14,
        "max": 15,
        "note": "可交互平台 + 现场演示"
      }
    ]
  },
  "innovations": [
    {
      "n": "01",
      "title": "首个覆盖全生命周期的数据中心碳效评估工具",
      "desc": "现有工具只算运营期用电（Scope 2），本方案补上设备体现碳——这部分占 30%–50% 却长期被忽略。"
    },
    {
      "n": "02",
      "title": "引入 CUE 碳效指标作为 PUE 的碳维度补充",
      "desc": "从「能效评估」拓展到「碳效评估」，直接响应双碳目标。CUE = 数据中心 CO₂eq 排放 / IT 设备能耗。"
    },
    {
      "n": "03",
      "title": "预测驱动的碳感知调度",
      "desc": "TFT 碳强度预测 + DQN 强化学习调度，核心能力是「向前看」，较贪心策略多减排 10–15 个百分点。"
    },
    {
      "n": "04",
      "title": "LCA 方法论与算电协同场景的首次系统融合",
      "desc": "跨学科创新：环境科学 LCA × 计算机 ML/DL × 能源政策算电协同。"
    }
  ],
  "memory": [
    {
      "file": "decision-naming",
      "type": "决策",
      "title": "命名决策",
      "color": "#a78bfa",
      "desc": "英文名定名 BCI（Bureau of Carbon Intelligence），4 个候选对比，保留中文名「衙门」趣味 + Intelligence 双关 AI。",
      "risk": "尚未联网核查重名与商标"
    },
    {
      "file": "decision-project-direction",
      "type": "决策",
      "title": "选题决策",
      "color": "#a78bfa",
      "desc": "15 个候选方案 → 算电协同 + LCA + DL 的完整推理链；定位从「调度系统」降为「评估优化工具」。",
      "risk": "放弃电力系统建模以规避答辩风险"
    },
    {
      "file": "decision-tech-stack",
      "type": "决策",
      "title": "技术选型",
      "color": "#a78bfa",
      "desc": "TFT / DQN / LightGBM 的选择理由与答辩风险评估；用户明确否决纯贪心与 MADRL。",
      "risk": "样本量约 100–200 条限制模型选择"
    },
    {
      "file": "fact-check-results",
      "type": "核查",
      "title": "数据核查结果",
      "color": "#22d3ee",
      "desc": "7 项关键声明并行核查：4 项确认、3 项修正（3.2%→1.5%、政策来源拆分、CUE 补充而非替代 PUE）。",
      "risk": "DeepSeek 能耗为第三方估算值，引用需注明"
    },
    {
      "file": "policy-suandian",
      "type": "参考",
      "title": "算电协同政策",
      "color": "#00e5a0",
      "desc": "政府工作报告原文、十五五规划、80% 绿电目标的来源与 URL 全部留痕。",
      "risk": "十五五规划未使用「算电协同」原词"
    },
    {
      "file": "competition-scoring",
      "type": "参考",
      "title": "评审评分标准",
      "color": "#00e5a0",
      "desc": "本科组函评 5 项指标权重、各栏目字数上限与得分策略。",
      "risk": "科学性 30 分是最大分仓"
    },
    {
      "file": "feedback-user-preferences",
      "type": "反馈",
      "title": "用户偏好",
      "color": "#facc15",
      "desc": "坚持算电协同、必须用 DL 不用贪心、用 DeepSeek 不用 GPT-4、定稿放代码块。",
      "risk": "「没有人，只有你」——无多人团队"
    },
    {
      "file": "reference-github-repo",
      "type": "参考",
      "title": "GitHub 仓库",
      "color": "#00e5a0",
      "desc": "私有仓库 MoYeRanqianzhi/BCI，origin 已配置，默认分支 master。",
      "risk": "工作区存在未跟踪文件，建议补 .gitignore"
    }
  ],
  "facts": [
    {
      "k": "1.5%",
      "d": "2025 年全球数据中心用电约 485 TWh，占全球电力 1.5%",
      "s": "IEA (2026.06)",
      "fixed": true,
      "was": "原稿误作 3.2%"
    },
    {
      "k": "950 TWh",
      "d": "2030 年全球数据中心用电预测，占比约 3%",
      "s": "IEA (2026.06)"
    },
    {
      "k": "545 tCO₂eq",
      "d": "DeepSeek-V3 单次训练估算排放（278.8 万 H800 GPU 小时）",
      "s": "arXiv:2412.19437 + 第三方估算",
      "warn": true
    },
    {
      "k": "30–50%",
      "d": "可再生能源供电数据中心中 GPU 体现碳占生命周期碳排比例",
      "s": "Gupta et al., HPCA 2021"
    },
    {
      "k": "80%",
      "d": "枢纽节点新建算力设施绿电应用占比硬性要求",
      "s": "国家数据局 2026.03",
      "fixed": true,
      "was": "原稿误归于政府工作报告"
    },
    {
      "k": "3259 万 kW",
      "d": "全国已审批绿电直连项目总装机容量",
      "s": "国家发改委"
    }
  ],
  "tree": [
    {
      "name": ".agents/",
      "type": "dir",
      "desc": "AI 协作记忆系统",
      "children": [
        {
          "name": "MEMORY.md",
          "type": "md",
          "size": "1.0 KB",
          "desc": "记忆索引"
        },
        {
          "name": "DOCS.md",
          "type": "md",
          "size": "0.5 KB",
          "desc": "文档索引"
        },
        {
          "name": "TODO.md",
          "type": "md",
          "size": "0.9 KB",
          "desc": "任务清单"
        },
        {
          "name": "memory/",
          "type": "dir",
          "size": "8 files",
          "desc": "决策 / 核查 / 参考 / 反馈档案"
        }
      ]
    },
    {
      "name": "references/",
      "type": "dir",
      "desc": "文献库",
      "children": [
        {
          "name": "22 × *.pdf",
          "type": "pdf",
          "size": "66 MB",
          "desc": "核心论文与政策文件"
        },
        {
          "name": "summaries_batch1–3.md",
          "type": "md",
          "size": "34 KB",
          "desc": "逐篇结构化总结"
        }
      ],
      "size": "25.0 MB"
    },
    {
      "name": "RESEARCH.md",
      "type": "md",
      "size": "25 KB",
      "desc": "项目主文档：架构 / 数据源 / 申报书 / 实施计划"
    },
    {
      "name": "AGENTS.md",
      "type": "md",
      "size": "19 KB",
      "desc": "通用 AI 协作规范"
    },
    {
      "name": "CLAUDE.md",
      "type": "md",
      "size": "19 KB",
      "desc": "项目级 AI 协作与记忆配置"
    },
    {
      "name": "竞赛规则 .pdf",
      "type": "pdf",
      "size": "203 KB",
      "desc": "完整竞赛规则"
    },
    {
      "name": "申报书模板  开放赛道.docx",
      "type": "doc",
      "size": "26 KB",
      "desc": "开放赛道申报书模板"
    },
    {
      "name": "申报书正式稿.docx",
      "type": "doc",
      "size": "26 KB",
      "desc": "正式稿（撰写中）"
    }
  ],
  "risks": [
    {
      "level": "high",
      "title": "技术实现尚未启动",
      "desc": "四个阶段 20 项任务全部待办，仓库中还没有任何代码。这是当前最大的进度缺口。"
    },
    {
      "level": "high",
      "title": "申报书主体未成文",
      "desc": "占字数最多的「四、项目研究内容」（≤5000 字）尚未动笔，其余 6 个栏目同样待写。"
    },
    {
      "level": "mid",
      "title": "名称重名未核查",
      "desc": "「Bureau of Carbon Intelligence」/ BCI 尚未联网核查商标与重名，正式对外前需补查。"
    },
    {
      "level": "mid",
      "title": "关键数据为估算值",
      "desc": "DeepSeek 能耗、体现碳占比等引用需在申报书中明确标注「第三方估算」与假设条件。"
    },
    {
      "level": "low",
      "title": "缺少 .gitignore",
      "desc": "工作区存在未跟踪的截图与 Word 锁文件，建议补充忽略规则。"
    }
  ]
};
