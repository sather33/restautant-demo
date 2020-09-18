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

function createRestaurantConfig (restaurant) {
  const { ID, PicURL, Name, HostWords, City, Town } = restaurant

  return createElement('div', {
    attrs: {
      id: ID,
      class: 'card'
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
        ]
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
          tagBlock('is-touch-only', { City, Town }),
          createElement('div', {
            attrs: {
              class: 'item-content'
            },
            children: [HostWords]
          }),
        ]
      })
    ],
  })
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