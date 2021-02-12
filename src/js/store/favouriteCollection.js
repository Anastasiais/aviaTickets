
class StoreUI {
  static getFavouritesCollection() {
    let favourites
    if(localStorage.getItem('favourites') === null) {
       favourites = []       
    } else {
      favourites = JSON.parse(localStorage.getItem('books'))
    }
    return favourites
  }
  static addFavouriteTicketToCollection(favourite){
    const favourites = StoreUI.getBooks()

    favourites.push(favourite)

    localStorage.setItem('favourites', JSON.stringify(favourites))
  }

  static removeBook(id) {
    const favorites = StoreUI.getFavouritesCollection()

    favourites.forEach((favourite, id) =>{
      if(book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
} 
const store = new StoreUI()

export default store