import currencyUI from './currency'
 class FavouriteUI {
 constructor(currency) {
     this.favouriteTicketsContainer = document.querySelector('.favourite-tickets-container')
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
    <div class="favourite-item-info d-flex flex-column">
      <div
        class="favourite-item-destination d-flex align-items-center"
      >
        <div class="d-flex align-items-center mr-auto">
          <span class="favourite-item-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favourite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-time-return">${ticket.return_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок:${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса:${ticket.flight_number}</span>
      </div>
      <a
        class="delete-favourite ml-auto transparent">
        <i class="material-icons delete-favourite" >delete</i>
      </a>

    </div>
  </div> 
 `

 }

 }

 const favouriteUI = new FavouriteUI(currencyUI)
 export default favouriteUI