const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    console.log(xInside, yInside);

    const rippleEl = document.createElement("div");
    rippleEl.classList.add("circle");
    rippleEl.style.left = xInside + "px";
    rippleEl.style.top = yInside + "px";
    button.append(rippleEl);

    setTimeout(() => {
      rippleEl.remove();
    }, 500);
  });
});
