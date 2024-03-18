const express = require("express");
const cors = require("cors");
const path = require("path");
const planetsRouter = require("./routes/planets/planets.router");

const app = express();

const whitelist = ["http://localhost:3000"];
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
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
