const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { erroHandler } = require("./middlewares/errorhandling");
const UserCreatedListener = require('./events/productListener')
const ProductCreatedPublisher = require('./events/productPublisher')
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


const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Product Server Listening on port ${PORT}`);
});
