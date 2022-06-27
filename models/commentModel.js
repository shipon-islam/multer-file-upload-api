const { default: mongoose } = require("mongoose");

const commentScheema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    body: { type: String, trim: true, required: true },
    replies: [
      {
        body: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        createAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);
const commentModel = mongoose.model("comment", commentScheema);
module.exports = commentModel;
