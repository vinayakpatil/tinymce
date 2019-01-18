import { Arr } from '@ephox/katamari';

/**
 * Search the parents of both items for a common element
 */
var common = function (universe, item1, item2) {
  var item1parents = [item1].concat(universe.up().all(item1));
  var item2parents = [item2].concat(universe.up().all(item2));

  return Arr.find(item1parents, function (x) {
    return Arr.exists(item2parents, function (y) {
      return universe.eq(y, x);
    });
  });
};

export default {
  common: common
};