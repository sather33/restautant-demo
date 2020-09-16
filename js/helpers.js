function groupBy (list, type) {
  return list.reduce((carry, value) => {
    const key = value[type]

    if (carry[key]) {
      carry[key].push(value)

      return carry 
    }

    carry[key] = [value]
    return carry
  }, {})
}

function chunk (array, size) {
  return [].concat.apply([],
    array.map(function(elem, i) {
      return i % size ? [] : [array.slice(i, i + size)];
    })
  );
}
