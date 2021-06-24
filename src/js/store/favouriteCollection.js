import locations from './locations';
import favouriteUI from '../views/favourites';
class Store {
  constructor() {
    this.favouriteTickets = JSON.parse(localStorage.getItem('favouriteTickets')) || {};

  }

  changeFavouriteState(ticket) {
    this.favouriteTickets = JSON.parse(localStorage.getItem('favouriteTickets')) || {}
    if(this.checkTicketIsFavourite(ticket)) {
      this.removeFavouritesItem(ticket)
    } else {
      this.addFavouritesItem(ticket)
    }
    locations.changeFavouriteState(ticket, !this.checkTicketIsFavourite(ticket));
  }

  checkTicketIsFavourite(ticket) {
    this.favouriteTickets = JSON.parse(localStorage.getItem('favouriteTickets')) || {}
    return this.favouriteTickets.hasOwnProperty(ticket)
  }

  addFavouritesItem(ticket) {
    const ticketInfo = locations.getTicketByID(ticket)
    Store.addToLocalStorageObject('favouriteTickets', ticket, ticketInfo)
    this.favouriteTickets = JSON.parse(localStorage.getItem('favouriteTickets')) || {}
  }

  removeFavouritesItem(ticket) {
    Store.removeFromLocalStorageObject('favouriteTickets', ticket)
    this.favouriteTickets = JSON.parse(localStorage.getItem('favouriteTickets')) || {}
  }

  getFavouritesList() {
    favouriteUI.renderFavouriteTickets(this.favouriteTickets);
  }

  static addToLocalStorageObject(name, key, value) {
    let existing = localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : {};

    existing[key] = value;
    localStorage.setItem(name, JSON.stringify(existing));
  };

  static removeFromLocalStorageObject(name, key) {
    let existing = localStorage.getItem(name);
    existing = existing ? JSON.parse(existing) : {};

    delete existing[key];
    localStorage.setItem(name, JSON.stringify(existing));
  };
}

const store = new Store()

export default store

