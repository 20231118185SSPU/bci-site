/* BCI 进度看板 · 渲染与动效 */
(function () {
  "use strict";
  var D = window.BCI;
  var $ = function (s) { return document.querySelector(s); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ---------------- HERO ---------------- */
  var m = D.meta;
  $("#repoLink").href = m.repoUrl;
  $("#footRepo").href = m.repoUrl;
  $("#footRepo").textContent = m.repo;

  var badges = [
    ['<b>' + m.group + '</b>', ""],
    ['赛道 <b>' + m.track.split(" · ")[1] + '</b>', ""],
    ['呈现形式 <b>' + m.form + '</b>', ""],
    ['分支 <b>' + m.branch + '</b> · <b>' + m.headSha + '</b>', ""],
    ['🔒 <b>Private</b> 私有仓库', "priv"]
  ];
  var hb = $("#heroBadges");
  badges.forEach(function (b) { hb.appendChild(el("span", "badge " + b[1], b[0])); });

  var ss = $("#statStrip");
  D.stats.forEach(function (s) {
    var c = el("div", "stat");
    c.innerHTML = '<div class="v" data-count="' + s.value + '" data-dec="' + (s.decimals || 0) + '">0</div>' +
      '<div class="l">' + esc(s.label) + '</div><div class="u">' + esc(s.unit) + '</div>';
    ss.appendChild(c);
  });

  /* ---------------- PROGRESS RINGS ---------------- */
  var R = 62, CIRC = 2 * Math.PI * R;
  var ringsBox = $("#rings");
  D.progress.rings.forEach(function (r, i) {
    var c = el("div", "card ring-card rv");
    c.style.transitionDelay = (i * 90) + "ms";
    c.innerHTML =
      '<div class="ring-wrap">' +
        '<svg viewBox="0 0 150 150" width="150" height="150">' +
          '<circle class="ring-bg" cx="75" cy="75" r="' + R + '"></circle>' +
          '<circle class="ring-fg" cx="75" cy="75" r="' + R + '" style="stroke:' + r.color + ';--circ:' + CIRC + ';color:' + r.color + '" data-pct="' + r.pct + '"></circle>' +
        '</svg>' +
        '<div class="ring-val" style="color:' + r.color + '"><div data-count="' + r.pct + '">0</div><span>%</span></div>' +
      '</div>' +
      '<h3>' + esc(r.label) + '</h3>' +
      '<div class="frac">' + r.done + ' / ' + r.total + ' ' + esc(r.unit) + '</div>' +
      '<p>' + esc(r.note) + '</p>';
    ringsBox.appendChild(c);
  });

  $("#overall").innerHTML =
    '<div class="big" data-count="' + D.progress.overall + '">0</div>' +
    '<div class="txt"><h4>项目整体完成度约 ' + D.progress.overall + '%</h4>' +
    '<p>研究与决策阶段已收口，申报书过半待写，技术实现整体待启动。加权口径：文献调研 20% · 选题决策 15% · 申报书 30% · 技术实现 35%。</p>' +
    '<div class="meter"><i data-w="' + D.progress.overall + '"></i></div></div>';

  /* ---------------- TIMELINE ---------------- */
  var tl = $("#tlBox");
  D.timeline.forEach(function (t, i) {
    var it = el("div", "tl-item rv " + t.type + (t.head ? " head" : ""));
    it.style.transitionDelay = (i * 70) + "ms";
    var tags = (t.tags || []).map(function (x) { return '<span class="tl-tag">' + esc(x) + "</span>"; }).join("");
    it.innerHTML =
      '<div class="tl-node"></div>' +
      '<div class="tl-top"><span class="tl-date">' + t.date + "</span>" +
      (t.sha ? '<span class="tl-sha">' + t.sha + "</span>" : "") +
      (t.head ? '<span class="tl-badge-head">HEAD</span>' : "") + tags + "</div>" +
      "<h3>" + esc(t.title) + "</h3><p>" + esc(t.desc) + "</p>";
    tl.appendChild(it);
  });

  /* ---------------- ARCHITECTURE ---------------- */
  var arch = $("#arch");
  D.architecture.layers.forEach(function (L, i) {
    if (i > 0) arch.appendChild(el("div", "arch-arrow rv", "▼"));
    var c = el("div", "layer rv");
    c.style.setProperty("--c", L.color);
    c.style.transitionDelay = (i * 100) + "ms";
    c.innerHTML =
      '<div class="layer-id"><div class="nm">' + esc(L.name) + '</div><div class="en">' + esc(L.en) + '</div>' +
      '<div class="md">' + esc(L.model) + "</div></div>" +
      '<div class="layer-body"><p>' + esc(L.desc) + '</p><div class="layer-io">' + esc(L.io) + "</div></div>";
    arch.appendChild(c);
  });
  var loop = $("#loop");
  D.architecture.loop.forEach(function (s, i) {
    if (i > 0) loop.appendChild(el("span", "loop-sep", "→"));
    loop.appendChild(el("span", "loop-step", esc(s)));
  });
  loop.appendChild(el("span", "loop-sep", "↻"));

  /* ---------------- MODELS ---------------- */
  var mb = $("#modelGrid");
  D.models.forEach(function (M, i) {
    var c = el("div", "card model rv");
    c.style.setProperty("--c", M.color);
    c.style.transitionDelay = (i % 2) * 90 + "ms";
    c.innerHTML =
      '<div class="model-top"><div class="model-mark" style="font-size:' + (M.name.length > 5 ? 10 : M.name.length > 3 ? 12 : 15) + 'px">' + esc(M.name) + "</div>" +
      '<div><h3>' + esc(M.name) + '</h3><div class="full">' + esc(M.full) + "</div>" +
      '<span class="model-role">' + esc(M.role) + "</span></div></div>" +
      '<p class="why">' + esc(M.why) + "</p>" +
      "<ul>" + M.metrics.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="model-foot">' +
      '<div><span class="k">依据</span><span class="base">' + esc(M.base) + "</span></div>" +
      '<div><span class="k">否决</span><span class="rej">' + esc(M.rejected) + "</span></div></div>";
    mb.appendChild(c);
  });

  /* ---------------- EXPERIMENT ---------------- */
  var MAXPCT = 40;
  var exp = $("#exp");
  D.experiment.strategies.forEach(function (s, i) {
    var row = el("div", "exp-row rv" + (s.hero ? " hero" : ""));
    row.style.transitionDelay = (i * 100) + "ms";
    row.innerHTML =
      '<div class="exp-name">' + esc(s.name) + "<small>" + esc(s.desc) + "</small></div>" +
      '<div class="exp-track">' +
        '<div class="exp-fill range" style="background:' + s.color + '" data-w="' + (s.high / MAXPCT * 100) + '"></div>' +
        '<div class="exp-fill core" style="background:' + s.color + '" data-w="' + (s.low / MAXPCT * 100) + '"></div>' +
      "</div>" +
      '<div class="exp-val" style="color:' + s.color + '">' +
      (s.high === 0 ? "基准" : s.low + "–" + s.high + "%") + "</div>";
    exp.appendChild(row);
  });
  $("#expNote").textContent = D.experiment.note;

  /* ---------------- INNOVATIONS ---------------- */
  var inv = $("#innov");
  D.innovations.forEach(function (v, i) {
    var c = el("div", "card inv rv");
    c.style.transitionDelay = (i % 2) * 90 + "ms";
    c.innerHTML = '<div class="inv-n">' + v.n + "</div><div><h3>" + esc(v.title) + "</h3><p>" + esc(v.desc) + "</p></div>";
    inv.appendChild(c);
  });

  /* ---------------- FACTS ---------------- */
  var fb = $("#factGrid");
  D.facts.forEach(function (f, i) {
    var c = el("div", "card fact rv" + (f.fixed ? " fixed" : "") + (f.warn ? " warn" : ""));
    c.style.transitionDelay = (i % 3) * 80 + "ms";
    c.innerHTML = '<div class="k">' + esc(f.k) + '</div><div class="d">' + esc(f.d) + "</div>" +
      (f.fixed ? '<span class="flag">已修正 · ' + esc(f.was) + "</span>" : "") +
      (f.warn ? '<span class="flag">第三方估算值</span>' : "") +
      '<div class="s">来源：' + esc(f.s) + "</div>";
    fb.appendChild(c);
  });

  /* ---------------- PROPOSAL ---------------- */
  var cl = $("#checklist");
  D.proposal.forEach(function (p, i) {
    var c = el("div", "chk rv" + (p.done ? " done" : ""));
    c.style.transitionDelay = (i * 45) + "ms";
    c.innerHTML = '<div class="chk-box">✓</div>' +
      '<div class="chk-name">' + esc(p.name) + "<small>" + esc(p.note) + "</small></div>" +
      '<div class="chk-limit">' + esc(p.limit) + "</div>";
    cl.appendChild(c);
  });

  /* ---------------- ROADMAP ---------------- */
  var rm = $("#roadGrid");
  D.roadmap.forEach(function (p, i) {
    var c = el("div", "card phase rv");
    c.style.setProperty("--c", p.color);
    c.style.transitionDelay = (i * 90) + "ms";
    c.innerHTML =
      '<div class="phase-h"><span class="p">' + esc(p.phase) + '</span><span class="w">' + esc(p.period) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3><ul>" +
      p.tasks.map(function (t) { return '<li><span class="phase-dot"></span><span>' + esc(t) + "</span></li>"; }).join("") +
      '</ul><div class="phase-status"><span class="d"></span>待启动 · 0 / ' + p.tasks.length + " 完成</div>";
    rm.appendChild(c);
  });

  /* ---------------- PAPERS ---------------- */
  var catColor = {
    "LCA 基础": "#00e5a0", "LLM 碳足迹": "#f472b6", "碳感知调度": "#22d3ee",
    "模型方法": "#a78bfa", "指标与政策": "#facc15"
  };
  var cats = ["全部"];
  D.papers.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });
  var fb2 = $("#filters");
  cats.forEach(function (c, i) {
    var n = c === "全部" ? D.papers.length : D.papers.filter(function (p) { return p.cat === c; }).length;
    var b = el("button", "filter" + (i === 0 ? " on" : ""), esc(c) + '<span class="n">' + n + "</span>");
    b.dataset.cat = c;
    b.addEventListener("click", function () {
      fb2.querySelectorAll(".filter").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      document.querySelectorAll(".paper").forEach(function (p) {
        p.classList.toggle("hide", c !== "全部" && p.dataset.cat !== c);
      });
    });
    fb2.appendChild(b);
  });
  var pb = $("#paperGrid");
  D.papers.forEach(function (p, i) {
    var col = catColor[p.cat] || "#9fb2ae";
    var c = el("div", "card paper rv");
    c.dataset.cat = p.cat;
    c.style.transitionDelay = ((i % 3) * 70) + "ms";
    c.innerHTML =
      '<div class="paper-h"><span class="paper-cat" style="color:' + col + '">' + esc(p.cat) + "</span>" +
      '<span class="paper-yr">' + p.year + "</span></div>" +
      "<h3>" + esc(p.title) + '</h3><div class="venue">' + esc(p.venue) + "</div>" +
      "<p>" + esc(p.note) + '</p><div class="fn">' + esc(p.file) + ".pdf</div>";
    pb.appendChild(c);
  });

  /* ---------------- SCORING ---------------- */
  var sr = $("#scoreRows");
  D.scoring.items.forEach(function (s, i) {
    var c = el("div", "score-row rv");
    c.style.transitionDelay = (i * 80) + "ms";
    c.innerHTML =
      '<div class="score-top"><span class="n">' + esc(s.name) + "</span>" +
      '<span class="v">' + s.low + "–" + s.high + " <em>/ " + s.max + "</em></span></div>" +
      '<div class="score-track">' +
        '<div class="score-hi" data-w="' + (s.high / s.max * 100) + '"></div>' +
        '<div class="score-lo" data-w="' + (s.low / s.max * 100) + '"></div>' +
      '</div><div class="score-note">' + esc(s.note) + "</div>";
    sr.appendChild(c);
  });
  var T = D.scoring.total;
  $("#scoreTotal").innerHTML =
    '<div class="lbl">预估总分</div>' +
    '<div class="num"><span data-count="' + T.low + '">0</span>–<span data-count="' + T.high + '">0</span></div>' +
    '<div class="max">/ ' + T.max + " 分</div>" +
    '<div class="verdict">' + esc(D.scoring.verdict) + "</div>";

  /* ---------------- MEMORY ---------------- */
  var mem = $("#mem");
  D.memory.forEach(function (x, i) {
    var c = el("div", "card mem-card rv");
    c.style.setProperty("--c", x.color);
    c.style.transitionDelay = ((i % 4) * 70) + "ms";
    c.innerHTML = '<span class="mem-type">' + esc(x.type) + "</span><h3>" + esc(x.title) + "</h3>" +
      "<p>" + esc(x.desc) + '</p><div class="mem-risk">' + esc(x.risk) + "</div>" +
      '<div class="mem-file">' + esc(x.file) + ".md</div>";
    mem.appendChild(c);
  });

  /* ---------------- TREE ---------------- */
  var ico = { dir: "📁", md: "📄", pdf: "📕", doc: "📘" };
  var tree = $("#tree");
  function row(n, child) {
    var r = el("div", "tree-row " + n.type + (child ? " child" : ""));
    r.innerHTML = '<span class="tree-ico">' + (ico[n.type] || "📄") + "</span>" +
      '<span class="tree-name">' + esc(n.name) + "</span>" +
      (n.size ? '<span class="tree-size">' + esc(n.size) + "</span>" : "") +
      '<span class="tree-desc">' + esc(n.desc) + "</span>";
    return r;
  }
  D.tree.forEach(function (n) {
    tree.appendChild(row(n, false));
    (n.children || []).forEach(function (c) { tree.appendChild(row(c, true)); });
  });

  /* ---------------- RISKS ---------------- */
  var rb = $("#riskGrid");
  var lvName = { high: "高优先级", mid: "中优先级", low: "低优先级" };
  D.risks.forEach(function (r, i) {
    var c = el("div", "card risk rv " + r.level);
    c.style.transitionDelay = (i * 70) + "ms";
    c.innerHTML = '<span class="risk-lv">' + lvName[r.level] + "</span>" +
      "<div><h3>" + esc(r.title) + "</h3><p>" + esc(r.desc) + "</p></div>";
    rb.appendChild(c);
  });

  /* ---------------- FOOTER ---------------- */
  var kw = $("#kw");
  m.keywords.forEach(function (k) { kw.appendChild(el("span", "", esc(k))); });
  $("#footMeta").innerHTML =
    "首次提交 " + m.firstCommit + "<br>最新提交 " + m.lastCommit + "<br>" +
    "分支 " + m.branch + " · " + m.headSha + "<br>可见性 " + m.visibility;

  /* 自动同步状态（由 tools/ 管线更新 meta.syncedAt） */
  var sn = $("#syncNote");
  if (sn) {
    var st = m.stats || {};
    var when = m.syncedAt ? new Date(m.syncedAt) : null;
    var sHtml = "";
    if (when) {
      sHtml = '<span class="chip">● 自动同步 ' + when.toLocaleString("zh-CN", { hour12: false }) + '</span>' +
        (st.commits != null ? ' <span class="chip">' + st.commits + ' commits</span>' : "") +
        (st.files != null ? ' <span class="chip">' + st.files + ' files</span>' : "") +
        (st.pdf != null ? ' <span class="chip">' + st.pdf + ' refs</span>' : "");
    } else {
      sHtml = '<span class="chip">● 静态快照 · 运行 node tools/ 构建管线后自动更新</span>';
    }
    sn.innerHTML = sHtml + '<span>数据来源：私有仓库 ' + m.repo + '</span>';
  }

  /* ---------------- REVEAL + ANIMATIONS ---------------- */
  var STATIC = /[?&]static=1/.test(location.search);
  var REDUCED = STATIC || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function animateCount(node) {
    var target = parseFloat(node.dataset.count);
    if (!isFinite(target)) return;
    var dec = parseInt(node.dataset.dec || "0", 10);
    node.textContent = target.toFixed(dec);
    if (REDUCED) return;
    var dur = 1400, t0 = performance.now();
    node.textContent = (0).toFixed(dec);
    function step(t) {
      var k = (t - t0) / dur;
      k = k < 0 ? 0 : k > 1 ? 1 : k;
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = (target * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
      else node.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(step);
  }

  function activate(node) {
    node.classList.add("in");
    node.querySelectorAll("[data-count]").forEach(function (n) {
      if (!n.dataset.done) { n.dataset.done = "1"; animateCount(n); }
    });
    if (node.dataset && node.dataset.count && !node.dataset.done) { node.dataset.done = "1"; animateCount(node); }
    node.querySelectorAll(".ring-fg").forEach(function (c) {
      c.style.strokeDashoffset = CIRC * (1 - parseFloat(c.dataset.pct) / 100);
    });
    node.querySelectorAll("[data-w]").forEach(function (n) { n.style.width = n.dataset.w + "%"; });
  }

  var revealAll = function () {
    document.querySelectorAll(".rv:not(.in)").forEach(function (n) { activate(n); });
  };

  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { activate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".rv").forEach(function (n) { io.observe(n); });
  } else {
    revealAll();
  }

  /* static mode: ?static=1 renders everything immediately (screenshots / printing) */
  if (STATIC) { document.body.classList.add("static"); revealAll(); }
  window.addEventListener("beforeprint", revealAll);

  /* hero visible immediately */
  setTimeout(function () {
    document.querySelectorAll(".hero .rv").forEach(function (n) { activate(n); if (io) io.unobserve(n); });
  }, 90);

  /* pointer glow on cards */
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest ? e.target.closest(".card") : null;
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  /* nav */
  var nav = $("#nav"), bar = $("#scrollBar");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);

  function onScroll() {
    var y = window.scrollY || 0;
    nav.classList.toggle("scrolled", y > 24);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    var cur = null;
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= 140) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var tgl = $("#navToggle"), nl = $("#navLinks");
  tgl.addEventListener("click", function () { nl.classList.toggle("open"); });
  nl.addEventListener("click", function (e) { if (e.target.tagName === "A") nl.classList.remove("open"); });
})();
