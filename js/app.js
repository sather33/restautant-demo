window.onload = async function() {
  console.log("window loaded")
  await initState();
  await renderInitDoms()
  await renderCityOptions()
  closeLoading()
};

function initState () {
  loadDataToStorage()
  loadDataGroupByCity()
  loadChunkRestaurants()
  loadCities()
  
  const data = getRestaurant();
  console.log('initState', data)
}

function closeLoading () {
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

  chunkRestaurants[0].map(item => {
    const config = createRestaurantConfig(item)
    renderDom(config, 'main')
  })
}

function renderOptions (data, id) {
  data.map(name => {
    const config = createOptionConfig(name)
    renderDom(config, id)
  })
}

function renderCityOptions () {
  const cities = getCities()
  renderOptions(Object.keys(cities), 'city-select')
}

function resetDistrictOptions () {
  const element = getDistrictSelectDom()
  element.innerHTML = '<option value="">請選擇鄉鎮區...</option>'
}

function renderDistrictOptions (district) {
  renderOptions(district, 'district-select')
}

function handleSelectCity ({ value }) {
  const cities = getCities()
  const district = cities[value]

  resetDistrictOptions()

  if (!district) {
    return 
  }

  renderDistrictOptions(district)
}