const http = require("http");

const PORT = process.env.PORT || 4000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Node App</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      padding: 20px;
      background: #020617;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav a {
      margin-left: 16px;
      color: #94a3b8;
      text-decoration: none;
    }
    nav a:hover {
      color: #fff;
    }
    main {
      flex: 1;
      padding: 40px;
    }
    .card {
      background: #1e293b;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    button {
      margin-top: 12px;
      padding: 10px 16px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    footer {
      padding: 16px;
      text-align: center;
      background: #020617;
      color: #64748b;
    }
  </style>
</head>
<body>

<header>
  <h2>🚀 Node App</h2>
  <nav>
    <a href="#">Home</a>
    <a href="#">Docs</a>
    <a href="#">Contact</a>
  </nav>
</header>

<main>
  <div class="card">
    <h1>Welcome</h1>
    <p>This is a single-file Node.js app with embedded HTML.</p>
    <button onclick="alert('It works!')">Click me</button>
  </div>

  <div class="grid">
    <div class="card">
      <h3>Simple</h3>
      <p>No frameworks, no build step.</p>
    </div>
    <div class="card">
      <h3>Deployable</h3>
      <p>Perfect for Docker + ECR + ECS.</p>
    </div>
    <div class="card">
      <h3>Fast</h3>
      <p>Minimal overhead, just Node HTTP.</p>
    </div>
  </div>
</main>

<footer>
  © ${new Date().getFullYear()} Node App
</footer>

</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});