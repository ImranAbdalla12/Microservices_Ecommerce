const nats = require("node-nats-streaming");
console.clear();
const stand = nats.connect("nice", "abc", {
  url: "http://localhost:4222",
});

stand.on("connect", async () => {
  console.log("Publisher contected to NATS");
  const data = JSON.stringify({
    id: "123",
    title: "laptop",
    price: 20,
  });
});

class Publisher {
  constructor(subject, client) {
    this.subject = subject;
    this.client = stand;
  }

  publish(data) {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, data, (err) => {
        if (err) {
          return reject(err);
        }
        console.log("Event published to subject", this.subject);
        resolve();
      });
    });
  }
}

module.exports.Publisher = Publisher;
