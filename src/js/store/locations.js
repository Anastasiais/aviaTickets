import api from '../services/apiService'
import { formatDate } from '../helpers/date'
import store from './favouriteCollection'

class Locations {
  constructor(api, helpers) {
    this.api = api
    this.countries = null
    this.cities = null
    this.shortCities = {}
    this.lastSearch = {}
    this.airlines = {}
    this.formatDate = helpers.formatDate
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response
    this.countries = this.serializeCountries(countries)
    this.cities = this.serializeCities(cities)
    this.shortCities = this.createShortCities(this.cities)
    this.airlines = this.serializeAirlines(airlines)

    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find((item) => item.full_name.replace(/\s/g, '') === key.replace(/\s/g, ''))
    return city.code

  }

  getCityNameByCode(code) {
    return this.cities[code].name
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : ''
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : ''
  }

  getTicketByID(id) {
    const ticket = Object.values(this.lastSearch).find((item) => item.id === id)
    return ticket
}

  createShortCities(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null
      return acc
    }, {})
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`
      item.name = item.name || item.name_translations.en
      acc[item.code] = item
      return acc
    }, {})
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country
      return acc
    }, {})
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name
      city.name = city.name || city.name_translations.en
      const full_name = `${city.name},${country_name}`
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc
    }, {})
  }

  createTicketId(ticket) {
    const convertedDepartureAt = this.formatDate(ticket.departure_at, 'dd MMM yyyy hh').replace(/\s/g, '');
    return convertedDepartureAt + ticket.flight_number.toString()
}


  changeFavouriteState(ticketID, state = false) {
    const ticket = Object.values(this.lastSearch).find((el) => el.id === ticketID)
    ticket.isFavourite = state;
    return state;
  }

   getFavouriteState(ticket) {
     const ticketID = this.createTicketId(ticket)
     return store.checkTicketIsFavourite(ticketID)
 }

  async fetchTickets(params) {
    const response = await this.api.prices(params)
    this.lastSearch = this.serializeTickets(response.data)
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        id: this.createTicketId(ticket),
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
        return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
        isFavourite: this.getFavouriteState(ticket),
      }
    })
  }
}

const locations = new Locations(api, { formatDate })

export default locations
