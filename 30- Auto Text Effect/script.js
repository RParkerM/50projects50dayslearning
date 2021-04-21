const textEl = document.getElementById("text");
const speedEl = document.getElementById("speed");
const text = "We Love Programming!";

let idx = 1;
let speed = 300 / speedEl.value;

writeText();

function writeText() {
  textEl.innerText = text.slice(0, idx++);

  if (idx > text.length) {
    idx = 1;
  }
  setTimeout(writeText, speed);
}

speedEl.addEventListener("change", () => {
  speedEl.value = Math.max(Math.min(speedEl.max, speedEl.value), speedEl.min);
  speed = 300 / speedEl.value;
});
