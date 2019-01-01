import hiddenState from '../src/hidden-state.js';
import * as assert from 'assert';

// Get/set

{
  let hidden = hiddenState();
  let obj = {};
  hidden(obj, { x: 1, y: 2 });
  assert.deepEqual(hidden(obj), { x: 1, y: 2 });
}

{
  let hidden = hiddenState();
  let obj = {};

  assert.throws(() => hidden(obj));
}

// Proxies/prototyping

{
  let hidden = hiddenState();
  let obj = {};
  hidden(obj, { x: 1 });
  assert.throws(() => hidden(new Proxy(obj, {})));
}

{
  let hidden = hiddenState();
  let obj = {};
  hidden(obj, { x: 1 });
  assert.throws(() => hidden(Object.create(obj)));
}

// hasState

{
  let hidden = hiddenState();
  let obj = {};
  hidden(obj, {});
  assert.equal(hidden.hasState(obj), true);
}

{
  let hidden = hiddenState();
  let obj = {};
  assert.equal(hidden.hasState(obj), false);
}

{
  let hidden = hiddenState();
  let obj = {};
  hidden(obj, undefined);
  assert.equal(hidden.hasState(obj), true);
}

{
  const hidden = hiddenState('Point');

  class Point {

    constructor(x = 0, y = 0) {
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

  let hidden = hiddenState();
  let obj = {};
  hidden(obj, { x: 1, y: 2 });
  assert.deepEqual(hidden(obj), { x: 1, y: 2 });
  assert.deepEqual(hidden.hasState(obj), true);
}
