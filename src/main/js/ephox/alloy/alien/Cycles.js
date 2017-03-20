define(
  'ephox.alloy.alien.Cycles',

  [

  ],

  function () {
    var cycleBy = function (value, delta, min, max) {
      var r = value + delta;
      if (r > max) return min;
      else return r < min ? max : r;
    };

    var cap = function (value, min, max) {
      if (value <= min) return min;
      else return value >= max ? max : value;
    };

    return {
      cycleBy: cycleBy,
      cap: cap
    };
  }
);