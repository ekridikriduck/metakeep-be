const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authenticatedRoute = require("./routes");
const config = require("./config");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOpts));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI =
  "mongodb://nadeemkhan:B2QJZsgCOQWTWSZq@development-shard-00-00.wegse.mongodb.net:27017,development-shard-00-01.wegse.mongodb.net:27017,development-shard-00-02.wegse.mongodb.net:27017/metakeep?ssl=true&replicaSet=atlas-t39yui-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use("/api", authenticatedRoute);

const PORT = 3001;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
