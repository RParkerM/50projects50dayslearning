const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = ["Jan", "Feb", "March", "April"];

toggle.addEventListener("click", (e) => {
  let html = document.querySelector("html");
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    toggle.innerHTML = "Light Mode";
  } else {
    toggle.innerHTML = "Dark Mode";
  }
});

const prev = {
  s: 0,
  m: 0,
  h: 0,
};
const rotations = {
  s: 0,
  m: 0,
  h: 0,
};

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;

  const ampm = hours >= 12 ? "PM" : "AM";

  if (prev.s > seconds) rotations.s++;
  if (prev.m > minutes) rotations.m++;
  if (prev.h > hours) rotations.h++;
  prev.h = hours;
  prev.m = minutes;
  prev.s = seconds;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${
    (hoursForClock / 12 + rotations.h) * 360
  }deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${
    (minutes / 60 + rotations.m) * 360
  }deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${
    (seconds / 60 + rotations.s) * 360
  }deg)`;

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

setTime();

setInterval(setTime, 1000);
