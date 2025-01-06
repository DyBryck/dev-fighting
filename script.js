const onePlayer = document.querySelector(".op");
const pvp = document.querySelector(".pvp");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");
const container = document.querySelector(".character-container");

onePlayer.addEventListener("click", () => {
  selectChamp.style.display = "flex";
  startingPage.style.display = "none";
  const splashartContainer = document.createElement("div");
  splashartContainer.classList.add("splashart-container");
  selectChamp.insertBefore(splashartContainer, container);
});

pvp.addEventListener("click", () => {
  selectChamp.style.display = "flex";
  startingPage.style.display = "none";
  const splashartsContainer = document.createElement("div");
  splashartsContainer.classList.add("splasharts-container");
  selectChamp.insertBefore(splashartsContainer, container);
  for (let i = 0; i < 2; i++) {
    const splashart = document.createElement("div");
    splashart.classList.add("splashart");
    splashartsContainer.appendChild(splashart);
  }
});

let currentPlayer = 1;

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

const removePlayer = (img) => {
  img.style.display = "none";
};

const handleHover = (div) => {
  div.style.display = "block";
};

const generateCovers = () => {
  characters.forEach((character) => {
    const imgP1 = document.createElement("img");
    imgP1.src = "./assets/player1.png";
    imgP1.classList.add("player1");

    const imgP2 = document.createElement("img");
    imgP2.src = "./assets/player2.png";
    imgP2.classList.add("player2");

    const coverContainer = document.createElement("div");
    coverContainer.classList.add("cover-container");
    coverContainer.addEventListener("click", () =>
      showSplashart(character, coverContainer),
    );

    coverContainer.addEventListener("mouseover", () =>
      currentPlayer === 1 ? handleHover(imgP1) : handleHover(imgP2),
    );

    coverContainer.addEventListener("mouseout", () =>
      currentPlayer === 1 ? removePlayer(imgP1) : removePlayer(imgP2),
    );

    coverContainer.addEventListener("click", () => {
      currentPlayer = 2;
      reset();
      currentPlayer === 1
        ? imgP1.classList.add("force")
        : imgP2.classList.add("force");
    });

    const cover = document.createElement("img");
    cover.classList.add("character-cover");
    cover.src = character.cover;

    charactersContainer.appendChild(coverContainer);
    coverContainer.appendChild(imgP1);
    coverContainer.appendChild(imgP2);
    coverContainer.appendChild(cover);
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

const reset = () => {
  for (let i = 0; i < charactersContainer.children.length; i++) {
    charactersContainer.children[i].firstChild.classList.remove("force");
  }
  for (let i = 0; i < charactersContainer.children.length; i++) {
    charactersContainer.children[i].children[1].classList.remove("force");
  }
};

generateCovers();
