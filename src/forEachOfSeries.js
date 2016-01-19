import iterate from './iterate';

export default function forEachOfSeries(items, fn, callback) {
  iterate(items, fn, callback);
}
