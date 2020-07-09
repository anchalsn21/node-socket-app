const express = require("express");
const router = express.Router();
const db = require("../models/index");
const utility = require("../utils/utility");

/**
 *  For creating user
 * params:
 * email,
 * name,
 * age,
 * password (saving password without any encryption as of now)
 *
 */

router.post("/create", async (req, res) => {
  const data = await db.users.find({ email: req.body.email });
  if (data.length)
    return res.json({ staus: 409, message: "Already existing", data: [] });
  const user = await db.users.create(req.body);
  return res.json({ staus: 200, message: "Sign up successful", data: user });
});

/**
 * Login and get token
 * Params:
 * email,
 * password,
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    let data = await db.users.findOne({ password: password, email: email });
    console.log("data==", data);

    if (!data)
      return res.json({
        staus: 405,
        message: "Credentials Do not match try again"
      });

    let token = await utility.createToken({
      userId: data._id,
      email: data.email,
      _id: data._id
    });

    res.json({
      status: 200,
      message: "login success",
      data: data,
      token: token
    });
  } catch (error) {
    console.log("error", error);

    return res.json({ status: 405, message: error });
  }
});

module.exports = router;
