function tagBlock (data, className) {
  const name = className || ''
  return createElement('div', {
    attrs: {
      class: 'tag-block ' + name
    },
    children: [
      createElement('div', {
        attrs: {
          class: 'city-tag f-text'
        },
        children: [data.City]
      }),
      createElement('div', {
        attrs: {
          class: 'town-tag f-text'
        },
        children: [data.Town]
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
  const url = restaurant.Url

  if (url) {
    return {
      tag: 'a',
      attrs: {
        href: url,
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
  cleanRowItems()
  const wrapper = restaurantWrapper(restaurant)

  const defaultAttrs = {
    id: restaurant.ID,
    class: 'card',
  }
  const attrs = Object.assign(defaultAttrs, restaurant.attrs)
  
  return createElement(wrapper.tag, {
    attrs: attrs,
    children: [
      tagBlock(restaurant, 'is-desktop-only'),
      createElement('div', {
        attrs: {
          class: 'image-block'
        },
        children: [
          createElement('img', {
            attrs: {
              src: restaurant.PicURL,
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
            children: [restaurant.Name]
          }),
          tagBlock(restaurant, 'is-touch-only'),
          createElement('div', {
            attrs: {
              class: 'item-content f-text'
            },
            children: [restaurant.HostWords]
          }),
        ]
      })
    ],
  })
}

function tdChildren (restaurant) {
  return tableList.map(function(item) {
    const value = restaurant[item.value]

    return createElement('td', {
      attrs: {
        class: item.class ? item.class + '-td' : '',
        'data-content': value
      },
      children: [
        createElement('p', {
          attrs: {
            class: item.class || ''
          },
          children: [value]
        })
      ]
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
  addRowItems()
  const wrapper = restaurantWrapper(restaurant)

  const defaultAttrs = {
    id: restaurant.ID,
    class: 'image-card row-item is-6',
  }

  const attrs = Object.assign(defaultAttrs, restaurant.attrs)

  return createElement(wrapper.tag, {
    attrs: attrs,
    children: [
      createElement('div', {
        attrs: {
          class: 'info-block'
        },
        children: [
          tagBlock(restaurant),
          createElement('div', {
            attrs: {
              class: 'item-title f-text'
            },
            children: [restaurant.Name]
          }),
          createElement('div', {
            attrs: {
              class: 'hide-content'
            },
            children: [
              createElement('div', {
                attrs: {
                  class: 'line'
                }
              }),
              createElement('div', {
                attrs: {
                  class: 'item-content f-text'
                },
                children: [restaurant.HostWords]
              }),
            ]
          })
        ]
      }),
      createElement('div', {
        attrs: {
          class: 'image-block'
        },
        children: [
          createElement('img', {
            attrs: {
              src: restaurant.PicURL,
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
    children: [toString(page)]
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
  return tableList.map(function(item) {
    return createElement('th', {
      children: [
        createElement('p', {
          attrs: {
            class: item.class || ''
          },
          children: [item.label]
        })
      ]
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