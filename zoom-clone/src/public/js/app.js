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

const call = document.getElementById("call");
call.hidden = true;

let myStream;
let micSwitch = true;
let cameraSwitch = true;

// media part 
function toggleAudio() {
  micSwitch = !micSwitch;

  micSwitch ? micButton.innerText = "Mute" : micButton.innerText = "Unmute";

  myStream.getAudioTracks().forEach((track) => {
    track.enabled = micSwitch;
  });

  console.log(`toggleAudio() ${micSwitch}`);
}

micButton.addEventListener("click", toggleAudio);

function toggleVideo() {
  cameraSwitch = !cameraSwitch;

  cameraSwitch ? cameraButton.innerText = "Turn camera Off" : cameraButton.innerText = "Turn camera On";

  myStream.getVideoTracks().forEach((track) => {
    track.enabled = cameraSwitch;
  });

  console.log(`toggleAudio() ${cameraSwitch}`);
}

cameraButton.addEventListener("click", toggleVideo);

// camera selection feature but not going to be supported
// async function getCameras() {
//   try {
//     // const cameras = navigator.mediaDevices.enumerateDevices();
//     // console.log(cameras);
//   } catch(error) {
//     console.error(error);
//   }
// }

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    myVideo.srcObject = myStream;
    // await getCameras();
  } catch (error) {
    console.error(error);
  }
}

// for debugging
function turnMediaOffWhenStarting() {
  toggleAudio();
  toggleVideo();
}

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;

  await getMedia();
  turnMediaOffWhenStarting();
  createConnection();
}

// room part
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
let roomName;

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");

  // 
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// socket part

// welcome is the side(peer) of sending to connect first -- A
// offer is the side(peer) of receiving from the other peer -- B

/**
 * A -> B
 *  - first connection
 * A <- B
 * 
 * 
 */
socket.on("welcome", async () => {
  // send the offer to peer
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});

socket.on("offer", async (offer) => {
  // received the offer
  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);

  // send the answer
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
  console.log("send the offer");
});

socket.on("answer", (answer) => {
  // received the answer
  console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (iceCandidate) => {
  console.log("received iceCandidate");
  myPeerConnection.addIceCandidate(iceCandidate);
});

// RTC part
let myPeerConnection;

// set stream to new connection
function createConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [{
      // do not use this, when you are using a real production
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ]
    }],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);

  myStream.getTracks()
    .forEach((track) => {
      myPeerConnection.addTrack(track, myStream);
    });
}

function handleIce(data) {
  console.log("send iceCandidate");
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerFace = document.getElementById("peersFace");
  peerFace.srcObject = data.stream;
}