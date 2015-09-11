'use strict'

var toArray = require('to-array')
var value = require('observ-value')
var methods = ['map', 'forEach', 'filter', 'reduce', 'every', 'some']

module.exports = methods.reduce(function (api, method) {
  api[method] = function (store) {
    var array = asArray(store)
    var args = toArray(arguments, 1)
    return array[method].apply(array, args)
  }

  return api
}, {})

function asArray (store) {
  store = value(store)

  return store.ids.map(function (id) {
    return store.data[id]
  })
}
