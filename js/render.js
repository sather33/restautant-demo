function renderElem ({ tagName, attrs, children }) {
  const elem = document.createElement(tagName);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      elem.setAttribute(k, v);
    }
  }

  if (children) {
    for (const child of children) {
      elem.appendChild(render(child));
    }
  }

  return elem;
};

function render (vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  return renderElem(vNode);
};

function mount (element, id) {
  const targetNode = document.getElementById(id)
  if (!targetNode) {
    return
  }

  targetNode.appendChild(element);
};