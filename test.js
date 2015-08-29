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
