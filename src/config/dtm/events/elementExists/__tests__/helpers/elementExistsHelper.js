function assertElementExistsConditionCall(options) {
  expect(options.call.object).toBe(options.relatedElement);
  expect(options.call.args[0].type).toBe('elementexists');
  expect(options.call.args[0].target).toBe(options.target);
  expect(options.call.args[1]).toBe(options.target);
}