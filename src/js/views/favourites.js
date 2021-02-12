// import currencyUI from './currency'
// class FavouriteUI {
//   constructor(currency) {
//     this.list = document.querySelector('#navbarDropdown')
//     this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency)
//   }

//   renderTickets(favourites) {
//     this.clearContainer()
//     console.log(favourites)
//     if (!favourites.length) {
//       this.showEmptyMsg()
//       return
//     }
//  let fragment = ''
//  const currency = this.getCurrencySymbol()

//  tickets.forEach(favourite => {
//    const template = FavouriteUI.ticketTemplate(favourite, currency)
//    fragment += template;

//  })

//  this.list.insertAdjacentHTML('afterbegin', fragment)
// }

// clearContainer() {
//  this.container.innerHTML = ''
// }

// showEmptyMsg() {
//  const template = FavouriteUI.emptyMsgTemplate()
//  this.list.insertAdjacentHTML('afterbegin', template)
// }

// static emptyMsgTemplate() {
//  return `
//  <div class="tickets-empty-res-msg">
//    По вашему запросу билетов не найдено.
//  </div>
//  `
// }

// static ticketTemplate(ticket, currency) {
//  return `
//  <div class="col s12 m6">
//    <div class="card ticket-card">
//      <div class="ticket-airline d-flex align-items-center">
//        <img
//          src="${ticket.airline_logo}"
//          class="ticket-airline-img"
//        />
//        <span class="ticket-airline-name"
//          >${ticket.airline_name}</span
//        >
//      </div>
//      <div class="ticket-destination d-flex align-items-center">
//        <div class="d-flex align-items-center mr-auto">
//          <span class="ticket-city">${ticket.origin_name}</span>
//          <i class="medium material-icons">flight_takeoff</i>
//        </div>
//        <div class="d-flex align-items-center">
//          <i class="medium material-icons">flight_land</i>
//          <span class="ticket-city">${ticket.destination_name}</span>
//        </div>
//      </div>
//      <div class="ticket-time-price d-flex align-items-center">
//        <span class="ticket-time-departure">${ticket.departure_at}</span>
//        <span class="ticket-time-return">${ticket.return_at}</span>
//        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
//      </div>
//      <div class="ticket-additional-info">
//        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
//        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      
//      </div>
//      <a
//      class=" add-favourite ml-auto transparent"
//      ><i class="material-icons favourite-icon">favorite_border</i></a
//    >
//    </div>
//  </div>
//  `

// }

// }

// const favouriteUI = new FavouriteUI(currencyUI)
// export default favouriteUI