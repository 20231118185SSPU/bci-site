import json, urllib.request, urllib.error, base64, os, sys

TOKEN, REPO, BRANCH, ROOT = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]

def api(method, url, body=None):
    req = urllib.request.Request("https://api.github.com" + url, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": "Bearer " + TOKEN, "Accept": "application/vnd.github+json", "User-Agent": "api-push"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            txt = r.read()
            return r.status, (json.loads(txt) if txt else {})
    except urllib.error.HTTPError as e:
        return e.code, json.load(e)

SKIP = {"repo-state.json", "assets/data.bak.js", "tools/.ghtoken.tmp"}
todo = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d != ".git"]
    for fn in filenames:
        rel = os.path.relpath(os.path.join(dirpath, fn), ROOT).replace("\\", "/")
        if rel in SKIP: continue
        if rel.startswith(".github/workflows/"): continue   # API 禁止写 workflows，gh-pages 也不需要
        todo.append(rel)
todo.sort()
print("files:", len(todo))

entries = []
for i, rel in enumerate(todo):
    data = open(os.path.join(ROOT, rel), "rb").read()
    code, d = api("POST", "/repos/" + REPO + "/git/blobs", {"content": base64.b64encode(data).decode(), "encoding": "base64"})
    if code != 201:
        print("blob fail", rel, code, d); sys.exit(1)
    entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": d["sha"]})

code, t = api("POST", "/repos/" + REPO + "/git/trees", {"tree": entries})
print("tree", code, t.get("sha","")[:8] if code==201 else str(t)[:200])
if code != 201: sys.exit(1)

code, c = api("POST", "/repos/" + REPO + "/git/commits", {"message": "feat: BCI 进度看板（gh-pages）", "tree": t["sha"]})
print("commit", code, c.get("sha","")[:8] if code==201 else str(c)[:120])
if code != 201: sys.exit(1)

code, r2 = api("PATCH", "/repos/" + REPO + "/git/refs/heads/" + BRANCH, {"sha": c["sha"], "force": True})
if code not in (200, 201):
    code, r2 = api("POST", "/repos/" + REPO + "/git/refs", {"ref": "refs/heads/" + BRANCH, "sha": c["sha"]})
print("ref", code, r2.get("ref") if isinstance(r2, dict) else r2)
print("DONE")
