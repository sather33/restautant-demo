function getState (key) {
  const state = sessionStorage.getItem(key);

  return JSON.parse(state)
}

function getRestaurant () {
  return getState('restaurants')
}

function getRestaurantsGroupByCity () {
  return getState('restaurantsGroupByCity')
}

function getChunkRestaurant () {
  return getState('chunkRestaurants')
}

function getCities () {
  return getState('cities')
}

function getPage () {
  return parseInt(getParameterByName('page'), 10)
}