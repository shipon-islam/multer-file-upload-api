const mongoose = require("mongoose");

const postScrema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    post: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },

  { timestamps: true }
);

const postModal = mongoose.model("post", postScrema);
module.exports = postModal;
