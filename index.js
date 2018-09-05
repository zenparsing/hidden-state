'use strict';

module.exports = hiddenState;

function hiddenState(description = '') {
  const map = new WeakMap();

  function hidden(obj, data) {
    if (data !== undefined) {
      map.set(obj, data);
    } else {
      data = map.get(obj);
      if (data === undefined) {
        throw new TypeError(
          `Object is not a valid instance of ${ description || 'this type' }`
        );
      }
    }
    return data;
  };

  hidden.hasState = (obj => map.has(obj));

  return hidden;
}
