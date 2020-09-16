window.onload = async function() {
  console.log("window loaded")
  await initState();
  await renderInitDoms()
  closeLoading()
};

function loadDataToStorage() {
  console.log('load data')
  sessionStorage.setItem('restaurants', JSON.stringify(data))
}

function getState() {
  const state = sessionStorage.getItem('restaurants');

  return JSON.parse(state)
}

function initState () {
  loadDataToStorage();
  const data = getState();

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

function renderDom (config) {
  const dom = createElement('div', config);
  
  mount(render(dom), 'main')
}

function renderInitDoms () {
  const data = getState()

  for (let index = 0; index < 10; index++) {
    const config = createRestaurantConfig(data[index])

    renderDom(config)
  }
}