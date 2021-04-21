const loveMe = document.querySelector(".loveMe");
const timesHearted = document.getElementById("times");

let counter = 0;

const maxTimeBetweenClicks = 800;
let lastClickTime = null;

function getSecondsBetweenTimes(time1, time2) {
  return Math.abs(time2 - time1);
}

loveMe.addEventListener("click", (e) => {
  if (
    lastClickTime &&
    getSecondsBetweenTimes(lastClickTime, Date.now()) < 800
  ) {
    lastClickTime = 0;
    addHeart(e.clientX, e.clientY);
  } else lastClickTime = Date.now();
});
// loveMe.addEventListener("click", (e) => {
//   if (
//     lastClickTime &&
//     getSecondsBetweenTimes(lastClickTime, new Date().getTime()) < 800
//   ) {
//     lastClickTime = 0;
//     addHeart(e.clientX, e.clientY);
//   } else lastClickTime = new Date().getTime();
// });

function addHeart(x, y) {
  let rect = loveMe.getBoundingClientRect();
  const heart = document.createElement("i");
  heart.classList.add("fas", "fa-heart");
  heart.style.left = `${x - rect.left}px`;
  heart.style.top = `${y - rect.top}px`;
  loveMe.append(heart);
  setTimeout(() => {
    heart.remove();
  }, 1000);
  timesHearted.innerHTML = ++counter;
}
