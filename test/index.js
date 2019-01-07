import { hiddenState } from '../src/hidden-state.js';
import * as assert from 'assert';

// Get/set

{
  let [getState, initState] = hiddenState();
  let obj = {};
  initState(obj, { x: 1, y: 2 });
  assert.deepEqual(getState(obj), { x: 1, y: 2 });
}

{
  let [getState] = hiddenState();
  let obj = {};

  assert.throws(() => getState(obj));
}

// Proxies/prototyping

{
  let [getState, initState] = hiddenState();
  let obj = {};
  initState(obj, { x: 1 });
  assert.throws(() => getState(new Proxy(obj, {})));
}

{
  let [getState, initState] = hiddenState();
  let obj = {};
  initState(obj, { x: 1 });
  assert.throws(() => getState(Object.create(obj)));
}

// hasState

{
  let [, initState, hasState] = hiddenState();
  let obj = {};
  initState(obj, {});
  assert.equal(hasState(obj), true);
}

{
  let [,, hasState] = hiddenState();
  let obj = {};
  assert.equal(hasState(obj), false);
}

{
  let [, initState, hasState] = hiddenState();
  let obj = {};
  assert.throws(() => initState(obj, undefined));
  assert.equal(hasState(obj), false);
}

{
  let [, initState] = hiddenState();
  let obj = {};
  initState(obj, {});
  assert.throws(() => initState(obj, {}));
}

{
  const [getState, initState, hasState] = hiddenState('Point');

  class Point {

    constructor(x = 0, y = 0) {
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

  assert.equal(new Point().add(new Point(3, 4)).toString(), '<3:4>');
  assert.equal(Point.isPoint(new Point()), true);
  assert.equal(Point.isPoint({}), false);
  assert.equal(Point.isPoint(Object.create(new Point())), false);

  try {
    Point.prototype.toString.call({});
    assert.ok(false);
  } catch (err) {
    assert.equal(err.name, 'TypeError');
    assert.ok(err.message.includes('Point'));
  }
}

{
  // This test patches globals - it should be executed last
  WeakMap.prototype.get = function() { throw new Error(); };
  WeakMap.prototype.get = function() { throw new Error(); };
  WeakMap.prototype.has = function() { throw new Error(); };
  global.WeakMap = function() {};

  let [getState, initState, hasState] = hiddenState();
  let obj = {};
  initState(obj, { x: 1, y: 2 });
  assert.deepEqual(getState(obj), { x: 1, y: 2 });
  assert.deepEqual(hasState(obj), true);
}
