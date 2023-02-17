const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require ("./config/db")
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
const colors = require ("colors")


connectDB();
app.use(express.json());
app.use(cors());


app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


const server = require('http').createServer(app);
const port = process.env.PORT || 5000;
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://peppy-stardust-018e0f.netlify.app',
    methods: ['GET', 'POST']
  }
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://peppy-stardust-018e0f.netlify.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// socket connection

let onlineUsers = [];

io.on("connection", (socket) => {
  // add user

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("Connected Users:", onlineUsers);

    // send active users
    io.emit("getUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      console.log("sending message and notification");
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected:", onlineUsers);

    // send active users
    io.emit("getUsers", onlineUsers);
  });
});



app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});