const clock = document.querySelector("#clock");

function tick() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(tick, 1000);