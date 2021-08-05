const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { erroHandler } = require("./middlewares/error-handler");
const productCreatedListener = require('./events/authListener')
//Load Config
dotenv.config({ path: "./config/config.env" });

//db connecnt
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
app.use(erroHandler);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Auth Server Listening on port ${PORT}`);
});
