const launchGameButton = document.querySelector(".launch-game-button");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");
const fightingPage = document.querySelector(".fighting-page");
const endGamePage = document.querySelector(".endgame-page");

const charactersContainer = document.querySelector(".character-container");

let currentPlayer = 1;

const charactersList = [
  {
    name: "HTML",
    splashart: "./assets/splasharts/html.png",
    cover: "./assets/covers/html.png",
    maxHealth: 2000,
    health: 2000,
    attack: 80,
    defence: 120,
    maxPower: 5,
    power: 400,
    charge: 0,
  },
  {
    name: "CSS",
    splashart: "./assets/splasharts/css.png",
    cover: "./assets/covers/css.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 100,
    maxPower: 5,
    power: 500,
    charge: 0,
  },
  {
    name: "JavaScript",
    splashart: "./assets/splasharts/javascript.png",
    cover: "./assets/covers/javascript.png",
    maxHealth: 1800,
    health: 1800,
    attack: 90,
    defence: 110,
    maxPower: 5,
    power: 550,
    charge: 0,
  },
  {
    name: "PhP",
    splashart: "./assets/splasharts/php.png",
    cover: "./assets/covers/php.png",
    maxHealth: 1900,
    health: 1900,
    attack: 85,
    defence: 115,
    maxPower: 5,
    power: 450,
    charge: 0,
  },
  {
    name: "Python",
    splashart: "./assets/splasharts/python.png",
    cover: "./assets/covers/python.png",
    maxHealth: 1600,
    health: 1600,
    attack: 120,
    defence: 80,
    maxPower: 5,
    power: 650,
    charge: 0,
  },
  {
    name: "SQL",
    splashart: "./assets/splasharts/sql.png",
    cover: "./assets/covers/sql.png",
    maxHealth: 1700,
    health: 1700,
    attack: 100,
    defence: 90,
    maxPower: 5,
    power: 500,
    charge: 0,
  },
  {
    name: "React",
    splashart: "./assets/splasharts/react.png",
    cover: "./assets/covers/react.png",
    maxHealth: 1700,
    health: 1700,
    attack: 110,
    defence: 90,
    maxPower: 5,
    power: 600,
    charge: 0,
  },
  {
    name: "Java",
    splashart: "./assets/splasharts/java.png",
    cover: "./assets/covers/java.png",
    maxHealth: 1850,
    health: 1850,
    attack: 95,
    defence: 105,
    maxPower: 5,
    power: 525,
    charge: 0,
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
  } else if (page.classList.contains("select-champ")) {
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
  } else if (page.classList.contains("endgame-page")) {
    fightingPage.classList.add("fade-out");

    fightingPage.addEventListener(
      "animationend",
      () => {
        fightingPage.style.display = "none";
        fightingPage.classList.remove("fade-out");

        endGamePage.style.display = "flex";
        endGamePage.classList.add("fade-in");

        setTimeout(() => {
          endGamePage.classList.add("visible");
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
  constructor(
    name,
    maxHealth,
    health,
    attack,
    defence,
    maxPower,
    power,
    charge,
  ) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = health;
    this.attack = attack;
    this.defence = defence;
    this.maxPower = maxPower;
    this.power = power;
    this.charge = charge;
  }

  launchAttack(target) {
    target.health -= this.attack;
  }

  protect(damages) {
    this.health -= damages - this.defence;
  }

  launchPower(target) {
    target.health -= this.power;
  }
}

const setPowerButtonDisabledTo = (trueOrFalse) => {
  const powerButton = document.querySelector(".power-button");
  powerButton.disabled = trueOrFalse;
};

const generateHealthAndPowerBars = (p1Char, p2Char) => {
  const frameP1 = document.querySelector(".frame-player-one");
  const frameP2 = document.querySelector(".frame-player-two");

  for (let i = 1; i <= 2; i++) {
    const avatar = document.createElement("img");
    avatar.src = i === 1 ? p1Char.cover : p2Char.cover;
    i === 1 ? frameP1.appendChild(avatar) : frameP2.appendChild(avatar);

    const healthBar = document.createElement("div");
    healthBar.classList.add(`health-bar-p${i}`);

    const hpBar = document.createElement("div");
    hpBar.classList.add(`hpBar-p${i}`);
    healthBar.appendChild(hpBar);
    hpBar.innerText = i === 1 ? p1Char.health : p2Char.health;

    const hp = document.createElement("div");
    hp.classList.add(`hp-p${i}`);
    healthBar.appendChild(hp);

    const lostHp = document.createElement("div");
    lostHp.classList.add(`lost-hp-p${i}`);
    healthBar.appendChild(lostHp);

    i === 1 ? frameP1.appendChild(healthBar) : frameP2.appendChild(healthBar);

    const powerBar = document.createElement("div");
    powerBar.classList.add(`power-bar-p${i}`);

    const countPower = document.createElement("div");
    countPower.classList.add(`countPower-p${i}`);
    powerBar.appendChild(countPower);
    countPower.innerText =
      i === 1
        ? `${p1Char.charge}/${p1Char.maxPower}`
        : `${p2Char.charge}/${p2Char.maxPower}`;

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

const showCurrentPlayer = () => {
  const textContainer = document.querySelector(".current-player");
  textContainer.innerText = "";
  textContainer.innerText = `Player ${currentPlayer}, choose an action!`;
};

const endTurn = () => {
  if (player1Champion.charge < player1Champion.maxPower) {
    player1Champion.charge++;
  }

  if (player2Champion.charge < player2Champion.maxPower) {
    player2Champion.charge++;
  }

  updateHealthAndPowerBars();
  if (checkWin()) endGame();
  player1Choice = undefined;
  player2Choice = undefined;
  showCurrentPlayer();
};

const backgrounds = [
  "./assets/background/combat1.gif",
  "./assets/background/combat2.gif",
  "./assets/background/combat3.gif",
  "./assets/background/combat4.gif",
  "./assets/background/combat5.gif",
  "./assets/background/combat6.gif",
  "./assets/background/fight.gif",
];

function randomBackground() {
  const fightingPage = document.querySelector(".fighting-page");
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  fightingPage.style.backgroundImage = `url("${backgrounds[randomIndex]}")`;
}

const launchGame = (p1Char, p2Char) => {
  currentPlayer = 1;
  toggleView(selectChamp);
  randomBackground();
  generateHealthAndPowerBars(p1Char, p2Char);
  showCurrentPlayer();

  player1Champion = new Character(
    player1Character.name,
    player1Character.maxHealth,
    player1Character.health,
    player1Character.attack,
    player1Character.defence,
    player1Character.maxPower,
    player1Character.power,
    player1Character.charge,
  );
  player2Champion = new Character(
    player2Character.name,
    player2Character.maxHealth,
    player2Character.health,
    player2Character.attack,
    player2Character.defence,
    player2Character.maxPower,
    player2Character.power,
    player2Character.charge,
  );

  updateHealthAndPowerBars();
};

let player1Choice;
let player2Choice;

const updateHealthAndPowerBars = () => {
  const hpp1 = document.querySelector(".hp-p1");
  const hpp1lost = document.querySelector(".lost-hp-p1");
  const hpBarP1 = document.querySelector(".hpBar-p1");
  const powerBarP1 = document.querySelector(".power-p1");
  const powerRemaimingP1 = document.querySelector(".power-remaiming-p1");
  const countPowerP1 = document.querySelector(".countPower-p1");

  const hpp2 = document.querySelector(".hp-p2");
  const hpp2lost = document.querySelector(".lost-hp-p2");
  const hpBarP2 = document.querySelector(".hpBar-p2");
  const powerBarP2 = document.querySelector(".power-p2");
  const powerRemaimingP2 = document.querySelector(".power-remaiming-p2");
  const countPowerP2 = document.querySelector(".countPower-p2");

  // Joueur 1
  const pvJoueur1 = (player1Champion.health / player1Champion.maxHealth) * 100;
  const pourcenPvLost1 = 100 - pvJoueur1;
  const powerp1 = (player1Champion.charge / player1Champion.maxPower) * 100;
  const percentPowerP1 = 100 - powerp1;

  hpp1.style.width = `${pvJoueur1}%`;
  hpp1lost.style.width = `${pourcenPvLost1}%`;
  hpBarP1.innerText = "";
  hpBarP1.innerText = player1Champion.health;
  powerBarP1.style.width = `${powerp1}%`;
  powerRemaimingP1.style.width = `${percentPowerP1}%`;
  countPowerP1.innerText = "";
  countPowerP1.innerText = `${player1Champion.charge}/${player1Champion.maxPower}`;

  // Joueur 2
  const pvJoueur2 = (player2Champion.health / player2Champion.maxHealth) * 100;
  const pourcenPvLost2 = 100 - pvJoueur2;
  const powerp2 = (player2Champion.charge / player2Champion.maxPower) * 100;
  const percentPowerP2 = 100 - powerp2;

  hpp2.style.width = `${pvJoueur2}%`;
  hpp2lost.style.width = `${pourcenPvLost2}%`;
  hpBarP2.innerText = "";
  hpBarP2.innerText = player2Champion.health;
  powerBarP2.style.width = `${powerp2}%`;
  powerRemaimingP2.style.width = `${percentPowerP2}%`;
  countPowerP2.innerText = "";
  countPowerP2.innerText = `${player2Champion.charge}/${player2Champion.maxPower}`;
};

const getAction = (choice) => {
  if (player2Champion.charge >= player2Champion.maxPower) {
    setPowerButtonDisabledTo(false);
  } else setPowerButtonDisabledTo(true);
  currentPlayer === 1 ? (player1Choice = choice) : (player2Choice = choice);

  if (player1Choice && player2Choice) {
    playAction();
  }

  currentPlayer === 1 ? currentPlayer++ : currentPlayer--;
  showCurrentPlayer();
};

const playAction = () => {
  switch (player1Choice) {
    case "attack-button":
      switch (player2Choice) {
        case "attack-button":
          player1Champion.launchAttack(player2Champion);
          player2Champion.launchAttack(player1Champion);
          endTurn();
          break;

        case "defence-button":
          player2Champion.protect(player1Champion.attack);
          endTurn();
          break;

        case "power-button":
          player1Champion.launchAttack(player2Champion);
          player2Champion.launchPower(player1Champion);
          player2Champion.charge = -1;
          setPowerButtonDisabledTo(true);
          endTurn();
          break;

        default:
          break;
      }

    case "defence-button":
      switch (player2Choice) {
        case "attack-button":
          player1Champion.protect(player2Champion.attack);
          endTurn();
          break;

        case "defence-button":
          endTurn();
          break;

        case "power-button":
          player1Champion.protect(player2Champion.power);
          player2Champion.charge = -1;
          setPowerButtonDisabledTo(true);
          endTurn();
          break;

        default:
          break;
      }

    case "power-button":
      switch (player2Choice) {
        case "attack-button":
          player1Champion.launchPower(player2Champion);
          player1Champion.charge = -1;
          player2Champion.launchAttack(player1Champion);
          setPowerButtonDisabledTo(true);
          endTurn();
          break;

        case "defence-button":
          player2Champion.protect(player1Champion.power);
          player1Champion.charge = -1;
          setPowerButtonDisabledTo(true);
          endTurn();
          break;

        case "power-button":
          player1Champion.launchPower(player2Champion);
          player1Champion.charge = -1;
          player2Champion.launchPower(player1Champion);
          player2Champion.charge = -1;
          setPowerButtonDisabledTo(true);
          endTurn();
          break;

        default:
          break;
      }

    default:
      break;
  }
  if (player1Champion.charge >= player1Champion.maxPower)
    setPowerButtonDisabledTo(false);
};

const choicesButtons = document.querySelector(".action-buttons").children;
for (let i = 0; i < choicesButtons.length; i++) {
  const choice = choicesButtons[i].classList[0];
  choicesButtons[i].addEventListener("click", () => getAction(choice));
}

let winner;
let winnerCover;

const checkWin = () => {
  const h1 = document.querySelector(".h1");
  const imgWin = document.createElement("img");
  imgWin.classList.add("imgWin");
  if (player1Champion.health <= 0 && player2Champion.health <= 0) {
    winner = "Égalité";
    return true;
  } else if (player1Champion.health <= 0) {
    winner = "Player 2";
    winnerCover = player2Character.cover;
    imgWin.src = winnerCover;
    endGamePage.appendChild(imgWin);
    h1.innerText = `${winner} WIN!`;
    return true;
  } else if (player2Champion.health <= 0) {
    winner = "Player 1";
    winnerCover = player1Character.cover;
    imgWin.src = winnerCover;
    endGamePage.appendChild(imgWin);
    h1.innerText = `${winner} WIN!`;
    return true;
  } else return false;
};

const endGame = () => {
  setTimeout(() => {
    toggleView(endGamePage);
  }, 1000);
};
