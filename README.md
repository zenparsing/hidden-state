# hidden-state

Attach hidden state to object instances.

## Example

```js
import hiddenState from 'hidden-state';

const hidden = hiddenState('Point');

class Point {

  constructor(x, y) {
    hidden(this, { x, y });
  }

  toString() {
    let { x, y } = hidden(this);
    return `<${ x }:${ y }>`;
  }

  add(point) {
    let { x: x1, y: y1 } = hidden(this);
    let { x: x2, y: y2 } = hidden(point);
    return new Point(x1 + x2, y1 + y2);
  }

  static isPoint(obj) {
    return hidden.hasState(obj);
  }

}
```

## Install

```sh
npm install hidden-state
```

## API

### `hiddenState(description?)`

Creates a new `hidden` function for accessing the hidden state of an object. The optional `description` argument is used to customize `TypeError` messages.

### `hidden(obj)`

Returns the hidden state associated with the specified object. If the object does not have hidden state then a `TypeError` is thrown.

### `hidden(obj, state)`

Initializes the hidden state for an object.

### `hidden.hasState(obj)`

Returns a boolean value indicating whether the object has associated hidden state.
