const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34"
];

function changeColor() {
  const firstIdx = Math.floor(Math.random() * colors.length);
  const lastIdx = Math.floor(Math.random() * colors.length);
  
  console.log(`${firstIdx} ~ ${lastIdx}`);
  document.body.style.backgroundImage = `linear-gradient(to right, ${colors[firstIdx]}, ${colors[lastIdx]})`;
}

const changeBtn = document.querySelector("#change-gradient");
changeBtn.addEventListener("click", changeColor);