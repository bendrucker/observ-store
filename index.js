'use strict'

var Struct = require('observ-struct')
var Hash = require('observ-varhash')
var Observ = require('observ')
var ObservArray = require('observ-array')
var assertObserv = require('assert-observ')
var assign = require('xtend/mutable')
var arrayMethods = require('./array')

module.exports = ObservStore

function ObservStore (initial, constructor) {
  initial = initial || {}

  return Struct({
    data: Hash(initial.data || {}, constructor || Observ),
    ids: ObservArray(initial.ids || [])
  })
}

assign(ObservStore, arrayMethods)

ObservStore.update = function update (store, array) {
  assertObserv(store)
  updateHash(store.data, array)
  store.ids.set(ids(array))
}

function updateHash (hash, array) {
  array.forEach(function updateItem (item) {
    var current = hash.get(id(item))
    if (current) return current.set(item)
    hash.put(id(item), item)
  })
}

function ids (array) {
  return array.map(id)
}

function id (item) {
  return item.id
}
