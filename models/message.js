const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room"
    },
    content: {
      type: String,
      default: ""
    },
    timestamp: {
      type: Number
    },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messagesSchema);
