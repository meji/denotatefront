const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.static(__dirname + "/dist/"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist/", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server listening in  port ${process.env.PORT}`)
);
console.log(process.env.API_URI);
