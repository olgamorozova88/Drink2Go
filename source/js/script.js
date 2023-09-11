/* Variables */

const siteNavigation = document.querySelector(".site-navigation");
const menuToggle = document.querySelector(".site-navigation__toggle");
const siteNavigationLinks = document.querySelectorAll(".site-navigation__link");
const rangeSlider = document.querySelector(".range__target");
const rangeInputs = document.querySelectorAll(".range__price-input");
const form = document.querySelector("#catalog-form");
const sortToggle = document.querySelector(".sort__select");
const sortOptions = document.querySelector(".sort__options");
const paginationPrev = document.querySelector("#page-prev");
const paginationNext = document.querySelector("#page-next");
const paginationLinks = document.querySelectorAll(".pagination__link");
const mapContainer = document.querySelector(".map");

/* Hide menu with enabled JS */

window.addEventListener("load", () =>
  siteNavigation.classList.remove("site-navigation--no-js")
);

/* Toggle menu */
menuToggle.addEventListener("click", () =>
  siteNavigation.classList.toggle("site-navigation--open")
);

/* Toggle active link in header */

siteNavigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNavigationLinks.forEach((link) => {
      link.classList.remove("site-navigation__link--active");
    });
    link.classList.add("site-navigation__link--active");
  });
});

/* Swiper */

const swiper = new Swiper(".promo-swiper", {
  loop: true,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  /* autoplay: {
    delay: 3000,
  }, */
  speed: 1000,
  pagination: {
    el: ".promo-swiper__pagination",
    bulletClass: "promo-swiper__pagination-bullet",
    bulletActiveClass: "promo-swiper__pagination-bullet--active",
    clickable: true,
  },
  navigation: {
    nextEl: ".promo-swiper__button--next",
    prevEl: ".promo-swiper__button--prev",
  },
  a11y: {
    prevSlideMessage: "Следующий слайд",
    nextSlideMessage: "Предыдущий слайд",
  },
});

/* noUiSlider */

noUiSlider.create(rangeSlider, {
  start: [0, 225],
  connect: true,
  cssPrefix: "range__",
  range: {
    min: 0,
    max: 375,
  },
  step: 10,
  handleAttributes: [{ "aria-label": "Меньше" }, { "aria-label": "Больше" }],
  animate: false,
});

/* Link range with inputs */

rangeSlider.noUiSlider.on("slide", (values, handle) => {
  rangeInputs[handle].value = Math.round(values[handle]);
});

rangeInputs.forEach((input, index) => {
  let values = [];
  input.addEventListener("change", (evt) => {
    values[index] = evt.target.value;
    rangeSlider.noUiSlider.set(values);
  });
});

/* Validate Range Inputs */

rangeInputs.forEach((input) => {
  input.addEventListener("input", (evt) => {
    if (Number(evt.target.value) > Number(input.max)) {
      input.value = input.max;
    }
  });
});

/* Reset range */

form.addEventListener("reset", () => rangeSlider.noUiSlider.set([0, 225]));

/* Toggle sort */

sortToggle.addEventListener("click", () =>
  sortToggle.classList.toggle("sort__select--opened")
);

sortOptions.addEventListener("click", (evt) => {
  const target = evt.target;
  sortToggle.innerText = target.innerText;
  sortToggle.classList.remove("sort__select--opened");
});

/* Pagination */

paginationLinks.forEach((link) => {
  link.addEventListener("click", (evt) => {
    const target = evt.target;
    paginationPrev.removeAttribute("style");
    paginationNext.removeAttribute("style");

    paginationLinks.forEach((link) => {
      link.classList.remove("pagination__link--active");
      target.classList.add("pagination__link--active");
    });

    if (target.id === "page-1") paginationPrev.style.visibility = "hidden";
    if (target.id === "page-3") paginationNext.style.visibility = "hidden";
  });
});

/* Map */

const COORDS = [59.9684, 30.3176];
const map = L.map(mapContainer, { scrollWheelZoom: false }).setView(COORDS, 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const marker = L.marker(COORDS, {
  icon: L.icon({
    iconUrl: "./img/map/map_pin.svg",
    iconSize: [38, 50],
    iconAnchor: [19, 50],
  }),
  title: "Наш адрес: Санкт-Петербург, набережная реки Карповки, дом 5",
}).addTo(map);
