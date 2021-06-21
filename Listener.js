const nats = require("node-nats-streaming");
console.clear();
const { randomBytes } = require("crypto");
const stan = nats.connect("nice", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS!");

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
    console.log("Event data!", data);
    msg.ack();
  }
}

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

module.exports.Listener = Listener;
