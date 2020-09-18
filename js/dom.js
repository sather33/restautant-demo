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

function getCurrentPageDom () {
  return document.getElementById('current-page')
}

function getTotalPageDom () {
  return document.getElementById('total-page')
}

function getPaginationItemDoms () {
  return document.getElementsByClassName('pagination-item')
}

function getPaginationItemDom (page) {
  const id = 'page-' + page
  return document.getElementById(id)
}