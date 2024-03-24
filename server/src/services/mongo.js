const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://nasa-api:8A4qJNBjD6SvTrdz@nasa-cluster.tjoyxzj.mongodb.net/nasa?retryWrites=true&w=majority&appName=nasa-cluster";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error: ", err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
