# Task Details 

***command to start the server***  **npm start**
**Using Mlab for Data storage**


  This dummy project is for the  creating an api end point to display following data of all the rooms by just passing a **token** field in **headers** with jwt token
  received via login api

  End Point: "/room/allrooms" 

  1. Room name and Id
  2. Room Last message
  3. Room Member Details 
  4. Room Member Ids
  5. Room unread messages count
  6. Display all unread messages

        Sample  Response

  ```javascript
{
    "status": 200,
    "message": "Room Data fetched successfully",
    "data": [
        {
            "memberDetails": [
                {
                    "_id": "5f05cfb9ad8ab953a8fa7b5b",
                    "name": "user 2",
                    "email": "user2@yopmail.com"
                }
            ],
            "_id": "5f05dc5551a48e5ea80e486e",
            "roomId": "5f05dc5551a48e5ea80e486e",
            "roomName": "room4",
            "lastMessage": null,
            "allUnreadMessages": [],
            "unreadCount": 0,
            "participants": [
                "5f05cfb9ad8ab953a8fa7b5b"
            ]
        },
        {
            "memberDetails": [
                {
                    "_id": "5f05cfb9ad8ab953a8fa7b5b",
                    "name": "user 2",
                    "email": "user2@yopmail.com"
                },
                {
                    "_id": "5f05cfbcad8ab953a8fa7b5c",
                    "name": "user 1",
                    "email": "user1@yopmail.com"
                }
            ],
            "_id": "5f05dc3a51a48e5ea80e486b",
            "roomId": "5f05dc3a51a48e5ea80e486b",
            "roomName": "room1",
            "lastMessage": {
                "_id": "5f05dff74a57f962b246e4a0",
                "content": "message 6",
                "readBy": [
                    "5f05cfb9ad8ab953a8fa7b5b"
                ],
                "roomId": "5f05dc3a51a48e5ea80e486b",
                "sender": "5f05cfb9ad8ab953a8fa7b5b",
                "timestamp": 1594220535,
                "createdAt": "2020-07-08T15:02:15.933Z",
                "updatedAt": "2020-07-08T15:02:15.933Z",
                "__v": 0
            },
            "allUnreadMessages": [
                {
                    "_id": "5f05dfed4a57f962b246e49e",
                    "content": "message 4",
                    "readBy": [],
                    "roomId": "5f05dc3a51a48e5ea80e486b",
                    "sender": "5f05cfb9ad8ab953a8fa7b5b",
                    "timestamp": 1594220525,
                    "createdAt": "2020-07-08T15:02:05.858Z",
                    "updatedAt": "2020-07-08T15:02:05.858Z",
                    "__v": 0
                },
                {
                    "_id": "5f05df27b90e1161d7dadc67",
                    "content": "message 1",
                    "readBy": [],
                    "roomId": "5f05dc3a51a48e5ea80e486b",
                    "sender": "5f05cfb9ad8ab953a8fa7b5b",
                    "timestamp": 1594220327,
                    "createdAt": "2020-07-08T14:58:47.245Z",
                    "updatedAt": "2020-07-08T14:58:47.245Z",
                    "__v": 0
                }
            ],
            "unreadCount": 2,
            "participants": [
                "5f05cfb9ad8ab953a8fa7b5b",
                "5f05cfbcad8ab953a8fa7b5c"
            ]
        },
        {
            "memberDetails": [
                {
                    "_id": "5f05cfb9ad8ab953a8fa7b5b",
                    "name": "user 2",
                    "email": "user2@yopmail.com"
                }
            ],
            "_id": "5f05dc5051a48e5ea80e486d",
            "roomId": "5f05dc5051a48e5ea80e486d",
            "roomName": "room3",
            "lastMessage": null,
            "allUnreadMessages": [],
            "unreadCount": 0,
            "participants": [
                "5f05cfb9ad8ab953a8fa7b5b"
            ]
        },
        {
            "memberDetails": [
                {
                    "_id": "5f05cfb9ad8ab953a8fa7b5b",
                    "name": "user 2",
                    "email": "user2@yopmail.com"
                },
                {
                    "_id": "5f05cfbcad8ab953a8fa7b5c",
                    "name": "user 1",
                    "email": "user1@yopmail.com"
                }
            ],
            "_id": "5f05dc4a51a48e5ea80e486c",
            "roomId": "5f05dc4a51a48e5ea80e486c",
            "roomName": "room2",
            "lastMessage": null,
            "allUnreadMessages": [],
            "unreadCount": 0,
            "participants": [
                "5f05cfb9ad8ab953a8fa7b5b",
                "5f05cfbcad8ab953a8fa7b5c"
            ]
        }
    ]
}



  ```



  There are also few other end points to needed to achieve the above

  1. End point ('/user/create')  to create a user (signup)
  2. End point  ('/user/login')  to login a user (generate JWT token which will be user for other api's)
  3. End point ('/room/create')    to create a room 
  4. End point  ('/room/addnewuser')  to add new user to the room
  5. End point  ('/chat/sendmessage')  for sending a message to the group


  user Credentials:
  
            user1:
                    email: user1@yopmail.com
                    password: password 

                    auth token:

                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHlvcG1haWwuY29tIiwidXNlcklkIjoiNWYwNWNmYmNhZDhhYjk1M2E4ZmE3YjVjIiwiX2lkIjoiNWYwNWNmYmNhZDhhYjk1M2E4ZmE3YjVjIiwiaWF0IjoxNTk0Mjk4MjYwfQ.uEllueg63mZYC9tjvkid-YcPJGFfUzZ59xcZ3dCDOzE

            user2:
                    email: user2@yopmail.com
                    password: password 

                    auth token : 

                    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQHlvcG1haWwuY29tIiwidXNlcklkIjoiNWYwNWNmYjlhZDhhYjk1M2E4ZmE3YjViIiwiX2lkIjoiNWYwNWNmYjlhZDhhYjk1M2E4ZmE3YjViIiwiaWF0IjoxNTk0Mjk4MzU1fQ.pGKMoaoK8L29y4ld1LXWqXf_8T1yKTzTgcW4XE4iaeE




  