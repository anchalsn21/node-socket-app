const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: ""
    },
    email: {
      type: String
    },
    password: { type: String },
    age: {
      type: Number,
      default: 18
    },
    role: {
      type: Number,
      default: 1 //1 for normal user 2 for admin or any other role as per requirement
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
