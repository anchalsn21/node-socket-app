
const db=require('../models/index')
 const getUserDetails=async(roomName, userName)=> {
  const  data=await db.chatRooms.findOne(
    { name: roomName },
    { users: 1, name: 1 ,userCount:1}
  );
 
  console.log("roomData===",data.users,typeof data.users);
  const totalRooms = await db.chatRooms.find({}).count();
  console.log("totalRooms", totalRooms);

  return {
    userCount:data.users,
    name:data.name,
    totalRooms,
    userName
  };
}



module.exports = {
 
  getUserDetails,
 
};



