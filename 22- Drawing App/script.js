const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const sizeEl = document.getElementById("size");
const clearBtn = document.getElementById("clear");
const colorPicker = document.getElementById("color");

let color = "black";
let size = 10;
let isPressed = false;

let x;
let y;

color.value = "black";

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

increaseBtn.addEventListener("click", () => {
  size = Math.min(size + 1, 50);
  sizeEl.innerHTML = size;
});
decreaseBtn.addEventListener("click", () => {
  size = Math.max(size - 1, 5);
  sizeEl.innerHTML = size;
});

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = y = undefined;
});

canvas.addEventListener("mouseleave", () => {
  isPressed = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, true);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
