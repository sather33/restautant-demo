function tagBlock (className, { City, Town }) {
  return createElement('div', {
    attrs: {
      class: 'tag-block ' + className
    },
    children: [
      createElement('div', {
        attrs: {
          class: 'city-tag'
        },
        children: [City]
      }),
      createElement('div', {
        attrs: {
          class: 'town-tag'
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

  const wrapper = restaurantWrapper(restaurant)

  return createElement(wrapper.tag, {
    attrs: {
      id: ID,
      class: 'card',
      ...wrapper.attrs
    },
    children: [
      tagBlock('is-desktop-only', { City, Town }),
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
          tagBlock('is-touch-only', { City, Town }),
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

function tableThemeConfig (restaurant) {
  const { City, Town, PicURL, Name, HostWords } = restaurant

  return createElement('div', {
    children: ['tableThemeConfig']
  })
}

function imageThemeConfig (restaurant) {
  const { City, Town, PicURL, Name, HostWords } = restaurant

  return createElement('div', {
    attrs: {
      id: ID,
      class: 'image-card'
    },
    children: [
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