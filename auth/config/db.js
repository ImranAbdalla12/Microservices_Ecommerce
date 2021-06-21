const mongoose = require("mongoose");
const { newConnection } = require("nats-ecom-streaming");

const connectDB = async () => {
  try {
    await newConnection.connect("nice", "auth123", "http://nats-srv:4222");
    // newConnection.connect("close", () => {
    //   console.log("NATS connection closed");
    //   process.exit();
    // });
    // process.on("SIGINT", () => newConnection.client.close());
    // process.on("SIGTERM", () => newConnection.client.close());

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongoose Erro", error);
    process.exit(1);
  }
};

module.exports = connectDB;
