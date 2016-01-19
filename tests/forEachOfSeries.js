import should from 'should';
import { forEachOfSeries } from '../src';

describe('forEachOfSeries', () => {
  let t = null;

  it('should be able to use it synchronousli', (done) => {
    let hasResult = false;
    let total = 0;
    let indexTotal = 0;

    forEachOfSeries([1, 2, 3, 4, 5], (value, index, callback) => {
      total += value;
      indexTotal += index;

      callback(null);
    }, () => {
      hasResult = true;
    });

    if (total !== 15) {
      throw new Error('Something is wrong with iteration');
    }

    if (indexTotal !== 10) {
      throw new Error('Something is wrong with iteration');
    }

    if (!hasResult) {
      throw new Error('Something is wrong with sync');
    }

    done();
  });

  it('should be able to use it asynchronousli', (done) => {
    let hasEnd = false;
    let total = 0;
    let indexTotal = 0;

    forEachOfSeries([1, 2, 3, 4, 5], (value, index, callback) => {
      total += value;
      indexTotal += index;

      setTimeout(() => callback(null), 100);
    }, (err) => {
      if (err) {
        throw err;
      }

      if (total !== 15) {
        throw new Error('Something is wrong with iteration');
      }

      if (indexTotal !== 10) {
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
    let total = 0;

    forEachOfSeries([1, 2, 3, 4, 5], (value, index, callback) => {
      total += value;

      setTimeout(() => callback(new Error('Bad')), 100);
    }, (err) => {
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
