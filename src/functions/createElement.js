const createElement = (element, callback, attrs = {}, ...children) => {
    
    const _element = document.createElement(element);

    for ( let attr of Object.keys(attrs) ){
        _element.setAttribute(attr, attrs[attr]);
    }
    
    children.forEach(child => {
        if ( child ) _element.appendChild(child);
    });

    if ( callback ) callback(_element);
    
    return _element;
    
  };

  export default createElement;