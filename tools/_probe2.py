import json, urllib.request, urllib.error, base64, sys
TOKEN, REPO = sys.argv[1], sys.argv[2]
def api(method, url, body=None):
    req = urllib.request.Request("https://api.github.com" + url, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": "Bearer " + TOKEN, "Accept": "application/vnd.github+json", "User-Agent": "x"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, json.load(r)
    except urllib.error.HTTPError as e: return e.code, json.load(e)

def mk(path):
    c,d = api("POST","/repos/"+REPO+"/git/blobs",{"content": base64.b64encode(b'x').decode(),"encoding":"base64"})
    return {"path":path,"mode":"100644","type":"blob","sha":d["sha"]}

tests = [
  ("2 flat", [mk("a1.txt"), mk("a2.txt")]),
  ("nested 2", [mk("tools/x.mjs"), mk("assets/y.js")]),
  ("workflows path", [mk(".github/workflows/z.yml")]),
  ("workflows + flat", [mk(".github/workflows/z.yml"), mk("a.txt")]),
  ("all my paths", [mk(".github/workflows/bci-push.yml"), mk(".github/workflows/deploy.yml"), mk(".gitignore"), mk("README.md"), mk("assets/app.js"), mk("assets/data.js"), mk("assets/style.css"), mk("index.html"), mk("tools/build-data.mjs"), mk("tools/fetch-repo-state.mjs"), mk("tools/push-via-api.mjs")]),
]
for name, entries in tests:
    s, d = api("POST","/repos/"+REPO+"/git/trees", {"tree": entries})
    print(name, "->", s, d.get("sha","")[:8] if s==201 else str(d)[:90])
