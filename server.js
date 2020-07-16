require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 4120;
const bodyParser = require("body-parser");
const cors = require("cors");
const socketio = require("socket.io");
const server = http.createServer(app);
const db = require("./models/index");
const { getUserDetails } = require("./utils/utility");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Mongoose connect
let url =
  process.env.DB_URL ||
  "mongodb+srv://test:test123@cluster0-d4nax.mongodb.net/testing?retryWrites=true&w=majority";
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err, res) => {
    if (err) throw new Error("Db connection failed");

    console.log("db connected successfully");
  }
);

const io = socketio(server);

io.on("connection", async socket => {
  console.log("connected to the socket====");

  socket.on("joinRoom", async data => {
    const { roomName, userName } = data;
    try {
      console.log("data===socket===", data);

      let roomExistCheck = await db.chatRooms.find({ name: roomName });
      // console.log("roomExistchecck", roomExistCheck);

      if (!roomExistCheck.length) {
        let updateObj = {
          name: roomName,
          users: [data.userName]
        };
        const update = await db.chatRooms.findOneAndUpdate(
          { name: roomName },
          updateObj,
          { upsert: true, returnNewDocument: true }
        );
        
      } else {
        const update = await db.chatRooms.findOneAndUpdate(
          { name: roomName },
          { $addToSet: { users: data.userName } }
        );
       
      }
    } catch (error) {
      console.log("error====", error);
    }

    const getDetails = await getUserDetails(roomName, userName);

    socket.emit("details", getDetails);
  });
});

app.use("/", async (req, res) => {
  res.json({ status: 404, message: "Api path incorrect, Not found" });
});

server.listen(port, () => console.log(`listening on http://localhost:${port}`));
