import mongoose from "mongoose";

const tweetSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      default: "",
    },
    images: {
      type: Array,
      default: [],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thread: {
      type: Array,
      default: [],
    },
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    retweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
