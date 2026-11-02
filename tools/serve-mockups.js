const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = 4321;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    const clean = decodeURIComponent(req.url.split("?")[0]);
    const file = path.join(root, clean === "/" ? "/mockups/concept-01-instrument.html" : clean);
    if (!file.startsWith(root)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" }).end("Not found: " + clean);
        return;
      }
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      res.end(buf);
    });
  })
  .listen(port, () => console.log("mockup server on http://localhost:" + port));
