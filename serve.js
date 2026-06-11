const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".wasm": "application/wasm",
  ".py": "text/plain",
  ".sqlite": "application/octet-stream",
  ".png": "image/png",
};

http
  .createServer((req, res) => {
    const file = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ext = path.extname(file);
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      });
      res.end(data);
    });
  })
  .listen(8080, () => console.log("Serving at http://localhost:8080"));
