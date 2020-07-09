const jwt = require("jsonwebtoken");

const createToken = async userData => {
  const { name, email, _id } = userData;
  let obj = {
    name: name,
    email: email,
    userId: _id,
    _id: _id
  };
  let token = await jwt.sign(obj, getJwtSecret());
  console.log("token==", token);

  return token;
};

const getJwtSecret = () => {
  return "test123";
};

const getDataFromToken = token => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  createToken,
  getJwtSecret,
  getDataFromToken
};
