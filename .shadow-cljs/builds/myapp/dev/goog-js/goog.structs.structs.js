["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/structs/structs.js"],"~:js","goog.provide(\"goog.structs\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.object\");\ngoog.structs.getCount = function(col) {\n  if (col.getCount && typeof col.getCount == \"function\") {\n    return col.getCount();\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return col.length;\n  }\n  return goog.object.getCount(col);\n};\ngoog.structs.getValues = function(col) {\n  if (col.getValues && typeof col.getValues == \"function\") {\n    return col.getValues();\n  }\n  if (typeof Map !== \"undefined\" && col instanceof Map || typeof Set !== \"undefined\" && col instanceof Set) {\n    return Array.from(col.values());\n  }\n  if (typeof col === \"string\") {\n    return col.split(\"\");\n  }\n  if (goog.isArrayLike(col)) {\n    var rv = [];\n    var l = col.length;\n    for (var i = 0; i < l; i++) {\n      rv.push(col[i]);\n    }\n    return rv;\n  }\n  return goog.object.getValues(col);\n};\ngoog.structs.getKeys = function(col) {\n  if (col.getKeys && typeof col.getKeys == \"function\") {\n    return col.getKeys();\n  }\n  if (col.getValues && typeof col.getValues == \"function\") {\n    return undefined;\n  }\n  if (typeof Map !== \"undefined\" && col instanceof Map) {\n    return Array.from(col.keys());\n  }\n  if (typeof Set !== \"undefined\" && col instanceof Set) {\n    return undefined;\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    var rv = [];\n    var l = col.length;\n    for (var i = 0; i < l; i++) {\n      rv.push(i);\n    }\n    return rv;\n  }\n  return goog.object.getKeys(col);\n};\ngoog.structs.contains = function(col, val) {\n  if (col.contains && typeof col.contains == \"function\") {\n    return col.contains(val);\n  }\n  if (col.containsValue && typeof col.containsValue == \"function\") {\n    return col.containsValue(val);\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return goog.array.contains(col, val);\n  }\n  return goog.object.containsValue(col, val);\n};\ngoog.structs.isEmpty = function(col) {\n  if (col.isEmpty && typeof col.isEmpty == \"function\") {\n    return col.isEmpty();\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return col.length === 0;\n  }\n  return goog.object.isEmpty(col);\n};\ngoog.structs.clear = function(col) {\n  if (col.clear && typeof col.clear == \"function\") {\n    col.clear();\n  } else if (goog.isArrayLike(col)) {\n    goog.array.clear(col);\n  } else {\n    goog.object.clear(col);\n  }\n};\ngoog.structs.forEach = function(col, f, opt_obj) {\n  if (col.forEach && typeof col.forEach == \"function\") {\n    col.forEach(f, opt_obj);\n  } else if (goog.isArrayLike(col) || typeof col === \"string\") {\n    Array.prototype.forEach.call(col, f, opt_obj);\n  } else {\n    var keys = goog.structs.getKeys(col);\n    var values = goog.structs.getValues(col);\n    var l = values.length;\n    for (var i = 0; i < l; i++) {\n      f.call(opt_obj, values[i], keys && keys[i], col);\n    }\n  }\n};\ngoog.structs.filter = function(col, f, opt_obj) {\n  if (typeof col.filter == \"function\") {\n    return col.filter(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return Array.prototype.filter.call(col, f, opt_obj);\n  }\n  var rv;\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  if (keys) {\n    rv = {};\n    for (var i = 0; i < l; i++) {\n      if (f.call(opt_obj, values[i], keys[i], col)) {\n        rv[keys[i]] = values[i];\n      }\n    }\n  } else {\n    rv = [];\n    for (var i = 0; i < l; i++) {\n      if (f.call(opt_obj, values[i], undefined, col)) {\n        rv.push(values[i]);\n      }\n    }\n  }\n  return rv;\n};\ngoog.structs.map = function(col, f, opt_obj) {\n  if (typeof col.map == \"function\") {\n    return col.map(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return Array.prototype.map.call(col, f, opt_obj);\n  }\n  var rv;\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  if (keys) {\n    rv = {};\n    for (var i = 0; i < l; i++) {\n      rv[keys[i]] = f.call(opt_obj, values[i], keys[i], col);\n    }\n  } else {\n    rv = [];\n    for (var i = 0; i < l; i++) {\n      rv[i] = f.call(opt_obj, values[i], undefined, col);\n    }\n  }\n  return rv;\n};\ngoog.structs.some = function(col, f, opt_obj) {\n  if (typeof col.some == \"function\") {\n    return col.some(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return Array.prototype.some.call(col, f, opt_obj);\n  }\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  for (var i = 0; i < l; i++) {\n    if (f.call(opt_obj, values[i], keys && keys[i], col)) {\n      return true;\n    }\n  }\n  return false;\n};\ngoog.structs.every = function(col, f, opt_obj) {\n  if (typeof col.every == \"function\") {\n    return col.every(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === \"string\") {\n    return Array.prototype.every.call(col, f, opt_obj);\n  }\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  for (var i = 0; i < l; i++) {\n    if (!f.call(opt_obj, values[i], keys && keys[i], col)) {\n      return false;\n    }\n  }\n  return true;\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Generics method for collection-like classes and objects.\n *\n *\n * This file contains functions to work with collections. It supports using\n * Map, Set, Array and Object and other classes that implement collection-like\n * methods.\n * @suppress {strictMissingProperties}\n */\n\n\ngoog.provide('goog.structs');\n\ngoog.require('goog.array');\ngoog.require('goog.object');\n\n\n// We treat an object as a dictionary if it has getKeys or it is an object that\n// isn't arrayLike.\n\n\n/**\n * Returns the number of values in the collection-like object.\n * @param {Object} col The collection-like object.\n * @return {number} The number of values in the collection-like object.\n */\ngoog.structs.getCount = function(col) {\n  'use strict';\n  if (col.getCount && typeof col.getCount == 'function') {\n    return col.getCount();\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return col.length;\n  }\n  return goog.object.getCount(col);\n};\n\n\n/**\n * Returns the values of the collection-like object.\n * @param {Object} col The collection-like object.\n * @return {!Array<?>} The values in the collection-like object.\n */\ngoog.structs.getValues = function(col) {\n  'use strict';\n  if (col.getValues && typeof col.getValues == 'function') {\n    return col.getValues();\n  }\n  // ES6 Map and Set both define a values function that returns an iterator.\n  // The typeof check allows the compiler to remove the Map and Set polyfills\n  // if they are otherwise unused throughout the entire binary.\n  if ((typeof Map !== 'undefined' && col instanceof Map) ||\n      (typeof Set !== 'undefined' && col instanceof Set)) {\n    return Array.from(col.values());\n  }\n  if (typeof col === 'string') {\n    return col.split('');\n  }\n  if (goog.isArrayLike(col)) {\n    var rv = [];\n    var l = col.length;\n    for (var i = 0; i < l; i++) {\n      rv.push(col[i]);\n    }\n    return rv;\n  }\n  return goog.object.getValues(col);\n};\n\n\n/**\n * Returns the keys of the collection. Some collections have no notion of\n * keys/indexes and this function will return undefined in those cases.\n * @param {Object} col The collection-like object.\n * @return {!Array|undefined} The keys in the collection.\n */\ngoog.structs.getKeys = function(col) {\n  'use strict';\n  if (col.getKeys && typeof col.getKeys == 'function') {\n    return col.getKeys();\n  }\n  // if we have getValues but no getKeys we know this is a key-less collection\n  if (col.getValues && typeof col.getValues == 'function') {\n    return undefined;\n  }\n  // ES6 Map and Set both define a keys function that returns an iterator. For\n  // Sets this iterates over the same values as the values iterator.\n  // The typeof check allows the compiler to remove the Map and Set polyfills\n  // if they are otherwise unused throughout the entire binary.\n  if (typeof Map !== 'undefined' && col instanceof Map) {\n    return Array.from(col.keys());\n  }\n  // Unlike the native Set, goog.structs.Set does not expose keys as the values.\n  if (typeof Set !== 'undefined' && col instanceof Set) {\n    return undefined;\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    var rv = [];\n    var l = col.length;\n    for (var i = 0; i < l; i++) {\n      rv.push(i);\n    }\n    return rv;\n  }\n\n  return goog.object.getKeys(col);\n};\n\n\n/**\n * Whether the collection contains the given value. This is O(n) and uses\n * equals (==) to test the existence.\n * @param {Object} col The collection-like object.\n * @param {*} val The value to check for.\n * @return {boolean} True if the map contains the value.\n */\ngoog.structs.contains = function(col, val) {\n  'use strict';\n  if (col.contains && typeof col.contains == 'function') {\n    return col.contains(val);\n  }\n  if (col.containsValue && typeof col.containsValue == 'function') {\n    return col.containsValue(val);\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return goog.array.contains(/** @type {!Array<?>} */ (col), val);\n  }\n  return goog.object.containsValue(col, val);\n};\n\n\n/**\n * Whether the collection is empty.\n * @param {Object} col The collection-like object.\n * @return {boolean} True if empty.\n */\ngoog.structs.isEmpty = function(col) {\n  'use strict';\n  if (col.isEmpty && typeof col.isEmpty == 'function') {\n    return col.isEmpty();\n  }\n\n  // We do not use goog.string.isEmptyOrWhitespace because here we treat the\n  // string as\n  // collection and as such even whitespace matters\n\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return /** @type {!Array<?>} */ (col).length === 0;\n  }\n  return goog.object.isEmpty(col);\n};\n\n\n/**\n * Removes all the elements from the collection.\n * @param {Object} col The collection-like object.\n * @return {void}\n */\ngoog.structs.clear = function(col) {\n  'use strict';\n  // NOTE(arv): This should not contain strings because strings are immutable\n  if (col.clear && typeof col.clear == 'function') {\n    col.clear();\n  } else if (goog.isArrayLike(col)) {\n    goog.array.clear(/** @type {IArrayLike<?>} */ (col));\n  } else {\n    goog.object.clear(col);\n  }\n};\n\n\n/**\n * Calls a function for each value in a collection. The function takes\n * three arguments; the value, the key and the collection.\n *\n * @param {S} col The collection-like object.\n * @param {function(this:T,?,?,S):?} f The function to call for every value.\n *     This function takes\n *     3 arguments (the value, the key or undefined if the collection has no\n *     notion of keys, and the collection) and the return value is irrelevant.\n * @param {T=} opt_obj The object to be used as the value of 'this'\n *     within `f`.\n * @return {void}\n * @template T,S\n * @deprecated Use a more specific method, e.g. native Array.prototype.forEach,\n *     or for-of.\n */\ngoog.structs.forEach = function(col, f, opt_obj) {\n  'use strict';\n  if (col.forEach && typeof col.forEach == 'function') {\n    col.forEach(f, opt_obj);\n  } else if (goog.isArrayLike(col) || typeof col === 'string') {\n    Array.prototype.forEach.call(/** @type {!Array<?>} */ (col), f, opt_obj);\n  } else {\n    var keys = goog.structs.getKeys(col);\n    var values = goog.structs.getValues(col);\n    var l = values.length;\n    for (var i = 0; i < l; i++) {\n      f.call(/** @type {?} */ (opt_obj), values[i], keys && keys[i], col);\n    }\n  }\n};\n\n\n/**\n * Calls a function for every value in the collection. When a call returns true,\n * adds the value to a new collection (Array is returned by default).\n *\n * @param {S} col The collection-like object.\n * @param {function(this:T,?,?,S):boolean} f The function to call for every\n *     value. This function takes\n *     3 arguments (the value, the key or undefined if the collection has no\n *     notion of keys, and the collection) and should return a Boolean. If the\n *     return value is true the value is added to the result collection. If it\n *     is false the value is not included.\n * @param {T=} opt_obj The object to be used as the value of 'this'\n *     within `f`.\n * @return {!Object|!Array<?>} A new collection where the passed values are\n *     present. If col is a key-less collection an array is returned.  If col\n *     has keys and values a plain old JS object is returned.\n * @template T,S\n */\ngoog.structs.filter = function(col, f, opt_obj) {\n  'use strict';\n  if (typeof col.filter == 'function') {\n    return col.filter(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return Array.prototype.filter.call(\n        /** @type {!Array<?>} */ (col), f, opt_obj);\n  }\n\n  var rv;\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  if (keys) {\n    rv = {};\n    for (var i = 0; i < l; i++) {\n      if (f.call(/** @type {?} */ (opt_obj), values[i], keys[i], col)) {\n        rv[keys[i]] = values[i];\n      }\n    }\n  } else {\n    // We should not use Array#filter here since we want to make sure that\n    // the index is undefined as well as make sure that col is passed to the\n    // function.\n    rv = [];\n    for (var i = 0; i < l; i++) {\n      if (f.call(opt_obj, values[i], undefined, col)) {\n        rv.push(values[i]);\n      }\n    }\n  }\n  return rv;\n};\n\n\n/**\n * Calls a function for every value in the collection and adds the result into a\n * new collection (defaults to creating a new Array).\n *\n * @param {S} col The collection-like object.\n * @param {function(this:T,?,?,S):V} f The function to call for every value.\n *     This function takes 3 arguments (the value, the key or undefined if the\n *     collection has no notion of keys, and the collection) and should return\n *     something. The result will be used as the value in the new collection.\n * @param {T=} opt_obj  The object to be used as the value of 'this'\n *     within `f`.\n * @return {!Object<V>|!Array<V>} A new collection with the new values.  If\n *     col is a key-less collection an array is returned.  If col has keys and\n *     values a plain old JS object is returned.\n * @template T,S,V\n */\ngoog.structs.map = function(col, f, opt_obj) {\n  'use strict';\n  if (typeof col.map == 'function') {\n    return col.map(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return Array.prototype.map.call(/** @type {!Array<?>} */ (col), f, opt_obj);\n  }\n\n  var rv;\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  if (keys) {\n    rv = {};\n    for (var i = 0; i < l; i++) {\n      rv[keys[i]] = f.call(/** @type {?} */ (opt_obj), values[i], keys[i], col);\n    }\n  } else {\n    // We should not use Array#map here since we want to make sure that\n    // the index is undefined as well as make sure that col is passed to the\n    // function.\n    rv = [];\n    for (var i = 0; i < l; i++) {\n      rv[i] = f.call(/** @type {?} */ (opt_obj), values[i], undefined, col);\n    }\n  }\n  return rv;\n};\n\n\n/**\n * Calls f for each value in a collection. If any call returns true this returns\n * true (without checking the rest). If all returns false this returns false.\n *\n * @param {S} col The collection-like object.\n * @param {function(this:T,?,?,S):boolean} f The function to call for every\n *     value. This function takes 3 arguments (the value, the key or undefined\n *     if the collection has no notion of keys, and the collection) and should\n *     return a boolean.\n * @param {T=} opt_obj  The object to be used as the value of 'this'\n *     within `f`.\n * @return {boolean} True if any value passes the test.\n * @template T,S\n */\ngoog.structs.some = function(col, f, opt_obj) {\n  'use strict';\n  if (typeof col.some == 'function') {\n    return col.some(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return Array.prototype.some.call(\n        /** @type {!Array<?>} */ (col), f, opt_obj);\n  }\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  for (var i = 0; i < l; i++) {\n    if (f.call(/** @type {?} */ (opt_obj), values[i], keys && keys[i], col)) {\n      return true;\n    }\n  }\n  return false;\n};\n\n\n/**\n * Calls f for each value in a collection. If all calls return true this return\n * true this returns true. If any returns false this returns false at this point\n *  and does not continue to check the remaining values.\n *\n * @param {S} col The collection-like object.\n * @param {function(this:T,?,?,S):boolean} f The function to call for every\n *     value. This function takes 3 arguments (the value, the key or\n *     undefined if the collection has no notion of keys, and the collection)\n *     and should return a boolean.\n * @param {T=} opt_obj  The object to be used as the value of 'this'\n *     within `f`.\n * @return {boolean} True if all key-value pairs pass the test.\n * @template T,S\n */\ngoog.structs.every = function(col, f, opt_obj) {\n  'use strict';\n  if (typeof col.every == 'function') {\n    return col.every(f, opt_obj);\n  }\n  if (goog.isArrayLike(col) || typeof col === 'string') {\n    return Array.prototype.every.call(\n        /** @type {!Array<?>} */ (col), f, opt_obj);\n  }\n  var keys = goog.structs.getKeys(col);\n  var values = goog.structs.getValues(col);\n  var l = values.length;\n  for (var i = 0; i < l; i++) {\n    if (!f.call(/** @type {?} */ (opt_obj), values[i], keys && keys[i], col)) {\n      return false;\n    }\n  }\n  return true;\n};\n","~:compiled-at",1669804523017,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.structs.structs.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]