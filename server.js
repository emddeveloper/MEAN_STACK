const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello Node");
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
