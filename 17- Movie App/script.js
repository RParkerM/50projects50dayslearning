const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=144b74cbbb8600039a58192efd566145";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=144b74cbbb8600039a58192efd566145&query="';
const MISSING_IMG =
  "https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const pageEl = document.getElementById("page");

let lastUrl = "";
let curPage = 1;

// Get initial movies

next.addEventListener("click", () => {
  getMovies(lastUrl + "&page=" + (curPage + 1));
});

prev.addEventListener("click", () => {
  getMovies(lastUrl + "&page=" + (curPage - 1));
});

getMovies(API_URL + "&page=" + curPage);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  lastUrl = url;
  console.log(data);
  showMovies(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  searchMovies(searchTerm);
});

function searchMovies(searchTerm) {
  if (searchTerm && searchTerm != "") {
    getMovies(SEARCH_URL + searchTerm + '"');
    lastSearch = searchTerm;
    search.value = "";
  } else {
    window.location.reload();
  }
}

function updateMovies(data) {
  let movies = data.results;
  let moviesStr = movies
    .map((movie) => {
      return `<div class="movie">
        <img
          src="${IMG_PATH + movie.poster_path}"
          alt=""
        />
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <span class="${
            movie.vote_average >= 8
              ? "green"
              : movie.vote_average >= 5
              ? "orange"
              : "red"
          }">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${movie.overview}
          </div>
      </div>`;
    })
    .join("");
  document.getElementById("main").innerHTML = moviesStr;
}

function showMovies(data) {
  let movies = data.results;
  const { page, total_pages } = data;
  curPage = parseInt(page);
  console.log(curPage);
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img
      src="${poster_path ? IMG_PATH + poster_path + '"' : MISSING_IMG}"
      alt=""
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${overview}
  </div>`;
    main.appendChild(movieEl);
  });

  pageEl.innerHTML = `Page ${page} of ${total_pages}`;
  if (page > 1) prev.classList.remove("disabled");
  else prev.classList.add("disabled");
  if (page < total_pages) next.classList.remove("disabled");
  else next.classList.add("disabled");
}

function getClassByRate(vote) {
  if (vote >= 8) return "green";
  if (vote >= 5) return "orange";
  return "red";
}
