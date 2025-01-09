const launchGameButton = document.querySelector(".launch-game-button");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");
const fightingPage = document.querySelector(".fighting-page");
const charactersContainer = document.querySelector(".character-container");

let currentPlayer = 1;

const charactersList = [
  {
    name: "HTML",
    splashart: "./assets/splasharts/html.png",
    cover: "./assets/covers/html.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "CSS",
    splashart: "./assets/splasharts/css.png",
    cover: "./assets/covers/css.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "JavaScript",
    splashart: "./assets/splasharts/javascript.png",
    cover: "./assets/covers/javascript.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "PhP",
    splashart: "./assets/splasharts/php.png",
    cover: "./assets/covers/php.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "Python",
    splashart: "./assets/splasharts/python.png",
    cover: "./assets/covers/python.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "SQL",
    splashart: "./assets/splasharts/sql.png",
    cover: "./assets/covers/sql.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "React",
    splashart: "./assets/splasharts/react.png",
    cover: "./assets/covers/react.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
  {
    name: "Java",
    splashart: "./assets/splasharts/java.png",
    cover: "./assets/covers/java.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 100,
    power: 0,
    charge: 5,
  },
];

/**
 * @summary Disparition en fondu de la starting page et apparition en fondu de la prochaine page
 */
const toggleView = (page) => {
  if (page.classList.contains("starting-page")) {
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
  } else {
    selectChamp.classList.add("fade-out");

    selectChamp.addEventListener(
      "animationend",
      () => {
        selectChamp.style.display = "none";
        selectChamp.classList.remove("fade-out");

        fightingPage.style.display = "flex";
        fightingPage.classList.add("fade-in");

        setTimeout(() => {
          fightingPage.classList.add("visible");
        }, 50);
      },
      { once: true },
    );
  }
};

launchGameButton.addEventListener("click", () => toggleView(startingPage));

/**
 * @summary Retire la classe "force" qui force les images P1 et P2 à rester affichées
 */
const resetForces = () => {
  Array.from(charactersContainer.children).forEach((child) => {
    /* convertit tous les enfants html en tab js */
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

let player1Character;
let player2Character;

/**
 * @summary Affiche le splashart du personnage
 * @param {*} character personnage
 * @param {*} cover source de l'image
 */
const showSplashart = (player, character, cover) => {
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
    player1Character = character;
  } else {
    splashartRight.innerHTML = "";
    const splashart = document.createElement("img");
    splashart.src = character.splashart;
    splashart.classList.add("splashart");
    splashartRight.appendChild(splashart);
    cover.classList.add("active");
    player2Character = character;
    setTimeout(() => {
      launchGame(player1Character, player2Character);
    }, 1000);
  }
};

/**
 * @summary Génère la liste des personnages et leurs eventListener
 */
const generateCovers = () => {
  charactersList.forEach((character) => {
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

function retour() {
  const splashartLeft = document.querySelector(".splashart-left");
  const splashartRight = document.querySelector(".splashart-right");

  if (currentPlayer === 3) {
    splashartRight.innerHTML = "";

    // Masquer l'image P2
    const imgP2 = document.querySelectorAll(".player2");
    imgP2.forEach((img) => {
      img.style.display = "none";
    });
  } else if (currentPlayer === 2) {
    splashartLeft.innerHTML = "";

    const imgP1 = document.querySelectorAll(".player1");
    imgP1.forEach((img) => {
      img.style.display = "none";
    });
  }

  const annuler = document.querySelector(".annuler");
  annuler.addEventListener("click", retour);

  // Réduire currentPlayer tout en s'assurant qu'il ne descend pas en dessous de 1
  currentPlayer = Math.max(currentPlayer - 1, 1);
}

class Character {
  constructor(name, health, attack, defence, power, charge) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defence = defence;
    this.power = power;
    this.charge = charge;
  }

  launchAttack(target) {}

  protect(attacker) {}
}

const generateHealthAndPowerBars = (p1Char, p2Char) => {
  const frameP1 = document.querySelector(".frame-player-one");
  const frameP2 = document.querySelector(".frame-player-two");

  for (let i = 1; i <= 2; i++) {
    const avatar = document.createElement("img");
    avatar.src = i === 1 ? p1Char.cover : p2Char.cover;
    i === 1 ? frameP1.appendChild(avatar) : frameP2.appendChild(avatar);

    const healthBar = document.createElement("div");
    healthBar.classList.add(`health-bar-p${i}`);

    const hp = document.createElement("div");
    hp.classList.add(`hp-p${i}`);
    healthBar.appendChild(hp);

    const lostHp = document.createElement("div");
    lostHp.classList.add(`lost-hp-p${i}`);
    healthBar.appendChild(lostHp);

    i === 1 ? frameP1.appendChild(healthBar) : frameP2.appendChild(healthBar);

    const powerBar = document.createElement("div");
    powerBar.classList.add(`power-bar-p${i}`);

    const power = document.createElement("div");
    power.classList.add(`power-p${i}`);
    powerBar.appendChild(power);

    const powerRemaiming = document.createElement("div");
    powerRemaiming.classList.add(`power-remaiming-p${i}`);
    powerBar.appendChild(powerRemaiming);

    i === 1 ? frameP1.appendChild(powerBar) : frameP2.appendChild(powerBar);
  }
};

let player1Champion;
let player2Champion;

const launchGame = (p1Char, p2Char) => {
  currentPlayer = 1;
  toggleView(selectChamp);
  generateHealthAndPowerBars(p1Char, p2Char);

  player1Champion = new Character(
    player1Character.name,
    player1Character.health,
    player1Character.attack,
    player1Character.defence,
    player1Character.power,
    player1Character.charge,
  );
  player2Champion = new Character(
    player2Character.name,
    player2Character.health,
    player2Character.attack,
    player2Character.defence,
    player2Character.power,
    player2Character.charge,
  );
};

let player1Choice;
let player2Choice;

const getChoice = (choice) => {
  currentPlayer === 1 ? (player1Choice = choice) : (player2Choice = choice);
  return choice;
};

const playAction = (action) => {
  console.log(player1Choice, player2Choice);
  switch (action) {
    case "attack-button":
      if (currentPlayer === 1) {
        player1Champion.launchAttack(player2Champion);
        currentPlayer = 2;
      } else {
        player2Champion.launchAttack(player1Champion);
        if (checkWin(player1Champion, player2Champion)) {
          return endGame();
        }

        currentPlayer = 1;
      }
      break;

    case "defence-button":
      if (currentPlayer === 1) {
        player1Champion.protect(player2Champion);
        currentPlayer = 2;
      } else {
        player2Champion.protect(player1Champion);
        currentPlayer = 1;
      }
      break;

    case "power-button":
      console.log("Super pouvoir!");
      break;

    default:
      break;
  }
};

const choicesButtons = document.querySelector(".action-buttons").children;
for (let i = 0; i < choicesButtons.length; i++) {
  const choice = choicesButtons[i].classList[0];
  choicesButtons[i].addEventListener("click", () =>
    playAction(getChoice(choice)),
  );
}

const checkWin = (target1, target2) => {
  if (target1.health === 0 && target2.health === 0) {
    console.log("Égalité!");
    return true;
  } else if (target1.health === 0 || target2.health === 0) return true;
  else return false;
};

const endGame = () => {
  console.log("Jeu terminé");
};
