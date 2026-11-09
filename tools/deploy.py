import json, os, subprocess, sys, zipfile, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "app")
DIST = os.path.join(APP, "dist")
ENV = os.path.join(ROOT, ".env")
TOKEN = None
if os.path.exists(ENV):
    for line in open(ENV):
        line=line.strip()
        if line.startswith("HOSTINGER_TOKEN="):
            TOKEN = line.split("=",1)[1].strip()
if not TOKEN:
    TOKEN = os.environ.get("HOSTINGER_TOKEN")
if not TOKEN:
    print("No HOSTINGER_TOKEN"); sys.exit(1)

USERNAME = "u388521040"
DOMAIN = "kryptonenergy.in"
ZIP_NAME = "dist.zip"
ZIP_PATH = os.path.join(ROOT, ZIP_NAME)

def api(path, method="GET", body=None):
    url = "https://developers.hostinger.com" + path
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json",
        "User-Agent": "krypton-deploy/1.0",
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            raw = r.read()
            return r.status, (json.loads(raw) if raw else {})
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read())
        except Exception:
            return e.code, {"error": str(e)}

def build():
    print("Building app...")
    subprocess.run(["npm.cmd","run","build"], cwd=APP, check=True, shell=True)

def make_zip():
    print("Zipping dist...")
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        for root,_,files in os.walk(DIST):
            for f in files:
                full = os.path.join(root, f)
                arc = os.path.relpath(full, DIST)
                z.write(full, arc)
    print("Zip size:", os.path.getsize(ZIP_PATH))

def get_upload_url():
    status, info = api("/api/hosting/v1/files/upload-urls", "POST", {
        "username": USERNAME, "domain": DOMAIN, "path": "/"
    })
    if status != 200:
        raise RuntimeError("upload-url failed: %s %s" % (status, info))
    return info["url"], info["auth_key"], info["rest_auth_key"]

def upload():
    url, auth, rest = get_upload_url()
    size = os.path.getsize(ZIP_PATH)
    create_url = url + "/" + ZIP_NAME + "?override=true"
    # create
    req = urllib.request.Request(create_url, data=b"", method="POST", headers={
        "X-Auth": auth, "X-Auth-Rest": rest, "Tus-Resumable": "1.0.0",
        "Upload-Length": str(size), "Upload-Offset": "0", "User-Agent": "krypton-deploy/1.0",
    })
    with urllib.request.urlopen(req, timeout=120) as r:
        print("Create upload:", r.status)
    # patch in chunks
    chunk = 5 * 1024 * 1024
    offset = 0
    with open(ZIP_PATH, "rb") as f:
        while offset < size:
            data = f.read(chunk)
            if not data:
                break
            req = urllib.request.Request(create_url, data=data, method="PATCH", headers={
                "X-Auth": auth, "X-Auth-Rest": rest, "Tus-Resumable": "1.0.0",
                "Content-Type": "application/offset+octet-stream",
                "Upload-Offset": str(offset), "User-Agent": "krypton-deploy/1.0",
            })
            with urllib.request.urlopen(req, timeout=300) as r:
                new_offset = int(r.headers.get("Upload-Offset", offset + len(data)))
                print("Uploaded", new_offset, "/", size)
                offset = new_offset
    if offset != size:
        raise RuntimeError("Upload incomplete: %d/%d" % (offset, size))
    print("Upload complete")

def deploy():
    status, info = api("/api/hosting/v1/accounts/%s/websites/%s/deploy" % (USERNAME, DOMAIN), "POST", {
        "archive_path": ZIP_NAME
    })
    print("Deploy status:", status, info)
    if status not in (200, 202):
        raise RuntimeError("Deploy failed: %s %s" % (status, info))

if __name__ == "__main__":
    build()
    make_zip()
    upload()
    deploy()
    print("DONE")
