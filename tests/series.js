import should from 'should';
import { series } from '../src';

describe('series', () => {
  let t = null;

  it('should be able to use it synchronousli', (done) => {
    let results = [];

    series([
      (cb) => cb(null, 1),
      (cb) => cb(null, 2),
      (cb) => cb(null, 3),
    ], (err, res) => {
      if (err) {
        throw err;
      }

      results = res;
    });

    if (results.join('') !== '123') {
      throw new Error('Something is wrong with iteration');
    }

    done();
  });

  it('should be able to use it asynchronousli', (done) => {
    let hasEnd = false;

    series([
      (cb) => setTimeout(() => cb(null, 1), 100),
      (cb) => setTimeout(() => cb(null, 2), 100),
      (cb) => setTimeout(() => cb(null, 3), 100),
    ], (err, results) => {
      if (err) {
        throw err;
      }

      if (results.join('') !== '123') {
        throw new Error('Something is wrong with iteration');
      }

      if (!hasEnd) {
        throw new Error('Something is wrong with async');
      }

      done();
    });

    hasEnd = true;
  });

  it('should be able to use it asynchronousli with error', (done) => {
    let hasEnd = false;

    series([
      (cb) => setTimeout(() => cb(null, 1), 100),
      (cb) => setTimeout(() => cb(null, 2), 100),
      (cb) => setTimeout(() => cb(new Error('Bad')), 100),
    ], (err, results) => {
      if (!err) {
        throw new Error('Error is not working');
      }

      if (!hasEnd) {
        throw new Error('Something is wrong with async');
      }

      done();
    });

    hasEnd = true;
  });
});
