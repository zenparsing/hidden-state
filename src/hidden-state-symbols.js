/*

This implementation is not hidden, since Reflect.ownKeys can be used
to obtain a list of symbol names installed on the object. If Symbol.private()
ever becomes a thing, this implementation will be preferred over WeakMap.

*/

export default function hiddenState(description = '') {
  const Data = Symbol();
  const Ref = Symbol();

  function hidden(obj, data) {
    if (data !== undefined) {
      obj[Ref] = obj;
      obj[Data] = data;
    } else {
      if (obj[Ref] !== obj) {
        throw new TypeError(
          `Object is not a valid instance of ${ description || 'this type' }`
        );
      }
      data = obj[Data];
    }
    return data;
  }

  hidden.hasState = (obj => obj[Ref] === obj);

  return hidden;
}
