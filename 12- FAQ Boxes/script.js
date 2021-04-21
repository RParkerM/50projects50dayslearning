const buttons = document.querySelectorAll(".faq-toggle");
const faqs = document.querySelectorAll(".faq");

buttons.forEach((button, idx) => {
  button.addEventListener("click", () => {
    // faqs[idx].classList.toggle("active");
    button.parentElement.classList.toggle("active");
  });
});

function resetFaqs() {
  faqs.forEach((faq) => faq.classList.remove("active"));
}
