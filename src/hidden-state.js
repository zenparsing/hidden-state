const WM = WeakMap;

const [$get, $set, $has] = ['get', 'set', 'has'].map(
  name => Function.prototype.call.bind(WM.prototype[name])
);

export default function hiddenState(description = '') {
  const map = new WM();

  function hidden(obj, ...args) {
    let data;
    if (args.length > 0) {
      data = args[0];
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

  hidden.hasState = (obj => $has(map, obj));

  return hidden;
}
