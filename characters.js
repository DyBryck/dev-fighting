const charactersList = [
  {
    name: "HTML",
    health: 1700,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "CSS",
    health: 2000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "JavaScript",
    health: 1800,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "PhP",
    health: 2000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "Python",
    health: 2000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "Java",
    health: 3000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "React",
    health: 2000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
  {
    name: "SQL",
    health: 2000,
    attack: 100,
    defence: 100,
    power: 100,
    charge: 5,
  },
];

let turn = 1;

const checkWin = (target) => {
  if (target.health === 0) console.log("Quelqu'un a gagné");
};

const endGame = () => {
  console.log("Jeu terminé");
};

class Character {
  constructor(name, health, attack, defence, power, charge) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defence = defence;
    this.power = power;
    this.charge = charge;
  }

  launchAttack(target) {
    console.log(this.name + "Attaque :" + target.name + ": " + target.health);
    target.health -= this.attack;
    console.log(target.health);

    if (checkWin(target)) {
      endGame();
    }
  }
}

let charactersClasses = [];

charactersList.forEach((character) => {
  const name = character.name;
  const health = character.health;
  const attack = character.attack;
  const defence = character.defence;
  const power = character.power;
  const charge = character.charge;
  charactersClasses.push(
    new Character(name, health, attack, defence, power, charge),
  );
});

const attackButton = document.querySelector(".attack-button");
attackButton.addEventListener("click", () => {
  charactersClasses[0].launchAttack(charactersClasses[1]);
});
