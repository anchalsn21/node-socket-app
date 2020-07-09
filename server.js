require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 4120;
const bodyParser = require("body-parser");
const cors=require('cors')
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const roomRoutes = require("./routes/rooms");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// Mongoose connect
let url =process.env.DB_URL || "mongodb+srv://test:test123@cluster0-d4nax.mongodb.net/testing?retryWrites=true&w=majority"
mongoose.connect( url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) throw new Error("Db connection failed");

    console.log("db connected successfully");
  }
);

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/chat", chatRoutes);



app.use('/', async(req, res)=>
{
   
	res.json({status:404, message:"Api path incorrect, Not found"})
}); 











app.listen(port, () => console.log(`listening on http://localhost:${port}`));
