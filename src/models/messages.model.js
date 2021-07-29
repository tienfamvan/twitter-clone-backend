import mongoose from "mongoose";

const messagesSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messagesSchema);

export default Messages;
