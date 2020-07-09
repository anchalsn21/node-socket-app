require('dotenv').config()
const express = require("express");
const router = express.Router();
const db = require("../models/index");
const md5 = require("md5");
const auth = require("../middlewares/auth");
const moment = require("moment");

/**
 *  For getting all messages by roomId
 *
 */

router.get("/getallmessages", async (req, res) => {
 
     let { roomId } = req.query;
  const data = await db.messages
    .find({ roomId: roomId })
    .populate({ path: "readBy", select: "name , email" });
  console.log(data);
  res.json(data);
});

/**
 *  For creating a chat message
 *
 * params: roomId
 *
 */

router.post("/sendmessage", auth.verifyToken, async (req, res) => {
  const { roomId, content } = req.body;
  const sender = req.userDetails._id || req.userDetails.userId;

  const query = {
    roomId,
    sender,
    timestamp: moment().unix(),
    content,
    readBy: [sender]
  };

  const data = await db.messages.create(query);
  console.log("db==", data);
  res.send("success");
});

module.exports = router;
