import WebSocket from "ws";
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
  console.log("zoom building complete! come inside http:localhost:3000");
}

// app.listen(3000, startHandler);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("New Connection!");
  
  socket.on("close", () => { 
    console.log("Disconnected from the browser"); 
  });

  socket.on("message", (message) => {
    console.log(`${message}`);
  });

  socket.send("hello?");
}); 

server.listen(3000, startHandler);