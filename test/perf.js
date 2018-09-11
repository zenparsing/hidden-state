import hiddenState from '../src/hidden-state.js';
import hiddenStateSymbols from '../src/hidden-state-symbols.js';
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
  const hidden = hiddenStateSymbols();

  let obj = {};
  hidden(obj, { x: 0 });

  measure('hidden state symbols', () => {
    hidden(obj).x = Math.random();
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
