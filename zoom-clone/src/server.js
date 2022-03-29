// import WebSocket from "ws";
import SocketIO from "socket.io";
import http from "http";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => {
  res.render("home");
});

app.use("/*", (_, res) => {
  res.redirect("/");
});

const startHandler = () => {
  console.log("zoom building complete! http:localhost:3000");
}

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms }
    },
  } = wsServer;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => {
    // console.log(wsServer.sockets.adapter);
    console.log(`Socket event "${event}"`);
  });

  socket.on("enter_room", (roomName, completion) => {
    socket.join(roomName);
    completion();
    socket.to(roomName).emit("welcome", socket.nickname);
    wsServer.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname);
    });
  });

  socket.on("disconnect", ()=> {
    wsServer.sockets.emit("room_change", publicRooms());
  });
  
  socket.on("new_message", (message, room, completion) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${message}`);
    completion();
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});



/* 
const wss = new WebSocket.Server({ server });
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  console.log(`New Connection! ${sockets.length}`);

  socket.onclose = () => { 
    console.log("Disconnected from the browser"); 
  };

  socket.onmessage = (event) => {
    console.log("new message!");
    const data = event.data;

    const parsed = JSON.parse(data);
    console.log(parsed);

    switch(parsed.type) {
      case "message":
        sockets.forEach((sock) => {
          sock.send(`${sock.nickname}: ${parsed.payload}`);
        });
      case "nickname":
        socket["nickname"] = parsed.payload;
    }
  };
});
 */

httpServer.listen(3000, startHandler);