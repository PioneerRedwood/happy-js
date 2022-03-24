const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to the server!");
});

socket.addEventListener("message", (message) => {
  console.log(`New message: ${message.data} from the server`);
});

socket.addEventListener("close", () => {
  console.log(`Disconnected from the server!`);
});

// setTimeout(() => {
//   console.log("send to server hello message");
//   socket.send("hello server!");
// }, 2000);

setInterval(()=> {
  console.log("send to server hello message");
  socket.send("hello server?");
}, 1000);