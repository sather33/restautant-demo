var currentPage = 1
var theme = 'list'

window.onload = async function() {
  console.log("window loaded")
  await initState();
  await renderCityOptions()
  await renderRestaurants()
  await checkTheme()
  closeLoading()
};

function initState () {
  loadDataToStorage()
  loadDataGroupByCity()
  loadChunkRestaurants()
  loadCities()
  
  const data = getRestaurant();
  data.map(item => {
    console.log('item', item)
  })
}

var themeDoms = {
  list: getListIconDom,
  table: getTableIconDom,
  image: getImageIconDom,
}

function cleanIconsClass () {
  const elements = getIconsDom()

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    element.classList.remove('is-active') 
  }
}

function checkTheme () {
  cleanIconsClass()
  themeDoms[theme]().classList.add('is-active')
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

function cleanChildren (element) {
  element.innerHTML = ''
}

function cleanMainDom () {
  cleanChildren(getMainDom())
}

async function renderPagination (page) {
  const element = getPaginationDom()
  cleanChildren(element)

  for (let index = 1; index <= page; index++) {
    const config = createPaginationConfig(index)
    await renderDom(config, 'pagination')
  }

  listenPagination()
}

function updateCurrentPage () {
  const element = getCurrentPageDom()
  element.innerHTML = currentPage
}

function updateTotalPage (page) {
  const element = getTotalPageDom()
  element.innerHTML = page
}

function handleCorrectCurrentPage (page) {
  if (page < currentPage) {
    currentPage = 1
    return
  }

  return page
}

function createRestaurantInMain (chunkList) {
  chunkList[currentPage - 1].map(item => {
    const config = createRestaurantConfig(item)
    renderDom(config, 'main')
  })
}

function createRestaurantInTable (chunkList) {
  chunkList[currentPage - 1].map(item => {
    const config = createRestaurantConfig(item)
    renderDom(config, 'main-table-tbody')
  })
}

function handleTableTemplate () {
  const config = createTableTemplate()
  renderDom(config, 'main')
}

function createRestaurantDom (list) {
  const listWithIndex = list.map((item, index) => ({
    ...item,
    Index: `${index + 1}`
  }))

  cleanMainDom()

  const chunkList = chunk(listWithIndex, 10)
  const totalPage = chunkList.length

  handleCorrectCurrentPage(totalPage)
  updateCurrentPage()
  updateTotalPage(totalPage)
  renderPagination(totalPage);

  if (theme === 'table') {
    handleTableTemplate()
    createRestaurantInTable(chunkList)
    return
  }

  createRestaurantInMain(chunkList)
}

function initRestaurant () {
  const restaurants = getRestaurant()
  createRestaurantDom(restaurants)
}

function selectCityRestaurant (city) {
  const restaurantsGroupByCity = getRestaurantsGroupByCity()
  const restaurant = restaurantsGroupByCity[city]
  createRestaurantDom(restaurant)
}

function selectDistrictRestaurant (city, district) {
  const restaurantsGroupByCity = getRestaurantsGroupByCity()
  const restaurants = restaurantsGroupByCity[city]
  const filteredList = restaurants.filter(restaurant => restaurant.Town === district)
  createRestaurantDom(filteredList)
}

function renderRestaurants () {
  const city = selectedCity()
  const district = selectedDistrict()

  if (!city && !district) {
    return initRestaurant()
  }

  if (district) {
    return selectDistrictRestaurant(city, district)
  }

  return selectCityRestaurant(city)
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
    return renderRestaurants()
  }

  renderDistrictOptions(district)
  renderRestaurants()
}

function handleSelectDistrict ({ value }) {
  renderRestaurants()
}

function changePage (page) {
  currentPage = page
  window.scrollTo(0, 0);
  renderRestaurants()
}

function listenPagination () {
  const elements = document.getElementsByClassName('pagination-item')

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const { page } = element.dataset
    element.addEventListener('click', function () {
      changePage(parseInt(page, 10))
    })
  }
}

function updateTheme (value) {
  theme = value
}

function switchTheme (value) {
  updateTheme(value)
  checkTheme()
  renderRestaurants()
}