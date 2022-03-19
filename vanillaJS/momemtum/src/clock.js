const clock = document.querySelector("#clock");

function tick() {
  const now = new Date();
  clock.innerHTML = `${now.getHours()}:${now.getMinutes()}:${String(now.getSeconds()).padStart("0", 2)}`;
}

setInterval(tick, 1000);