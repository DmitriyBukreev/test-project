const sprites = require("@images/icons_sprite.svg");

const onState = {
  closed: { icon: `${sprites}#cross`, nextState: "opened" },
  opened: { icon: `${sprites}#burger`, nextState: "closed" },
};
const button = document.querySelector("[data-burger]");
const menu = document.querySelector("[data-menu-state]");

button.addEventListener("click", () => {
  const svg = button.querySelector("use");
  const state = menu.dataset.menuState;
  svg.setAttribute("href", onState[state].icon);
  menu.dataset.menuState = onState[state].nextState;
});
