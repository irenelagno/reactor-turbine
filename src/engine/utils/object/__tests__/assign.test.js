var assign = require('../assign');

var target = {a: 'apple', b: 'banana', c: 'cucumber'};

describe('assigns', function() {
  it('returns new property list for own properties', function() {

    function Apple() {
      this.color = 'green';
    }

    Apple.prototype = {a: 'honeycrisp'};

    var apple = new Apple();
    var res = assign(target, apple);

    expect(res.color).toEqual('green');
    expect(res.a).toEqual('apple');
  });

  it('returns an object reference to the target', function() {
    var res = assign(target, {e: 'eclair'});
    expect(res).toBe(target);
  });

  it('returns all values from all lists', function() {
    var other = {someFruit: 'nachos'};
    var res = assign(target, {e: 'elderberry'}, other);
    expect(res.a).toEqual('apple');
    expect(res.b).toEqual('banana');
    expect(res.c).toEqual('cucumber');
    expect(res.e).toEqual('elderberry');
    expect(res.someFruit).toEqual('nachos');
  });

  it('value of last property overrides previous.', function() {
    var res = assign(target, {a: 'apricot'}, {d: 'date'}, {a: 'avocado'});
    expect(res.a).toEqual('avocado');
  });

});
