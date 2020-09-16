window.onload = async function() {
  console.log("window loaded")
  await initState();
  await renderInitDoms()
  closeLoading()
};

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

function initState () {
  loadDataToStorage();
  loadDataGroupByCity()
  loadChunkRestaurants()
  
  const data = getRestaurant();
  console.log('initState', data)
}

function closeLoading () {
  console.log('closeLoading')
  const element = document.getElementById('loading')

  element.classList.add('hide')
}

function createRestaurantConfig (restaurant) {
  const { ID, PicURL, Name, HostWords } = restaurant

  return {
    attrs: {
      id: ID,
    },
    children: [
      createElement('img', {
        attrs: {
          src: PicURL,
        },
      }),
      createElement('div', {
        attrs: {
          class: 'text-block'
        },
        children: [
          createElement('div', {
            attrs: {
              class: 'item-title'
            },
            children: [Name]
          }),
          createElement('div', {
            attrs: {
              class: 'item-content'
            },
            children: [HostWords]
          }),
        ]
      })
    ],
  }
}

function renderDom (item) {
  const config = createRestaurantConfig(item)
  const dom = createElement('div', config);
  
  mount(render(dom), 'main')
}

function renderInitDoms () {
  const chunkRestaurants = getChunkRestaurant()
  console.log('chunkRestaurants', chunkRestaurants)

  chunkRestaurants[0].map(item => renderDom(item))
}