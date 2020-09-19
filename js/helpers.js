function groupBy (list, type) {
  return list.reduce(function(carry, value) {
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

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}