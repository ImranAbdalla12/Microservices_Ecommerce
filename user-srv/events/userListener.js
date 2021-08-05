const nats = require("node-nats-streaming");
const stan = nats.connect("nice", "user-srv-listener-123", {
  url: "http://nats-srv:4222",
});

const User = require("../models/user");
const Product = require("../models/product");
stan.on("connect", () => {
  console.log("Listener connected to NATS!");
  new UserCreatedListener("user:created", "user-group").listen();
  new UserupdatedListener("user:updated", "user-group").listen();
  new productCreatedListener('product:created', 'user-group').listen()
  new productUpdatedListener('product:updated', 'user-group').listen()
  new productRemovedListener('product:removed', 'user-group').listen()
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
    console.log("Received Event User Created ===========", data);
    const { _id, name, email, role } = data;
    try {
      await new User({
        email,
        name,
        role,
        _id,
      }).save();
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}
class UserupdatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Received Event User Updated ==============", data);
    const { _id, name, email, role } = data;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { _id, name, role },
        { new: true }
      );
      if (updatedUser) {
        console.log("User Updated", updatedUser);
      } else {
        const newUser = await new User({
          _id,
          role,
          email,
          name: email.split("@")[0],
        }).save();
        console.log(
          "DID NOT FOUND USER TO UDPATE, USER CREATED ============",
          newUser
        );
      }
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
  }
}

class productCreatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Product Created ========", data);
    try {
      const newProduct = await new Product(data).save();
      console.log("Product CREATED", newProduct);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
    msg.ack();
  }
}

class productUpdatedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Product Updated =========", data);
    const {
      _id,
      title,
      slug,
      description,
      category,
      subs,
      quantity,
      sold,
      shipping,
      color,
      brand,
      ratings,
      price,
      images,
    } = data;
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id },
        {
          _id,
          title,
          slug,
          description,
          category,
          subs,
          quantity,
          sold,
          shipping,
          color,
          brand,
          ratings,
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
    msg.ack();
  }
}
class productRemovedListener extends Listener {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  async onMessage(data, msg) {
    console.log("Product Removed =========", data);
    const { _id, title, price, images } = data;
    try {
      const removedProduct = await Product.findOneAndRemove({ _id }).exec();
      console.log("Product REMOVED", removedProduct);
      msg.ack();
    } catch (error) {
      throw new Error(error);
    }
    msg.ack();
  }
}
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
