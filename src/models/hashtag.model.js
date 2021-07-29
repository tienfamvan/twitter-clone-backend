import mongoose from "mongoose";

const hashtagSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hashtag = mongoose.model("Hashtag", hashtagSchema);

export default Hashtag;
