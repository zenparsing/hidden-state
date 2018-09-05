import hiddenState from '../src/hidden-state.js';
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
  const hidden = hiddenState();

  let obj = {};
  hidden(obj, { x: 0 });

  measure('hidden state', () => {
    hidden(obj).x = Math.random();
  });
}