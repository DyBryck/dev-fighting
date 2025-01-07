const onePlayer = document.querySelector(".op");
const pvp = document.querySelector(".pvp");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");
const charactersContainer = document.querySelector(".character-container");

let currentPlayer = 1;

const characters = [
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

/**
 * @summary Disparition en fondu de la starting page et apparition en fondu de la prochaine page
 */
const toggleView = () => {
  startingPage.classList.add("fade-out");

  startingPage.addEventListener(
    "animationend",
    () => {
      startingPage.style.display = "none";
      startingPage.classList.remove("fade-out");

      selectChamp.style.display = "flex";
      selectChamp.classList.add("fade-in");

      setTimeout(() => {
        selectChamp.classList.add("visible");
      }, 50);
    },
    { once: true },
  );
};

document
  .querySelectorAll(".choice")
  .forEach((item) => item.addEventListener("click", () => toggleView()));

/**
 * @summary Retire la classe "force" qui force les images P1 et P2 à rester affichées
 */
const resetForces = () => {
  Array.from(charactersContainer.children).forEach((child) => {
    child.querySelectorAll(".player1, .player2").forEach((player) => {
      player.classList.remove("force");
    });
  });
};

/**
 * @summary Gère le hover des images P1 et P2
 * @param {*} img Image P1 ou P2
 * @param {*} display Booléen, si vrai alors on affiche l'image, si faux on la masque
 */
const handleHover = (img, display) => {
  img.style.display = display ? "block" : "none";
};

/**
 * @summary Affiche le splashart du personnage
 * @param {*} character personnage
 * @param {*} cover source de l'image
 * @returns
 */

const showSplashart = (player, character, cover) => {
  console.log(player, character, cover);
  const splashartLeft = document.querySelector(".splashart-left");
  const splashartRight = document.querySelector(".splashart-right");

  // La classe active permet de garder en couleur le personnage sélectionné
  // (ne fonctionne pas encore à deux joueurs)
  Array.from(charactersContainer.children).forEach((child) =>
    child.classList.remove("active"),
  );

  if (player === 1) {
    splashartLeft.innerHTML = "";
    const splashart = document.createElement("img");
    splashart.src = character.splashart;
    splashart.classList.add("splashart");
    splashartLeft.appendChild(splashart);
    cover.classList.add("active");
  } else {
    splashartRight.innerHTML = "";
    const splashart = document.createElement("img");
    splashart.src = character.splashart;
    splashart.classList.add("splashart");
    splashartRight.appendChild(splashart);
    cover.classList.add("active");
  }
};

/**
 * @summary Génère la liste des personnages et leurs eventListener
 */
const generateCovers = () => {
  characters.forEach((character) => {
    const coverContainer = document.createElement("div");
    coverContainer.classList.add("cover-container");

    const imgP1 = document.createElement("img");
    imgP1.src = "./assets/player1.png";
    imgP1.classList.add("player1");

    const imgP2 = document.createElement("img");
    imgP2.src = "./assets/player2.png";
    imgP2.classList.add("player2");

    const cover = document.createElement("img");
    cover.classList.add("character-cover");
    cover.src = character.cover;

    coverContainer.append(imgP1, imgP2, cover);
    charactersContainer.appendChild(coverContainer);

    coverContainer.addEventListener("mouseover", () => {
      if (currentPlayer === 3) return;
      handleHover(currentPlayer === 1 ? imgP1 : imgP2, true);
    });

    coverContainer.addEventListener("mouseout", () =>
      handleHover(currentPlayer === 1 ? imgP1 : imgP2, false),
    );

    coverContainer.addEventListener("click", () => {
      if (currentPlayer === 3) return;
      resetForces();
      (currentPlayer === 1 ? imgP1 : imgP2).classList.add("force");
      showSplashart(currentPlayer, character, coverContainer);
      currentPlayer++;
    });
  });
};

generateCovers();
