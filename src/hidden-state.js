const WM = WeakMap;

const [$get, $set] = ['get', 'set'].map(
  name => Function.prototype.call.bind(WM.prototype[name])
);

export default function hiddenState(description = '') {
  const map = new WM();

  function hidden(obj, data) {
    if (data !== undefined) {
      $set(map, obj, data);
    } else {
      data = $get(map, obj);
      if (data === undefined) {
        throw new TypeError(
          `Object is not a valid instance of ${ description || 'this type' }`
        );
      }
    }
    return data;
  }

  hidden.hasState = (obj => $get(map, obj) !== undefined);

  return hidden;
}
