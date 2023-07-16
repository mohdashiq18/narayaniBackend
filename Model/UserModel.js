const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },
  number: { type: String, required: true },
  last_visit: { type: String, required: true },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
