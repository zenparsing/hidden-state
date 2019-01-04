import { hiddenState } from '../src/hidden-state.js';
import { performance } from 'perf_hooks';

function measure(msg, fn) {
  let then = performance.now();
  for (let i = 0; i < 10000000; ++i) {
    fn();
  }
  console.log((performance.now() - then).toFixed(2), `(${ msg })`);
}

{
  let obj = {};
  obj.state = { x: 0 };

  measure('warmup', () => {
    obj.state.x = Math.random();
  });
}

{
  let obj = {};
  obj.state = { x: 0 };

  measure('state property', () => {
    obj.state.x = Math.random();
  });
}

{
  let obj = {};
  obj.x = 0;

  measure('string properties', () => {
    obj.x = Math.random();
  });
}

{
  const [getState, setState] = hiddenState();

  let obj = {};
  setState(obj, { x: 0 });

  measure('hidden state', () => {
    getState(obj).x = Math.random();
  });
}
