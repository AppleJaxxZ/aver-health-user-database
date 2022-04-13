const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  pinNumber: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  subscriptions: [],

});
userSchema.set('toObject')

module.exports = mongoose.model("User", userSchema);
