// Builds single self-contained HTML files (fonts + images inlined as data URIs)
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

const toDataURI = (relPath) => {
  const cleanRel = relPath.replace(/^(\.\.\/)+/, "");
  const abs = path.join(ROOT, cleanRel);
  const buf = fs.readFileSync(abs);
  const mime = MIME[path.extname(abs).toLowerCase()] || "application/octet-stream";
  return { uri: `data:${mime};base64,${buf.toString("base64")}`, kb: Math.round(buf.length / 1024), cleanRel };
};

async function fetchFontStyle() {
  const cssUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap";
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }
  }).then(r => r.text());

  const blocks = css.split("/*").slice(1).map(chunk => "/*" + chunk);
  const latin = blocks.filter(b => /^\s*\/\*\s*latin\s*\*\//.test(b));
  if (!latin.length) throw new Error("no latin font blocks found; got " + blocks.length + " blocks");

  let inlinedFaces = [];
  for (const block of latin) {
    const url = (block.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1];
    if (!url) continue;
    const buf = Buffer.from(await fetch(url).then(r => r.arrayBuffer()));
    const face = block
      .replace(/\/\*\s*latin\s*\*\//, "")
      .replace(url, `data:font/woff2;base64,${buf.toString("base64")}`)
      .trim();
    inlinedFaces.push(face);
    console.log(`  font ${(face.match(/font-weight:\s*(\d+)/) || [])[1]}  ${Math.round(buf.length / 1024)} KB`);
  }
  return `<style>\n${inlinedFaces.join("\n")}\n</style>`;
}

async function buildOne(srcRel, outRel, fontStyle) {
  const SRC = path.join(ROOT, srcRel);
  const OUT = path.join(ROOT, outRel);
  let html = fs.readFileSync(SRC, "utf8");

  const headStart = html.indexOf('<link rel="preconnect"');
  const headEnd = html.indexOf("\n", html.indexOf("fonts.googleapis.com/css2"));
  html = html.slice(0, headStart) + fontStyle + html.slice(headEnd);

  const assetRefs = [...new Set([...html.matchAll(/(?:src|data-src)="((?:\.\.\/)*assets\/[^"]+)"/g)].map(m => m[1]))];
  for (const ref of assetRefs) {
    const { uri, kb, cleanRel } = toDataURI(ref);
    html = html.split(ref).join(uri);
    console.log(`  image ${cleanRel}  ${kb} KB  ->  inlined`);
  }

  fs.writeFileSync(OUT, html, "utf8");
  const leftovers = [...html.matchAll(/(?:src|href|data-src)="(?!data:|#)([^"]+)"/g)].map(m => m[1]);
  console.log("OUT:", OUT);
  console.log("SIZE:", (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), "MB");
  console.log("EXTERNAL REFS LEFT:", leftovers.length ? leftovers : "none");
  console.log("");
}

(async () => {
  const fontStyle = await fetchFontStyle();
  await buildOne("mockups/concept-01-instrument.html", "krypton-energy-concept.standalone.html", fontStyle);
  await buildOne("mockups/concept-02-record.html", "krypton-energy-concept-02.standalone.html", fontStyle);
})();
