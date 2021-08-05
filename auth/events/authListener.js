const nats = require("node-nats-streaming");
const { randomBytes } = require("crypto");
const stan = nats.connect("nice", "auth-listener-123", {
  url: "http://nats-srv:4222",
});
const Product = require("../models/productModel");
stan.on("connect", () => {
  console.log("Listener connected to NATS!");
  new productCreatedListener("product:created", "auth-group").listen();
  new productUpdatedListener("product:updated", "auth-group").listen();
  new productCreatedListener('product:created', 'auth-group').listen()
  new productUpdatedListener('product:updated', 'auth-group').listen()
  new productRemovedListener('product:removed', 'auth-group').listen()
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
});

class Listener {
  constructor(subject, queueGroupName, ackWait, client) {
    this.subject = subject;
    this.queueGroupName = queueGroupName;
    this.ackWait = 5 * 1000;
    this.client = stan;
  }

  subscriptionOptions() {
    this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode()
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subsscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subsscription.on("message", (msg) => {
      console.log(`Message received ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg) {
    const data = msg.getData();
    return typeof data === String
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
  onMessage(data, msg) {
    console.log(
      "Event data! ================================================",
      data
    );
    msg.ack();
  }
}

class productCreatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Product Created ========", data);
    const { _id, title, price, images } = data;
    try {
      const newProduct = await new Product({
        _id,
        title,
        price,
        images,
      }).save();
      console.log("Product CREATED", newProduct);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}
class productUpdatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Product Updated =========", data);
    const { _id, title, price, images } = data;
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        {
          _id,
          title,
          price,
          images,
        },
        { new: true }
      );
      console.log("Product UPDATED", updatedProduct);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}
class productRemovedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Received Product Delete =========", data);
    const { _id, title, price, images } = data;
    try {
      const removedProduct = await Product.findOneAndRemove({ _id }).exec();
      console.log("Product REMOVED", removedProduct);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
