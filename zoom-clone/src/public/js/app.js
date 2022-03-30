const socket = io();

// 2022-03-30 chatting part
/*
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
*/

// 2022-03-30 video part
const myVideo = document.getElementById("myVideo");
const micButton = document.getElementById("micButton");
const cameraButton = document.getElementById("cameraButton");

let myStream;
let micSwitch = false;
let cameraSwitch = false;

micButton.addEventListener("click", () => {
  // myStream.getAudioTracks().forEach((track)=> {
  //   track.enabled = !track.enabled;
  // });

  micSwitch = !micSwitch;
  myVideo.muted = !micSwitch;

  if(micSwitch) {
    micButton.innerText = "Mic Off";
  } else {
    micButton.innerText = "Mic On";
  }
  
  console.log(`muted? ${micSwitch}`);
});

cameraButton.addEventListener("click", () => {
  myStream.getVideoTracks().forEach((track)=>{
    track.enabled = !track.enabled;
  });

  cameraSwitch = !cameraSwitch;
  
  if(cameraSwitch) {
    cameraButton.innerText = "Turn camera off";
  } else {
    cameraButton.innerText = "Turn camera on";
  }
  
  console.log(`camera? ${cameraSwitch}`);
});

async function getCameras() {
  try {
    const cameras = navigator.mediaDevices.enumerateDevices();
    console.log(cameras);
  } catch(error) {
    console.error(error);
  }
}

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    myVideo.srcObject = myStream;
    myVideo.muted = true;
    await getCameras();
  } catch (error) {
    console.error(error);
  }
}

getMedia();



