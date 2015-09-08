var mockVisitorTracking = {
  getSessionCount: function() {
    return 5;
  }
};

var conditionDelegateInjector = require('inject!../sessions');
var conditionDelegate = conditionDelegateInjector({
  'dtm/visitorTracking': mockVisitorTracking,
  'dtm/compareNumbers': require('../../../resources/compareNumbers/compareNumbers')()
});

function getConfig(count, operator) {
  return {
    conditionConfig: {
      count: count,
      operator: operator
    }
  };
}

describe('sessions condition delegate', function() {
  it('returns true when number of sessions is above "greater than" constraint', function() {
    var config = getConfig(4, '>');
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when number of sessions is below "greater than" constraint', function() {
    var config = getConfig(6, '>');
    expect(conditionDelegate(config)).toBe(false);
  });

  it('returns true when number of sessions is below "less than" constraint', function() {
    var config = getConfig(6, '<');
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when number of sessions is above "less than" constraint', function() {
    var config = getConfig(4, '<');
    expect(conditionDelegate(config)).toBe(false);
  });

  it('returns true when number of sessions matches "equals" constraint', function() {
    var config = getConfig(5, '=');
    expect(conditionDelegate(config)).toBe(true);
  });

  it('returns false when number of sessions does not match "equals" constraint', function() {
    var config = getConfig(11, '=');
    expect(conditionDelegate(config)).toBe(false);
  });
});