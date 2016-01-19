# async-sync

Safe async utilities for node and the browser

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

[npm-image]: https://img.shields.io/npm/v/async-sync.svg?style=flat-square
[npm-url]: https://www.npmjs.com/async-sync
[travis-image]: https://img.shields.io/travis/seeden/async-sync/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/seeden/async-sync
[coveralls-image]: https://img.shields.io/coveralls/seeden/async-sync/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/seeden/async-sync?branch=master
[github-url]: https://github.com/seeden/async-sync

# What

[Async](https://github.com/caolan/async) library is not ideal if you are trying to use async operations as sync operations.
This is not a very common situation but if you are working for example with browser canvas tag you want to draw all shapes synchronosli to avoid "blinking" of the image.
The second problem is described in the [documentation](https://github.com/caolan/async#common-pitfalls-stackoverflow) of the async library.
In the whorst scenario you will get RangeError: Maximum call stack size exceeded. This will happen when you will have a lot of shapes.

# Solution

You can use this library to avoid this two issues. You can use each function as classic async function. But you are safe if you will use it synchronosli. That means if you will call callbacks imadiately.

# Usage


## Control Flow

<a name="series"></a>
### series(tasks, [callback])

Run the functions in the `tasks` array in series, each one running once the previous
function has completed. If any functions in the series pass an error to its
callback, no more functions are run, and `callback` is immediately called with the value of the error.
Otherwise, `callback` receives an array of results when `tasks` have completed.


__Arguments__

* `tasks` - An array containing functions to run, each function is passed
  a `callback(err, result)` it must call on completion with an error `err` (which can
  be `null`) and an optional `result` value.
* `callback(err, results)` - An optional callback to run once all the functions
  have completed. This function gets a results array containing all
  the result arguments passed to the `task` callbacks.

__Example__

```js
async.series([
    function(callback){
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback){
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results){
    // results is now equal to ['one', 'two']
});

## Collections

### eachSeries(arr, iterator, [callback])

Applies the function iterator to each item in arr, in series. The iterator is called with an item from the list, and a callback for when it has finished. If the iterator passes an error to its callback, the main callback (for the each function) is immediately called with the error.

__Arguments__

* `arr` - An array to iterate over.
* `iterator(item, callback)` - A function to apply to each item in `arr`.
  The iterator is passed a `callback(err)` which must be called once it has
  completed. If no error has occurred, the `callback` should be run without
  arguments or with an explicit `null` argument.  The array index is not passed
  to the iterator.  If you need the index, use [`forEachOfSeries`](#forEachOfSeries).
* `callback(err)` - *Optional* A callback which is called when all `iterator` functions
  have finished, or an error occurs.

```js
// assuming openFiles is an array of file names

async.each(openFiles, function(file, callback) {
  // Perform operation on file here.
  console.log('Processing file ' + file);

  if( file.length > 32 ) {
    console.log('This file name is too long');
    callback('File name too long');
  } else {
    // Do work to process file here
    console.log('File processed');
    callback();
  }
}, function(err){
    // if any of the file processing produced an error, err would equal that error
    if( err ) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file failed to process');
    } else {
      console.log('All files have been processed successfully');
    }
});
```

<a name="forEachOfSeries"></a>
### forEachOfSeries(obj, iterator, [callback])

Like `eachSeries`, except that it iterates over objects, and passes the key as the second argument to the iterator.

__Arguments__

* `obj` - An object or array to iterate over.
* `iterator(item, key, callback)` - A function to apply to each item in `obj`.
The `key` is the item's key, or index in the case of an array. The iterator is
passed a `callback(err)` which must be called once it has completed. If no
error has occurred, the callback should be run without arguments or with an
explicit `null` argument.
* `callback(err)` - *Optional* A callback which is called when all `iterator` functions have finished, or an error occurs.
