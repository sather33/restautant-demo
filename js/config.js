function createRestaurantConfig (restaurant) {
  const { ID, PicURL, Name, HostWords } = restaurant

  return createElement('div', {
    attrs: {
      id: ID,
      class: 'card'
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
  const className = page - 1 === currentPage ? 'pagination-item is-active' : 'pagination-item'

  return createElement('div', {
    attrs: {
      id: 'page-' + page,
      class: className,
      'data-page': page
    },
    children: [`${page}`]
  })
}