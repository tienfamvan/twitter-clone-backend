import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    profileImage: {
      type: String,
      required: false,
      default: "https://i.imgur.com/WxNkK7J.png",
    },
    banner: {
      type: String,
      required: false,
      default: "https://i.imgur.com/i9umepr.png",
    },
    location: {
      type: String,
      required: false,
      default: "",
    },
    website: {
      type: String,
      required: false,
      default: "",
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    notifications: {
      type: Array,
      required: false,
      default: [],
    },
    theme: {
      type: String,
      default: "light",
    },
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
