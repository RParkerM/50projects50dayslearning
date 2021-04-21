let button = document.querySelector(".btn");
let search = document.querySelector(".search");
let input = document.querySelector(".input");

button.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});
