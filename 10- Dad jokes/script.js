let joke = document.getElementById("joke");
let btn = document.getElementById("jokeBtn");

btn.addEventListener("click", generateJoke);

generateJoke();

async function generateJoke() {
  const config = {
    headers: { Accept: "application/json" },
  };

  const res = await fetch("https://icanhazdadjoke.com/", config);

  const data = await res.json();

  joke.innerText = data.joke;
}
// function generateJoke() {
//   const config = {
//     headers: { Accept: "application/json" },
//   };
//   fetch("https://icanhazdadjoke.com/", config)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.status == 200) {
//         joke.innerText = data.joke;
//       }
//     });
// }
