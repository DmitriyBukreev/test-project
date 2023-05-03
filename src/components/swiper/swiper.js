import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-next",
  },
});
