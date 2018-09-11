/*

This implementation is not hidden, since Reflect.ownKeys can be used
to obtain a list of symbol names installed on the object. If Symbol.private()
ever becomes a thing, this implementation will be preferred over WeakMap.

*/

export default function hiddenState(description = '') {
  const $data = Symbol();
  const $brand = Symbol();

  function hidden(obj, data) {
    if (data !== undefined) {
      obj[$brand] = obj;
      obj[$data] = data;
    } else {
      if (obj[$brand] !== obj) {
        throw new TypeError(
          `Object is not a valid instance of ${ description || 'this type' }`
        );
      }
      data = obj[$data];
    }
    return data;
  }

  hidden.hasState = (obj => obj[$brand] === obj);

  return hidden;
}
