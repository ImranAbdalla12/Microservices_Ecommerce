const nats = require("node-nats-streaming");
const stan = nats.connect("nice", "product-srv-listener", {
  url: "http://nats-srv:4222",
});

const User = require("../models/userModel");

stan.on("connect", () => {
  console.log("Listener connected to NATS!");
  new UserCreatedListener("user:created", "user-srv").listen();
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

class UserCreatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Event data!", data);
    const { _id, name, email } = data;
    try {
      const newUser = await new User({
        email,
        name,
        _id,
      }).save();
      console.log("USER CREATED", newUser);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
