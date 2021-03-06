getJasmineRequireObj().MapContaining = function(j$) {
  function MapContaining(sample) {
    if (!j$.isMap(sample)) {
      throw new Error('You must provide a map to `mapContaining`, not ' + j$.pp(sample));
    }

    this.sample = sample;
  }

  MapContaining.prototype.asymmetricMatch = function(other, customTesters) {
    if (!j$.isMap(other)) return false;

    var hasAllMatches = true;
    j$.util.forEachBreakable(this.sample, function(breakLoop, value, key) {
      // for each key/value pair in `sample`
      // there should be at least one pair in `other` whose key and value both match
      var hasMatch = false;
      j$.util.forEachBreakable(other, function(oBreakLoop, oValue, oKey) {
        if (
          j$.matchersUtil.equals(oKey, key, customTesters)
          && j$.matchersUtil.equals(oValue, value, customTesters)
        ) {
          hasMatch = true;
          oBreakLoop();
        }
      });
      if (!hasMatch) {
        hasAllMatches = false;
        breakLoop();
      }
    });

    return hasAllMatches;
  };

  MapContaining.prototype.jasmineToString = function() {
    return '<jasmine.mapContaining(' + j$.pp(this.sample) + ')>';
  };

  return MapContaining;
};
