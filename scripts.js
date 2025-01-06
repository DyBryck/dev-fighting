const onePlayer = document.querySelector(".op");
const pvp = document.querySelector(".pvp");
const startingPage = document.querySelector(".starting-page");
const selectChamp = document.querySelector(".select-champ");

onePlayer.addEventListener("click", () => {
  selectChamp.style.display = "flex";
  startingPage.style.display = "none";
});

pvp.addEventListener("click", () => {
  console.log("Player1 VS Player2");
});
