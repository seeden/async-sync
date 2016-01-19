import { setImmediate } from 'async';

const doNothing = () => {};

export default function forEachOfSeries(items, fn, callback = doNothing, current = 0) {
  if (items.length <= current) {
    return callback(null);
  }

  // try to do everything sync
  for (let index = current; index < items.length; index++) {
    const item = items[index];

    let hasResult = false;
    let isAsync = false;

    fn(item, index, (err) => {
      if (err) {
        return callback(err);
      }

      hasResult = true;

      // if sync then next itteration is by for
      if (!isAsync) {
        return void 0;
      }

      // call async function because it was async already
      setImmediate(() => forEachOfSeries(items, fn, callback, index + 1));
    });

    isAsync = true;

    // waiting for async operation
    if (!hasResult) {
      return void 0;
    }
  }

  // everything sync finished
  callback(null);
}
