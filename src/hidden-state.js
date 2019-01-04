const WM = WeakMap;

const [$get, $set] = ['get', 'set'].map(
  name => Function.prototype.call.bind(WM.prototype[name])
);

export function hiddenState(typeName = '') {
  const map = new WM();
  const msg = typeName
    ? `Object is not a valid instance of ${ typeName }`
    : 'Object is not a valid instance';

  function getState(obj) {
    let state = $get(map, obj);
    if (state === undefined) {
      throw new TypeError(msg);
    }
    return state;
  }

  function setState(obj, data) {
    if (data === undefined) {
      throw new TypeError('Hidden state cannot be undefined');
    }
    $set(map, obj, data);
  }

  function hasState(obj) {
    return $get(map, obj) !== undefined;
  }

  return [getState, setState, hasState];
}

// #[deprecated]
export default function(typeName) {
  let [getState, setState, hasState] = hiddenState(typeName);

  function hidden(obj, ...args) {
    return args.length > 0 ? setState(obj, args[0]) : getState(obj);
  }

  hidden.hasState = hasState;

  return hidden;
}
