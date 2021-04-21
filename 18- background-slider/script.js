const body = document.body;
const slides = document.querySelectorAll(".slide");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

let activeSlide = 0;

setBgToBody();

function setBgToBody() {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}

leftBtn.addEventListener("click", () => {
  activeSlide = (activeSlide - 1) % slides.length;
  if (activeSlide < 0) activeSlide += slides.length;
  setActiveSlide();
});
rightBtn.addEventListener("click", () => {
  activeSlide = (activeSlide + 1) % slides.length;
  setActiveSlide();
});

function setActiveSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].classList.add("active");
  setBgToBody();
}
