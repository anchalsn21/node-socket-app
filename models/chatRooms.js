const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema(
  {
    name: { type: String, default: "" },
    // participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    users:[{
     type:String
    }
    ],
    userCount:{type:Number , default:1}
    // type: {
    //   type: String,
    //   enum: ["im", "group"]
    // },
    // msgs: { type: Number }, // count total msgs
    // timestamp: {
    //   type: Number
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoom", roomsSchema);
