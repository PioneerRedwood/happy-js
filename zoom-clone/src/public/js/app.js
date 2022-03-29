const socket = io();

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room: ${roomName}`;

  const nameForm = room.querySelector("#name");
  nameForm.addEventListener("submit", handleNameSubmit);
  const messageForm = room.querySelector("#message");
  messageForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  console.log("welcome! from the server");
  addMessage(`${user} joined`);
});

socket.on("bye", (user) => {
  console.log("someone left");
  addMessage(`${user} left`);
})

socket.on("new_message", (message) => {
  addMessage(message);
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerText = "";

  if(rooms.length === 0) {  
    return;
  }

  rooms.forEach((room) => {  
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
