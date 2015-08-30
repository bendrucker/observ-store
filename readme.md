# observ-store [![Build Status](https://travis-ci.org/bendrucker/observ-store.svg?branch=master)](https://travis-ci.org/bendrucker/observ-store)

> Observable data store for ordered application data


## Install

```
$ npm install --save observ-store
```


## Usage

```js
var Store = require('observ-store')
var store = Store()

Store.update(store, [
  {id: 1, foo: 'bar'}
])

store.ids()
//=> [1]

store.data()
//=> {1: {id: 1, foo: 'bar'}}
```

## API

#### `Store([initial], [constructor])` -> `function`

##### initial

Type: `object`  
Default: `{}`

Initial data (`{data, ids}`) to load into the observable store.

##### constructor

Type: `function`  
Default: `Observ`

A function to use to construct new values added to `data`. Defaults to [`Observ`](https://github.com/raynos/observ), but you could use an [`ObservStruct`](https://github.com/raynos/observ-struct).

#### Array Methods

The store constructor exposes the following array convenience methods:

* `map`
* `filter`
* `reduce`
* `forEach`
* `every`
* `some`

You can pass in an observable store or a copy (e.g. `store` or `store()`).

```js
var store = Store()
Store.update([{id: 1}, {id: 2}])
Store.map(store, function (item, index) {
  return String(index) + String(item.id)
})
//=> ['01', '12']
```

These methods have the same signatures as the native methods. The first argument is always a store, followed by a callback and any other arguments the method accepts on a normal `[]` array.

## License

MIT © [Ben Drucker](http://bendrucker.me)
