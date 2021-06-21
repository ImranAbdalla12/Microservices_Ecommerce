const Publisher = require("../publisher");

module.exports = class UserCreatedPublisher extends Publisher {
  constructor(subject, data) {
    super(subject, data);
  }
};
