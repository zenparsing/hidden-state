# hidden-state

Attach hidden state to object instances.

## Example

```js
import { hiddenState } from 'hidden-state';

const [getState, initState, hasState] = hiddenState('Point');

class Point {

  constructor(x, y) {
    initState(this, { x, y });
  }

  toString() {
    let { x, y } = getState(this);
    return `<${ x }:${ y }>`;
  }

  add(point) {
    let { x: x1, y: y1 } = getState(this);
    let { x: x2, y: y2 } = getState(point);
    return new Point(x1 + x2, y1 + y2);
  }

  static isPoint(obj) {
    return hasState(obj);
  }

}
```

## Install

```sh
npm install hidden-state
```

## API

### `hiddenState(typeName?)`

Returns an array containing functions that can be used to access the hidden state of an object. The optional `typeName` argument is used to customize `TypeError` messages.

```js
const [getState, initState, hasState] = hiddenState('MyType');
```

The following functions are returned:

#### `getState(obj)`

Returns the hidden state associated with the specified object. If the object does not have hidden state then a `TypeError` is thrown.

#### `initState(obj, state)`

Initializes the hidden state for an object. A `TypeError` is thrown if `state` is **undefined**. An `Error` is thrown if hidden state has previously been initialized for the object.

#### `hasState(obj)`

Returns a boolean value indicating whether the object has associated hidden state.
