const textArea = document.getElementById("textarea");
// const tags = document.querySelectorAll(".tag");
const tagContainer = document.getElementById("tags");

textArea.focus();

textArea.addEventListener("keyup", (e) => {
  let tags = textArea.value
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
  tagContainer.innerHTML = tags;
  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 100);
    randomSelect();
  }
});

function randomSelect() {
  const times = 15;
  const inter = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unhighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(inter);

    setTimeout(() => {
      highlightTag(pickRandomTag());
    });
  }, (times + 2) * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unhighlightTag(tag) {
  tag.classList.remove("highlight");
}
