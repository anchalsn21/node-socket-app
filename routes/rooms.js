const express = require("express");
const router = express.Router();
const db = require("../models/index");
const md5 = require("md5");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const moment = require("moment");

router.get("/allrooms", auth.verifyToken, async (req, res) => {
  try {
    let sender = req.userDetails._id || req.userDetails.userId;
    sender = new mongoose.Types.ObjectId(sender);
    console.log("sender===", sender);
    const data = await db.rooms.aggregate([
      {
        $match: {
          participants: sender
        }
      },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "roomId",
          as: "allMsg"
        }
      },
      {
        $unwind: {
          path: "$allMsg",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: {
          "allMsg.timestamp": -1.0
        }
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
            roomId: "$roomId",
            participants: "$participants"
          },
          allMessages: {
            $push: "$allMsg"
          },
          lastMessage: {
            $first: "$allMsg"
          }
        }
      },
      {
        $unwind: {
          path: "$allMessages",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "allMessages.readBy": {
            $ne: [sender]
          }
        }
      },
      {
        $project: {
          _id: "$_id._id",
          participants: "$_id.participants",
          lastMessage: "$lastMessage",
          allMessage: "$allMessages",
          name: "$_id.name"
        }
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
            roomId: "$_id",
            participants: "$participants",
            lastMessage: "$lastMessage"
          },
          allMessages: {
            $push: "$allMessage"
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.participants",
          foreignField: "_id",
          as: "memberDetails"
        }
      },
      {
        $project: {
          _id: "$_id._id",
          roomId: "$_id._id",
          roomName: "$_id.name",
          lastMessage: "$_id.lastMessage",
          allUnreadMessages: "$allMessages",
          unreadCount: {
            $size: "$allMessages"
          },
          participants: "$_id.participants",
          "memberDetails.name": 1.0,
          "memberDetails.email": 1.0,
          "memberDetails._id": 1.0
        }
      }
    ]);

    res.json({
      status: 200,
      message: "Room Data fetched successfully",
      data: "data",
      data
    });
  } catch (error) {
    console.log("error", error);

    res.json({ data: "data", error: error });
  }
});

/**
 * For creating a room
 * params:
 * name,
 *
 *
 */

router.post("/create", auth.verifyToken, async (req, res) => {
  const { name, type } = req.body;
  const { _id } = req.userDetails;
  const query = {
    name: name,
    type: type,
    timestamp: moment().unix(),
    participants: [_id]
  };
  console.log("query===", query);

  const exist = await db.rooms.find({ name: name });
  if (exist.length)
    return res.json({ status: 409, message: "already exist", data: [] });

  const data = await db.rooms.create(query);
  console.log("db==", data);
  return res.send("success");
});

/**
 * For adding a new user to the group , params:
 * params : roomid , userId
 *  */

router.post("/addnewuser", async (req, res) => {
  const { roomId, userId } = req.body;

  const update = await db.rooms.findOneAndUpdate(
    { _id: roomId },
    { $addToSet: { participants: userId } },
    { returnNewDocument: true }
  );
  console.log("db==", update);
  return res.send("success");
});

module.exports = router;
