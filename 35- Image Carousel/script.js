let nextBtn = document.getElementById("right");
let prevBtn = document.getElementById("left");
let imgContainer = document.querySelector(".image-container");

let curId = 0;
let maxImgs = imgContainer.querySelectorAll("img").length;

let interval = setInterval(run, 2000);

nextBtn.addEventListener("click", () => {
  curId = (curId + 1) % maxImgs;
  imgContainer.style.transform = `translateX(${-curId * 100}%)`;
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  curId = --curId < 0 ? curId + 4 : curId;
  imgContainer.style.transform = `translateX(${-curId * 100}%)`;
  resetInterval();
});

function run() {
  curId = (curId + 1) % maxImgs;
  changeImage();
}

function changeImage() {
  imgContainer.style.transform = `translateX(${-curId * 100}%)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 2000);
}
