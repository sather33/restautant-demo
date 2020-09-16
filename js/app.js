window.onload = async function() {
  console.log("window loaded")
  await initState();
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