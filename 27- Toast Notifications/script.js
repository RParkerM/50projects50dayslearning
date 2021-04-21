const toastContainer = document.getElementById("toasts");
const btn = document.getElementById("button");

const messages = [
  "Message One",
  "Message Two",
  "Message Three",
  "Message Four",
];

const disappearTime = 3000;
const fadeOutTime = 500;

const types = ["info", "success", "error"];

btn.addEventListener("click", () => {
  createNotification();
});

function createNotification(msg, type = null) {
  let newEl = document.createElement("div");
  newEl.classList.add("toast");
  newEl.classList.add(type ? type : getRandomType());
  newEl.innerHTML = msg
    ? msg
    : messages[Math.floor(Math.random() * messages.length)];
  toastContainer.append(newEl);
  setTimeout(() => {
    newEl.classList.add("invisible");
    setTimeout(() => newEl.remove(), fadeOutTime);
  }, disappearTime);
}

function getRandomType() {
  return types[Math.floor(Math.random() * types.length)];
}
