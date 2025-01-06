let tableau = [];

let characters = [
  {
    name: "HTML",
    splashart: "./assets/splasharts/html.png",
    cover: "./assets/covers/html.png",
  },
  {
    name: "CSS",
    splashart: "./assets/splasharts/css.png",
    cover: "./assets/covers/css.png",
  },
  {
    name: "JavaScript",
    splashart: "./assets/splasharts/javascript.png",
    cover: "./assets/covers/javascript.tiff",
  },
  {
    name: "PhP",
    splashart: "./assets/splasharts/php.png",
    cover: "./assets/covers/php.png",
  },
  {
    name: "Python",
    splashart: "./assets/splasharts/python.png",
    cover: "./assets/covers/python.png",
  },
  {
    name: "SQL",
    splashart: "./assets/splasharts/sql.png",
    cover: "./assets/covers/sql.png",
  },
  {
    name: "React",
    splashart: "./assets/splasharts/react.png",
    cover: "./assets/covers/react.png",
  },
  {
    name: "Java",
    splashart: "./assets/splasharts/java.png",
    cover: "./assets/covers/java.png",
  },
];

const charactersContainer = document.querySelector(".character-container");

const generateCovers = () => {
  characters.forEach((character) => {
    const cover = document.createElement("img");
    cover.src = character.cover;
    cover.classList.add("character-cover");
    cover.addEventListener("click", () => showSplashart(character, cover));
    charactersContainer.appendChild(cover);
  });
};

const showSplashart = (character, cover) => {
  const splashartContainer = document.querySelector(".splashart-container");

  const covers = charactersContainer.children;
  for (let i = 0; i < covers.length; i++) {
    covers[i].classList.remove("active");
  }

  splashartContainer.innerHTML = "";
  const splashart = document.createElement("img");
  splashart.src = character.splashart;
  splashart.classList.add("splashart");
  splashartContainer.appendChild(splashart);
  cover.classList.add("active");
};

generateCovers();
