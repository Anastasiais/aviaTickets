import '../css/style.css'
import './plugins'
import locations from './store/locations'
import formUI from './views/form'
import ticketsUI from './views/tickets'
import currencyUI from './views/currency'
import favoritesUI from './views/favourites'
import store from './store/favouriteCollection'

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form
 

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault()
    onFormSubmit()
  })

  // handlers
  async function initApp() {
    await locations.init()
    formUI.setAutocompleteData(locations.shortCities)
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue)
    const destination = locations.getCityCodeByKey(formUI.destinationValue)
    const depart_date = formUI.departDateValue
    const return_date = formUI.returnDateValue
    const currency = currencyUI.currecyValue
    const id = locations.index

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
      id
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
