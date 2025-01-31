const launchGameButton = document.querySelector(".launch-game-button");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");
const fightingPage = document.querySelector(".fighting-page");
const endGamePage = document.querySelector(".endgame-page");
const charactersContainer = document.querySelector(".character-container");

let currentPlayer = 1;

// Liste des personnages
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
    cover: "./assets/covers/javascript.webp",
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
 * @summary Disparition en fondu d'une page à une autre, en rajoutant et retirants des classes
 * et en jouant avec le display none / flex
 * @param page Classe
 */
const toggleView = (page) => {
  // Défini la page qui disparaîtra en fondu et celle qui apparaîtra, selon les classes
  const transitions = {
    "starting-page": { from: startingPage, to: selectChamp },
    "select-champ": { from: selectChamp, to: fightingPage },
    "endgame-page": { from: fightingPage, to: endGamePage },
  };

  // Récupère le bon objet en fonction de la classe envoyée en paramètre
  const transition = transitions[page.classList[0]];

  // Déstructure l'objet transition pour créer des constantes from et to (que l'on retrouve dans l'objet)
  const { from, to } = transition;

  from.classList.add("fade-out");

  from.addEventListener("animationend", () => {
    from.style.display = "none";
    from.classList.remove("fade-out");

    to.style.display = "flex";
    to.classList.add("fade-in");

    setTimeout(() => {
      to.classList.add("visible");
    }, 50);
  });
};

const startSound = new Audio("./assets/audios/start-game.wav");
launchGameButton.addEventListener("click", () => {
  startSound.play();
  toggleView(startingPage);
});

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

const statsContainer = document.querySelector(".stats-container");
const showStatsOnHover = (character) => {
  statsContainer.innerHTML = "";
  const ul = document.createElement("ul");

  const stats = {
    HP: character.maxHealth,
    ATK: character.attack,
    DEF: character.defence,
    POW: character.power,
    Turns: character.maxPower,
  };

  for (const [key, value] of Object.entries(stats)) {
    const li = document.createElement("li");

    const statName = document.createElement("p");
    statName.textContent = key;

    const statValue = document.createElement("p");
    statValue.textContent = value;

    li.append(statName, statValue);
    ul.appendChild(li);
  }

  statsContainer.appendChild(ul);
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
      launchGame();
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
      showStatsOnHover(character);
    });

    coverContainer.addEventListener("mouseout", () => {
      handleHover(currentPlayer === 1 ? imgP1 : imgP2, false);
      statsContainer.innerHTML = "";
    });

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

let damagesTakenP1;
let damagesTakenP2;

const frameP1 = document.querySelector(".frame-player-one");
const frameP2 = document.querySelector(".frame-player-two");
const showDamages = () => {
  const createDamageElement = (damage, frame) => {
    const damageElement = document.createElement("p");
    damageElement.innerText = damage <= 0 ? damage : `- ${damage}`;
    damageElement.classList.add("show-damage");
    frame.appendChild(damageElement);
    damageElement.addEventListener("animationend", () =>
      damageElement.remove(),
    );
  };

  createDamageElement(damagesTakenP1, frameP1);
  createDamageElement(damagesTakenP2, frameP2);
};

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
    currentPlayer === 1
      ? (damagesTakenP1 = this.attack)
      : (damagesTakenP2 = this.attack);
  }

  protect(damages) {
    this.health -= damages - this.defence;
  }

  launchPower(target) {
    target.health -= this.power;
    currentPlayer === 1
      ? (damagesTakenP1 = this.power)
      : (damagesTakenP2 = this.power);
  }
}

const setPowerButtonDisabledTo = (trueOrFalse) => {
  const powerButton = document.querySelector(".power-button");
  powerButton.disabled = trueOrFalse;
};

/**
 * @summary Génère les barres d'HP et de Pouvoir ainsi que les avatars des personnages
 * @param {*} p1Char Personnage du joueur 1
 * @param {*} p2Char Personnage du joueur 2
 */
