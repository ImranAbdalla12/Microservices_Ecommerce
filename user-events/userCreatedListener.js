const Listner = require("../listener");

module.exports = class UserCreatedListener extends Listner {
  constructor(subject, queueGroupName) {
    super(subject, queueGroupName);
  }
  onMessage(data, msg) {
    console.log("Event data!", data);
    msg.ack();
  }
};
