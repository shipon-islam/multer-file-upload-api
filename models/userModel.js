const mongoose = require("mongoose");
const userScrema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModal = mongoose.model("user", userScrema);
module.exports = userModal;
