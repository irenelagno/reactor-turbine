/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var delegateType = require('../enum/delegateType');

module.exports = function (
  executeDelegateModule,
  isConditionMet,
  logConditionNotMet,
  logConditionError
) {
  return function (rule, syntheticEvent) {
    var condition;

    if (rule.conditions) {
      for (var i = 0; i < rule.conditions.length; i++) {
        condition = rule.conditions[i];

        try {
          var result = executeDelegateModule(
            condition,
            delegateType.CONDITIONS,
            syntheticEvent,
            [syntheticEvent]
          );

          if (!isConditionMet(condition, result)) {
            logConditionNotMet(condition, rule);
            return false;
          }
        } catch (e) {
          logConditionError(condition, rule, e);
          return false;
        }
      }
    }

    return true;
  };
};
