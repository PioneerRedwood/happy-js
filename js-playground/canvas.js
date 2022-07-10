// this is based on https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage
// canvas tutorial

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

setTimeout(initCanvas, 500);

function initCanvas() {
  if (canvas !== undefined || canvas !== null) {
    ctx = canvas.getContext("2d");
    // drawing code 
    // chapter2.drawColor13();
    if (ctx !== undefined) {
      console.log("[bmcho] canvas is valid");
      
      drawLine();
      // drawRect();
    }

  } else {
    // canvas unsupported code here
    alert("[bmcho] this canvas not support");
  }
}

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(90, 130);
  ctx.lineTo(95, 25);
  ctx.lineTo(150, 80);
  ctx.lineTo(205, 25);
  ctx.lineTo(210, 130);
  ctx.lineWidth = 15;
  ctx.strokeStyle = "rgb(200, 0, 0)";
  ctx.stroke();
}

function drawRect() {
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(10, 10, 200, 400);
}

function drawArc() {

}