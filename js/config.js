function createRestaurantConfig (restaurant) {
  const { ID, PicURL, Name, HostWords } = restaurant

  return createElement('div', {
    attrs: {
      id: ID,
      class: 'card'
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
  return createElement('div', {
    attrs: {
      class: 'pagination-item',
      'data-page': page
    },
    children: [`${page}`]
  })
}