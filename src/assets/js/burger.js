const sprites = require("@images/icons_sprite.svg");

const onState = {
  closed: {
    icon: `${sprites}#cross`,
    nextState: "opened",
    overflow: "hidden",
  },
  opened: {
    icon: `${sprites}#burger`,
    nextState: "closed",
    overflow: "auto",
  },
};

const button = document.querySelector("[data-burger]");
const menu = document.querySelector("[data-menu-state]");

function toggleMenu(currentState) {
  if (currentState == "closed") {
    document.addEventListener("click", closeHandler, true);
  } else {
    document.removeEventListener("click", closeHandler, true);
  }
  const svg = button.querySelector("use");
  const nextState = onState[currentState];
  svg.setAttribute("href", nextState.icon);
  menu.dataset.menuState = nextState.nextState;
  document.body.style.overflow = nextState.overflow;
}

function closeHandler(event) {
  // Closes menu when clicked anywhere else
  if (event.target.className == "menu__inner") return;
  event.handled = true;
  toggleMenu("opened");
}

button.addEventListener("click", (event) => {
  if (event.handled) return;
  toggleMenu(menu.dataset.menuState);
});
