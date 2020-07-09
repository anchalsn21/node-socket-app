const jwt = require("jsonwebtoken");
const utility = require("../utils/utility");


const verifyToken = async (req, res, next) => {
  try {
      console.log("req",req.headers);
      
    const tokenData = await utility.getDataFromToken(req.headers.token)
    if (!tokenData) throw new Error("User not authenticated");
    req.userDetails = tokenData;
    next();
  } catch (error) {
    return res.json({ status: 401, message: "User not authenticated", data: [] });
  }
};

module.exports = {
  verifyToken
};
