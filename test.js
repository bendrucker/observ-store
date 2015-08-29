'use strict'

var test = require('tape')
var Store = require('./')

test(function (t) {
  var store = Store()
  Store.update(store, [
    {id: 1, foo: 'bar'},
    {id: 2, bar: 'baz'}
  ])

  t.deepEqual(store(), {
    data: {
      1: {
        id: 1,
        foo: 'bar'
      },
      2: {
        id: 2,
        bar: 'baz'
      }
    },
    ids: [1, 2]
  })

  var first = store.data.get(1)

  Store.update(store, [
    {id: 1, foo: 'rebar'},
    {id: 2, bar: 'baz'}
  ])

  t.equal(first().foo, 'rebar')

  t.end()
})

test('array methods', function (t) {
  var store = Store()
  Store.update(store, [
    {id: 1, foo: 'bar'},
    {id: 2, bar: 'baz'}
  ])

  // passing in observable (fn)
  var above1 = Store.filter(store, function (item) {
    return item.id > 1
  })
  t.equal(above1.length, 1)
  t.equal(above1[0].id, 2)

  // passing in copy (object)
  var sum = Store.reduce(store(), function (sum, item) {
    return sum + item.id
  }, 0)
  t.equal(sum, 3)

  t.end()
})
