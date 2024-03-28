const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const path = require("path");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(helmet());

const whitelist = ["http://localhost:3000", "http://localhost:8000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || undefined === origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
