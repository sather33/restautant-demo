function getCitySelectDom () {
  return document.getElementById('city-select')
}

function selectedCity () {
  return getCitySelectDom().value
}

function getDistrictSelectDom () {
  return document.getElementById('district-select')
}

function selectedDistrict () {
  return getDistrictSelectDom().value
}

function getMainDom () {
  return document.getElementById('main')
}

function getPaginationDom () {
  return document.getElementById('pagination')
}