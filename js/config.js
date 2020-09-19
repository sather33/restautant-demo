function tagBlock ({ City, Town }, className = '') {
  return createElement('div', {
    attrs: {
      class: 'tag-block ' + className
    },
    children: [
      createElement('div', {
        attrs: {
          class: 'city-tag f-text'
        },
        children: [City]
      }),
      createElement('div', {
        attrs: {
          class: 'town-tag f-text'
        },
        children: [Town]
      })
    ]
  })
}

const restaurantThemes = {
  list: listThemeConfig,
  table: tableThemeConfig,
  image: imageThemeConfig,
}

function restaurantWrapper (restaurant) {
  const { Url } = restaurant

  if (Url) {
    return {
      tag: 'a',
      attrs: {
        href: Url,
        target: '_blank'
      }
    }
  }

  return {
    tag: 'div',
    attrs: {}
  }
}

function listThemeConfig (restaurant) {
  const { ID, City, Town, PicURL, Name, HostWords } = restaurant

  cleanRowItems()
  const wrapper = restaurantWrapper(restaurant)
  
  return createElement(wrapper.tag, {
    attrs: {
      id: ID,
      class: 'card',
      ...wrapper.attrs
    },
    children: [
      tagBlock({ City, Town }, 'is-desktop-only'),
      createElement('div', {
        attrs: {
          class: 'image-block'
        },
        children: [
          createElement('img', {
            attrs: {
              src: PicURL,
              class: 'image',
            },
          }),
          createElement('div', {
            attrs: {
              class: 'mask',
            },
          }),
        ]
      }),
      createElement('div', {
        attrs: {
          class: 'text-block'
        },
        children: [
          createElement('div', {
            attrs: {
              class: 'item-title f-text'
            },
            children: [Name]
          }),
          tagBlock({ City, Town }, 'is-touch-only'),
          createElement('div', {
            attrs: {
              class: 'item-content f-text'
            },
            children: [HostWords]
          }),
        ]
      })
    ],
  })
}

function tdChildren (restaurant) {
  console.log('restaurant', restaurant)
  return tableList.map((item) => {
    const value = restaurant[item.value]

    return createElement('td', {
      attrs: {
        class: item.class || ''
      },
      children: [value]
    })
  })
}

function tableThemeConfig (restaurant) {
  cleanRowItems()

  return createElement('tr', {
    children: tdChildren(restaurant)
  })
}

function imageThemeConfig (restaurant) {
  const { ID, City, Town, PicURL, Name, HostWords } = restaurant

  addRowItems()
  const wrapper = restaurantWrapper(restaurant)

  return createElement(wrapper.tag, {
    attrs: {
      id: ID,
      class: 'image-card row-item is-6',
      ...wrapper.attrs
    },
    children: [
      createElement('div', {
        attrs: {
          class: 'info-block'
        },
        children: [
          tagBlock({ City, Town }),
          createElement('div', {
            attrs: {
              class: 'item-title f-text'
            },
            children: [Name]
          }),
        ]
      }),
      createElement('div', {
        attrs: {
          class: 'image-block'
        },
        children: [
          createElement('img', {
            attrs: {
              src: PicURL,
              class: 'image',
            },
          }),
          createElement('div', {
            attrs: {
              class: 'mask',
            },
          }),
        ]
      }),
    ]
  })
}

function createRestaurantConfig (restaurant) {
  return restaurantThemes[theme](restaurant)
}

function createOptionConfig (name) {
  return createElement('option', {
    attrs: {
      value: name
    },
    children: [name]
  })
}

function createPaginationConfig (page) {
  const className = page === currentPage ? 'pagination-item is-active' : 'pagination-item'

  return createElement('div', {
    attrs: {
      id: 'page-' + page,
      class: className,
      'data-page': page
    },
    children: [`${page}`]
  })
}

function addRowItems () {
  const element = getMainDom()
  element.classList.add('row-items')
}

function cleanRowItems () {
  const element = getMainDom()
  element.classList.remove('row-items')
}

const tableList = [
  {
    label: '編號',
    value: 'Index'
  },
  {
    label: '行政區域',
    value: 'City'
  },
  {
    label: '鄉政區',
    value: 'Town'
  },
  {
    label: '商家',
    value: 'Name'
  },
  {
    label: '地址',
    value: 'Address',
    class: 'content'
  },
]

function thChildren () {
  return tableList.map(item => {
    return createElement('th', {
      attrs: {
        class: item.class || ''
      },
      children: [item.label]
    })
  })
}

function createTableTemplate () {
  return createElement('table', {
    attrs: {
      id: 'main-table'
    },
    children: [
      createElement('thead', {
        attrs: {
          id: 'main-table-thead'
        },
        children: [
          createElement('tr', {
            children: thChildren()
          })
        ]
      }),
      createElement('tbody', {
        attrs: {
          id: 'main-table-tbody'
        },
      })
    ]
  })
}