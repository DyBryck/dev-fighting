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

const checkWin = () => {
  console.log("Regarde si quelqu'un a gagné");
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
    console.log("Attaque", target);

    if (checkWin()) {
      endGame();
    }
  }
}

let characters = [];

charactersList.forEach((character) => {
  const name = character.name;
  const health = character.health;
  const attack = character.attack;
  const defence = character.defence;
  const power = character.power;
  const charge = character.charge;
  characters.push(new Character(name, health, attack, defence, power, charge));
});
