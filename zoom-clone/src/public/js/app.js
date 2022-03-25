const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = {type, payload};
  return JSON.stringify(msg);
}

socket.onopen = () => {
  console.log("Connected to the server!");
};

socket.onmessage = (event) => {
  console.log(`New message: ${event.data} from the server`);

  // switch (data.type) {
  //   case "message": {      
  //     console.log(data.payload);
  //     break;
  //   }
  //   case "nickname": {
  //     console.log(data.payload);
  //     break;
  //   }
  //   default: {
  //     break;
  //   }
  // }

  
};

socket.onclose = () => {
  console.log(`Disconnected from the server!`);
};

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");

  const message = makeMessage("message", input.value);
  console.log(`send ${message}`);
  socket.send(message);

  const li = document.createElement("li");
  li.innerText = `You: ${input.value}`;
  messageList.append(li);


  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  
  const message = makeMessage("nickname", input.value);
  console.log(`send ${message}`);
  socket.send(message);
}

nicknameForm.addEventListener("submit", handleNicknameSubmit);