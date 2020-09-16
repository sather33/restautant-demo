window.onload = function() {
  console.log("window loaded")
  initState();
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
