import currencyUI from './currency'
 class FavouriteUI {
 constructor(currency) {
     this.favouriteTicketsContainer = document.querySelector('.favourites-content')
     this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency)
     this.favouriteDelBtn = '.delete-favourite'
   }

   get favouritesContainer() {
    return this.container
  }

  renderFavouriteTickets(tickets) {
    this.clearTicketsContainer()

    const ticketsArray = Object.values(tickets)
    if(!ticketsArray.length) {
      this.showEmptyMsg()
      return
    }
    let fragment = ''
    const currency = this.getCurrencySymbol()

    ticketsArray.forEach(ticket => {
      const template = FavouriteUI.favouriteTicketTemplate(ticket, currency)
      fragment += template;

    })
    this.favouriteTicketsContainer.insertAdjacentHTML('afterbegin', fragment)
  }

  clearTicketsContainer() {
    this.favouriteTicketsContainer.innerHTML = ''
  }

  showEmptyMsg() {
    const template = FavouriteUI.emptyMsgTemplate()
    this.favouriteTicketsContainer.insertAdjacentHTML('afterbegin', template)
  }

  static emptyMsgTemplate() {
    return `
    <div class="favourites-empty-res-msg">
      Избранных билетов нет.
    </div>
    `
  }

 static favouriteTicketTemplate(ticket, currency) {
  return `
  <div class="favourite-item  d-flex align-items-start" data-ticket-id="${ticket.id}">
    <img
      src="${ticket.airline_logo}"
      class="favourite-item-airline-img"
    />
    <div class="favourite-item-info">
      <div
        class="favourite-item-destination d-flex align-items-center"
      >
        <div class="d-flex align-items-center">
          <span class="favourite-item-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favourite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="favourite-ticket-time d-flex align-items-center">
        <span class="favourite-ticket-time-departure">${ticket.departure_at}</span>
        <span class="favourite-ticket-time-return">${ticket.return_at}</span>
      </div>
      <div class="favourite-additional-info d-flex align-items-center">
        <span class="favourite-ticket-transfers">Пересадок:${ticket.transfers}</span>
        <span class="favourite-ticket-flight-number">Номер рейса:${ticket.flight_number}</span>
        <span class="favourite-ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <a
        class="btn-floating btn-large waves-effect waves-light delete-favourite transparent">
        <i class="material-icons delete-favourite" >clear</i>
      </a>

    </div>
  </div>
 `

 }

 }

 const favouriteUI = new FavouriteUI(currencyUI)
 export default favouriteUI