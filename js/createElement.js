function createElement (tagName, item) {
  const vElement = Object.create(null);
  const attrs = item.attrs
  const children = item.children
  
  Object.assign(vElement, {
    tagName: tagName,
    attrs: attrs || {},
    children: children || [],
  });
  
  return vElement;
};