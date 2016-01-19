import iterate from './iterate';

export default function eachSeries(items, fn, callback) {
  iterate(items, (value, index, cb) => fn(value, cb), callback);
}
