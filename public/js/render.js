function renderElem (element) {
  const tagName = element.tagName
  const attrs = element.attrs
  const children = element.children
  const elem = document.createElement(tagName);
  if (attrs) {
    Object.keys(attrs).map(function(key)  {
      elem.setAttribute(key, attrs[key]);
    })
  }

  if (children) {
    children.map(function(child) {
      elem.appendChild(render(child));
    })
  }

  return elem;
};

function render (vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  return renderElem(vNode);
};

var mount = function (element, id) {
  const targetNode = document.getElementById(id)
  if (!targetNode) {
    return
  }

  targetNode.appendChild(element);
};