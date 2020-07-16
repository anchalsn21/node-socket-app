const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const userDetails = document.querySelector("#userDetails");

// const roomName = document.getElementById('room-name');
const userList = document.getElementById("users");

// Get username and room from URL
const { userName, roomName } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit("joinRoom", { userName, roomName });

socket.on("details", message => {
  console.log("message client", message);
  const { userCount, name, totalRooms } = message;
  /**
   * 
   *   userCount,name,
    totalRooms,userName
   * 
   */

  userDetails.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("details");
  div.innerHTML = `
    <p>
    User name: ${message.userName}
  </p>
  <p>
    Current Room Name: ${name}
  </p>

  <p>
    Total Number of users in the room: ${userCount.length}
  </p>

  <p>
    Total Rooms Available:  ${totalRooms}
  </p>
    `;
  document.querySelector("#userDetails").appendChild(div);
});
