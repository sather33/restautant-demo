window.onload = async function() {
  console.log("window loaded")
  await initState();
  await renderInitDoms()
  await renderCityOptions()
  closeLoading()
};

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

function renderDom (config, id) {
  if (!id) {
    return
  }
  
  mount(render(config), id)
}

function renderInitDoms () {
  const chunkRestaurants = getChunkRestaurant()
  console.log('chunkRestaurants', chunkRestaurants)

  chunkRestaurants[0].map(item => {
    const config = createRestaurantConfig(item)
    renderDom(config, 'main')
  })
}

function renderOptions (data, id) {
  data.map(name => {
    const config = createOptionConfig(name)
    console.log('config', config)
    renderDom(config, id)
  })
}

function renderCityOptions () {
  const cities = getCities()
  console.log('cities', cities)
  renderOptions(cities, 'city-select')
}