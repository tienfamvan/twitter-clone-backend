import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    banner: {
      type: String,
      required: false,
      default: "https://i.imgur.com/i9umepr.png",
    },
    users: [
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
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
