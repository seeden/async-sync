import iterate from './iterate';


export default function series(tasks, callback) {
  const results = [];

  iterate(tasks, (task, index, cb) => {
    task((err, result) => {
      if (err) {
        return cb(err);
      }

      results[index] = result;
      cb(null);
    });
  }, (err) => {
    if (err) {
      return callback(err);
    }

    callback(null, results)
  });
}
