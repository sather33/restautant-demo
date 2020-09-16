function setState (key, data) {
  sessionStorage.setItem(key, JSON.stringify(data))
}

function loadDataToStorage() {
  console.log('load data')
  setState('restaurants', data)
}

function loadDataGroupByCity () {
  const data = getRestaurant();
  const dataGroupByCity = groupBy(data, 'City')

  setState('restaurantsGroupByCity', dataGroupByCity)
}

function loadChunkRestaurants () {
  const data = getRestaurant();
  const chunkedRestaurants = chunk(data, 10)

  setState('chunkRestaurants', chunkedRestaurants)
}
