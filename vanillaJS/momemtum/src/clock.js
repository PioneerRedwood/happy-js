window.onload = () => {
  function tick() {
    const now = new Date();
    const clockTitle = document.querySelector("#js-clock");
    clockTitle.innerHTML = `${now.getDay()}d ${now.getHours()}h ${now.getMinutes()}m ${now.getSeconds()}s`;
  }

  setInterval(tick, 1000);
};