const generateFightInterface = (p1Char, p2Char) => {
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

/**
 * Modifie le texte qui indique quel joueur est entrain de sélectionner son choix
 */
const showCurrentPlayer = () => {
  const textContainer = document.querySelector(".current-player");
  textContainer.innerText = "";
  textContainer.innerText = `Player ${currentPlayer}, choose an action!`;
};

/**
 * Appelée à la fin de chaque tour, augmente la charge des joueurs, vérifie s'il y a une victoire
 * reset les choix des joueurs, met à jour le texte du joueur actuel et active le bouton pouvoir
 * pour le joueur 1 s'il a assez de charges
 */
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

  if (player1Champion.charge < player1Champion.maxPower)
    setPowerButtonDisabledTo(true);
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

const updateHealthAndPowerBars = () => {
  /**
   * @summary Calcul en % les HP actuels, HP manquants, Power actuel et Power manquant afin d'adapter la largeur des barres dans le DOM
   * @param {class} player Personnage du joueur
   * @param {div} hpSelector Div qui contient le texte du nombre d'HP
   * @param {div} lostHpSelector Div de la barre d'HP restants (verte)
   * @param {div} hpBarSelector Div de la barre d'HP perdus (rouge)
   * @param {div} powerBarSelector Div de la barre de charge (orange)
   * @param {div} countPowerSelector Div qui contient le compteur du nombre de charge sur le nombre max de charge
   */
  const updatePlayerBars = (
    player,
    hpSelector,
    lostHpSelector,
    hpBarSelector,
    powerBarSelector,
    countPowerSelector,
  ) => {
    const hpElement = document.querySelector(hpSelector);
    const lostHpElement = document.querySelector(lostHpSelector);
    const hpBarElement = document.querySelector(hpBarSelector);
    const powerBarElement = document.querySelector(powerBarSelector);
    const countPowerElement = document.querySelector(countPowerSelector);

    const healthPercent = (player.health / player.maxHealth) * 100;
    const lostHealthPercent = 100 - healthPercent;
    const powerPercent = (player.charge / player.maxPower) * 100;

    hpElement.style.width = `${healthPercent}%`;
    lostHpElement.style.width = `${lostHealthPercent}%`;
    hpBarElement.innerText = player.health;
    powerBarElement.style.width = `${powerPercent}%`;
    countPowerElement.innerText = `${player.charge}/${player.maxPower}`;
  };

  // Met à jour les barres des joueurs
  updatePlayerBars(
    player1Champion,
    ".hp-p1",
    ".lost-hp-p1",
    ".hpBar-p1",
    ".power-p1",
    ".countPower-p1",
  );

  updatePlayerBars(
    player2Champion,
    ".hp-p2",
    ".lost-hp-p2",
    ".hpBar-p2",
    ".power-p2",
    ".countPower-p2",
  );
};

/**
 * Appelée une fois que les joueurs ont sélectionné leurs personnages, génère l'interface
 * crée les classes à partir de la sélection des personnages
 */
const launchGame = () => {
  currentPlayer = 1;
  toggleView(selectChamp);
  randomBackground();
  generateFightInterface(player1Character, player2Character);
  showCurrentPlayer();

  // Fonction qui crée un champion
  const createChampion = (character) =>
    new Character(
      character.name,
      character.maxHealth,
      character.health,
      character.attack,
      character.defence,
      character.maxPower,
      character.power,
      character.charge,
    );

  player1Champion = createChampion(player1Character);
  player2Champion = createChampion(player2Character);

  updateHealthAndPowerBars();
};

// Stock les actions des joueurs
let player1Choice;
let player2Choice;
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

// Ajoute un listener aux boutons de choix, la fonction permet de stocker le choix de l'utilisateur
const choicesButtons = document.querySelector(".action-buttons").children;
for (let i = 0; i < choicesButtons.length; i++) {
  const choice = choicesButtons[i].classList[0];
  choicesButtons[i].addEventListener("click", () => getAction(choice));
}

const playAction = () => {
  // Fonction qui gère les actions des joueurs
  const resolveActions = (action1, action2) => {
    if (action1 === "attack-button" && action2 === "attack-button") {
      // Les deux joueurs attaquent
      player1Champion.launchAttack(player2Champion);
      damagesTakenP2 = player1Champion.attack;
      player2Champion.launchAttack(player1Champion);
      damagesTakenP1 = player1Champion.attack;
      showDamages();
    } // Le joueur 1 attaque et le joueur 2 défend
    else if (action1 === "attack-button" && action2 === "defence-button") {
      player2Champion.protect(player1Champion.attack);
      damagesTakenP1 = null;
      damagesTakenP2 = player1Champion.attack - player2Champion.defence;
      showDamages();
    } // Le joueur 1 attaque et le joueur 2 utilise son pouvoir
    else if (action1 === "attack-button" && action2 === "power-button") {
      player1Champion.launchAttack(player2Champion);
      player2Champion.launchPower(player1Champion);
      player2Champion.charge = -1;
      damagesTakenP1 = player2Champion.power;
      damagesTakenP2 = player1Champion.attack;
      showDamages();
    } // Le joueur 1 défend et le joueur 2 attaque
    else if (action1 === "defence-button" && action2 === "attack-button") {
      player1Champion.protect(player2Champion.attack);
      damagesTakenP1 = player2Champion.attack - player1Champion.defence;
      damagesTakenP2 = null;
      showDamages();
    } // Les deux joueurs défendent, rien ne se passe
    else if (action1 === "defence-button" && action2 === "defence-button") {
    } // Le joueur 1 défend et le joueur 2 utilise son pouvoir
    else if (action1 === "defence-button" && action2 === "power-button") {
      player1Champion.protect(player2Champion.power);
      player2Champion.charge = -1;
      damagesTakenP1 = player2Champion.attack - player1Champion.power;
      damagesTakenP2 = null;
      showDamages();
    } // Le joueur 1 utilise son pouvoir et le joueur 2 attaque
    else if (action1 === "power-button" && action2 === "attack-button") {
      player1Champion.launchPower(player2Champion);
      player1Champion.charge = -1;
      player2Champion.launchAttack(player1Champion);
      damagesTakenP1 = player2Champion.attack;
      damagesTakenP2 = player1Champion.power;
      showDamages();
    } // Le joueur 1 utilise son pouvoir et le joueur 2 défend
    else if (action1 === "power-button" && action2 === "defence-button") {
      player2Champion.protect(player1Champion.power);
      player1Champion.charge = -1;
      damagesTakenP1 = null;
      damagesTakenP2 = player1Champion.power - player2Champion.defence;
      showDamages();
    } // Les 2 joueurs utilisent leur pouvoir
    else if (action1 === "power-button" && action2 === "power-button") {
      player1Champion.launchPower(player2Champion);
      player1Champion.charge = -1;
      player2Champion.launchPower(player1Champion);
      player2Champion.charge = -1;
      damagesTakenP1 = player1Champion.power;
      damagesTakenP2 = player2Champion.power;
      showDamages();
    }

    // Reset les charges et désactive le bouton pouvoir
    if (action1 === "power-button" || action2 === "power-button") {
      setPowerButtonDisabledTo(true);
    }
  };

  resolveActions(player1Choice, player2Choice);
  endTurn();

  // Active le bouton pouvoir pour le joueur 1 s'il a assez de charges
  if (player1Champion.charge >= player1Champion.maxPower) {
    setPowerButtonDisabledTo(false);
  }
};

let winner;
let winnerCover;

/**
 *
 * @returns {boolean} S'il y a une victoire, retourne vrai, sinon faux
 */
const checkWin = () => {
  const h1 = document.querySelector(".h1");
  if (player1Champion.health <= 0 && player2Champion.health <= 0) {
    winner = "Égalité";
    h1.innerText = `${winner}!`;
    return true;
  } else if (player1Champion.health <= 0) {
    winner = "Player 2";
    winnerCover = player2Character.cover;
    h1.innerText = `${winner} WIN!`;
    return true;
  } else if (player2Champion.health <= 0) {
    winner = "Player 1";
    h1.innerText = `${winner} WIN!`;
    return true;
  } else return false;
};

const endGame = () => {
  setTimeout(() => {
    toggleView(endGamePage);
  }, 1000);
};
