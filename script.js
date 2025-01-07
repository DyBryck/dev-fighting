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
 * @param {*} containerClass Classe à rajouter au prochain container, (si c'est deux joueurs il y aura deux splasharts)
 */
const toggleView = (containerClass) => {
  startingPage.classList.add("fade-out");

  startingPage.addEventListener(
    "animationend",
    () => {
      startingPage.style.display = "none";
      startingPage.classList.remove("fade-out");

      selectChamp.style.display = "flex";
      selectChamp.classList.add("fade-in");

      const container = document.createElement("div");
      container.classList.add(containerClass);
      selectChamp.insertBefore(container, charactersContainer);

      if (containerClass === "splasharts-container") {
        for (let i = 0; i < 2; i++) {
          const splashart = document.createElement("div");
          splashart.classList.add("splashart");
          container.appendChild(splashart);
        }
      }

      setTimeout(() => {
        selectChamp.classList.add("visible");
      }, 50);
    },
    { once: true },
  );
};

onePlayer.addEventListener("click", () => toggleView("splashart-container"));
pvp.addEventListener("click", () => toggleView("splasharts-container"));

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

const showSplashart = (character, cover) => {
  const splashartContainer = document.querySelector(".splashart-container");
  if (!splashartContainer) return;

  Array.from(charactersContainer.children).forEach((child) =>
    child.classList.remove("active"),
  );

  splashartContainer.innerHTML = "";
  const splashart = document.createElement("img");
  splashart.src = character.splashart;
  splashart.classList.add("splashart");
  splashartContainer.appendChild(splashart);
  cover.classList.add("active");
};

/**
 * @summary génère la liste des personnages et leurs eventListener
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
      showSplashart(character, coverContainer);
      currentPlayer++;
    });
  });
};

generateCovers();
