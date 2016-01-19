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

## Collections

### eachSeries(arr, iterator, [callback])

Applies the function iterator to each item in arr, in series. The iterator is called with an item from the list, and a callback for when it has finished. If the iterator passes an error to its callback, the main callback (for the each function) is immediately called with the error.

__Arguments__

* `arr` - An array to iterate over.
* `iterator(item, callback)` - A function to apply to each item in `arr`.
  The iterator is passed a `callback(err)` which must be called once it has
  completed. If no error has occurred, the `callback` should be run without
  arguments or with an explicit `null` argument.  The array index is not passed
  to the iterator.  If you need the index, use [`forEachOf`](#forEachOf).
* `callback(err)` - *Optional* A callback which is called when all `iterator` functions
  have finished, or an error occurs.
