const clockTitle = document.querySelector(".js-clock");

const MILLI_CLOCK = {
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  min: 1000 * 60,
  sec: 1000,
};

function tick() {
  const now = new Date();
  const christmas = new Date(`${now.getFullYear()}-12-25 00:00:00`);

  // 단위 밀리초
  const diff = christmas - now;

  // 밀리초 -> 날짜
  const day = String(Math.floor(diff / MILLI_CLOCK.day)).padStart(3, "0");

  // 밀리초 -> 시간
  const hour = String(Math.floor((diff % MILLI_CLOCK.day) / MILLI_CLOCK.hour)).padStart(2, "0");

  // 밀리초 -> 분
  const min = String(Math.floor((diff % MILLI_CLOCK.hour) / MILLI_CLOCK.min)).padStart(2, "0");

  // 밀리초 -> 초
  const sec = String(Math.floor((diff % MILLI_CLOCK.min) / MILLI_CLOCK.sec)).padStart(2, "0");

  clockTitle.innerHTML = `${day}d ${hour}h ${min}m ${sec}s`;
}

setInterval(tick, 1000);
