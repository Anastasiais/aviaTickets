import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import store from "./store/favouriteCollection";
import favouriteUI from "./views/favourites";
import el from "date-fns/esm/locale/el/index.js";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const form = formUI.form;
  const ticketsContainer = ticketsUI.container;
  const favouriteAddBtn = ticketsUI.favouriteAddBtn;
  const favouriteDelBtn = favouriteUI.favouriteDelBtn;
  const favouritesContainer = favouriteUI.favouriteTicketsContainer;

  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.closest(favouriteAddBtn)) return;
    onFavouritesChange(e.target);
  });

  favouritesContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.matches(favouriteDelBtn)) return;
    onFavouritesRemove(e.target);
  });

  // handlers
  async function initApp() {
    store.getFavouritesList();
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
  // //favourites

  let dropdownBtn = document.querySelector(".btn-floating");
  dropdownBtn.addEventListener("click", openedMenu);

  function openedMenu() {
    if (!dropdownBtn) return;
    let el = document.querySelector(".favourites-content");
    if (!el.classList.contains("show")) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  }

  function onFavouritesChange(btn) {
    const ticketID = btn.closest("[data-ticket-id]").dataset.ticketId;
    if (!store.checkTicketIsFavourite(ticketID)) {
      btn.classList.add("favourite-true");
    } else {
      btn.classList.remove("favourite-true");
    }

    store.changeFavouriteState(ticketID);
    store.getFavouritesList();
  }

  // //remove item from favourites list
  function onFavouritesRemove(btn) {
    const ticketID = btn.closest("[data-ticket-id]").dataset.ticketId;
    const ticketBlock = ticketsContainer.querySelector(
      `[data-ticket-id="${ticketID}"]`
    );
    if (ticketBlock) {
      const ticketBlockBtn = ticketBlock
        .querySelector(favouriteAddBtn)
        .querySelector("i");
      ticketBlockBtn.classList.remove("favourite-true");
    }
    store.removeFavouritesItem(ticketID);
    store.getFavouritesList();
  }
});
