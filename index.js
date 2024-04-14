const cors = require("cors");
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
app.use(cors());

const host = "127.0.0.1";
const port = 3000;

https
  .createServer(
    {
      key: fs.readFileSync("/cert/key.pem"),
      cert: fs.readFileSync("/cert/cert.pem"),
    },
    app
  )
  .listen(port, host, function () {
    console.log(`Server listens https://${host}:${port}`);
  });

app.post("/proxy", async (req, res) => {
  const { url } = req.body;

  const res = await fetch(url).then((r) => r.json());

  return res.send({
    response: res,
  });
});
