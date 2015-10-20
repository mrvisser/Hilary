/*!
 * Copyright 2015 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var _ = require('underscore');

var unadoptedTenancies = require('./unadoptedTenancyList');

var simpleKeysToClear = [
    "oae-tenants/block_1/bgColor",
    "oae-tenants/block_1/horizontalAlign",
    "oae-tenants/block_1/icon",
    "oae-tenants/block_1/imgUrl",
    "oae-tenants/block_1/lg",
    "oae-tenants/block_1/md",
    "oae-tenants/block_1/minHeight",
    "oae-tenants/block_1/sm",
    "oae-tenants/block_1/textColor",
    "oae-tenants/block_1/titleColor",
    "oae-tenants/block_1/type",
    "oae-tenants/block_1/verticalAlign",
    "oae-tenants/block_1/videoPlaceholder",
    "oae-tenants/block_1/videoUrl",
    "oae-tenants/block_1/xs",
    "oae-tenants/block_10/bgColor",
    "oae-tenants/block_10/horizontalAlign",
    "oae-tenants/block_10/icon",
    "oae-tenants/block_10/imgUrl",
    "oae-tenants/block_10/lg",
    "oae-tenants/block_10/md",
    "oae-tenants/block_10/minHeight",
    "oae-tenants/block_10/sm",
    "oae-tenants/block_10/textColor",
    "oae-tenants/block_10/titleColor",
    "oae-tenants/block_10/type",
    "oae-tenants/block_10/verticalAlign",
    "oae-tenants/block_10/videoPlaceholder",
    "oae-tenants/block_10/videoUrl",
    "oae-tenants/block_10/xs",
    "oae-tenants/block_11/bgColor",
    "oae-tenants/block_11/horizontalAlign",
    "oae-tenants/block_11/icon",
    "oae-tenants/block_11/imgUrl",
    "oae-tenants/block_11/lg",
    "oae-tenants/block_11/md",
    "oae-tenants/block_11/minHeight",
    "oae-tenants/block_11/sm",
    "oae-tenants/block_11/textColor",
    "oae-tenants/block_11/titleColor",
    "oae-tenants/block_11/type",
    "oae-tenants/block_11/verticalAlign",
    "oae-tenants/block_11/videoPlaceholder",
    "oae-tenants/block_11/videoUrl",
    "oae-tenants/block_11/xs",
    "oae-tenants/block_12/bgColor",
    "oae-tenants/block_12/horizontalAlign",
    "oae-tenants/block_12/icon",
    "oae-tenants/block_12/imgUrl",
    "oae-tenants/block_12/lg",
    "oae-tenants/block_12/md",
    "oae-tenants/block_12/minHeight",
    "oae-tenants/block_12/sm",
    "oae-tenants/block_12/textColor",
    "oae-tenants/block_12/titleColor",
    "oae-tenants/block_12/type",
    "oae-tenants/block_12/verticalAlign",
    "oae-tenants/block_12/videoPlaceholder",
    "oae-tenants/block_12/videoUrl",
    "oae-tenants/block_12/xs",
    "oae-tenants/block_2/bgColor",
    "oae-tenants/block_2/horizontalAlign",
    "oae-tenants/block_2/icon",
    "oae-tenants/block_2/imgUrl",
    "oae-tenants/block_2/lg",
    "oae-tenants/block_2/md",
    "oae-tenants/block_2/minHeight",
    "oae-tenants/block_2/sm",
    "oae-tenants/block_2/textColor",
    "oae-tenants/block_2/titleColor",
    "oae-tenants/block_2/type",
    "oae-tenants/block_2/verticalAlign",
    "oae-tenants/block_2/videoPlaceholder",
    "oae-tenants/block_2/videoUrl",
    "oae-tenants/block_2/xs",
    "oae-tenants/block_3/bgColor",
    "oae-tenants/block_3/horizontalAlign",
    "oae-tenants/block_3/icon",
    "oae-tenants/block_3/imgUrl",
    "oae-tenants/block_3/lg",
    "oae-tenants/block_3/md",
    "oae-tenants/block_3/minHeight",
    "oae-tenants/block_3/sm",
    "oae-tenants/block_3/textColor",
    "oae-tenants/block_3/titleColor",
    "oae-tenants/block_3/type",
    "oae-tenants/block_3/verticalAlign",
    "oae-tenants/block_3/videoPlaceholder",
    "oae-tenants/block_3/videoUrl",
    "oae-tenants/block_3/xs",
    "oae-tenants/block_4/bgColor",
    "oae-tenants/block_4/horizontalAlign",
    "oae-tenants/block_4/icon",
    "oae-tenants/block_4/imgUrl",
    "oae-tenants/block_4/lg",
    "oae-tenants/block_4/md",
    "oae-tenants/block_4/minHeight",
    "oae-tenants/block_4/sm",
    "oae-tenants/block_4/textColor",
    "oae-tenants/block_4/titleColor",
    "oae-tenants/block_4/type",
    "oae-tenants/block_4/verticalAlign",
    "oae-tenants/block_4/videoPlaceholder",
    "oae-tenants/block_4/videoUrl",
    "oae-tenants/block_4/xs",
    "oae-tenants/block_5/bgColor",
    "oae-tenants/block_5/horizontalAlign",
    "oae-tenants/block_5/icon",
    "oae-tenants/block_5/imgUrl",
    "oae-tenants/block_5/lg",
    "oae-tenants/block_5/md",
    "oae-tenants/block_5/minHeight",
    "oae-tenants/block_5/sm",
    "oae-tenants/block_5/textColor",
    "oae-tenants/block_5/titleColor",
    "oae-tenants/block_5/type",
    "oae-tenants/block_5/verticalAlign",
    "oae-tenants/block_5/videoPlaceholder",
    "oae-tenants/block_5/videoUrl",
    "oae-tenants/block_5/xs",
    "oae-tenants/block_6/bgColor",
    "oae-tenants/block_6/horizontalAlign",
    "oae-tenants/block_6/icon",
    "oae-tenants/block_6/imgUrl",
    "oae-tenants/block_6/lg",
    "oae-tenants/block_6/md",
    "oae-tenants/block_6/minHeight",
    "oae-tenants/block_6/sm",
    "oae-tenants/block_6/textColor",
    "oae-tenants/block_6/titleColor",
    "oae-tenants/block_6/type",
    "oae-tenants/block_6/verticalAlign",
    "oae-tenants/block_6/videoPlaceholder",
    "oae-tenants/block_6/videoUrl",
    "oae-tenants/block_6/xs",
    "oae-tenants/block_7/bgColor",
    "oae-tenants/block_7/horizontalAlign",
    "oae-tenants/block_7/icon",
    "oae-tenants/block_7/imgUrl",
    "oae-tenants/block_7/lg",
    "oae-tenants/block_7/md",
    "oae-tenants/block_7/minHeight",
    "oae-tenants/block_7/sm",
    "oae-tenants/block_7/textColor",
    "oae-tenants/block_7/titleColor",
    "oae-tenants/block_7/type",
    "oae-tenants/block_7/verticalAlign",
    "oae-tenants/block_7/videoPlaceholder",
    "oae-tenants/block_7/videoUrl",
    "oae-tenants/block_7/xs",
    "oae-tenants/block_8/bgColor",
    "oae-tenants/block_8/horizontalAlign",
    "oae-tenants/block_8/icon",
    "oae-tenants/block_8/imgUrl",
    "oae-tenants/block_8/lg",
    "oae-tenants/block_8/md",
    "oae-tenants/block_8/minHeight",
    "oae-tenants/block_8/sm",
    "oae-tenants/block_8/textColor",
    "oae-tenants/block_8/titleColor",
    "oae-tenants/block_8/type",
    "oae-tenants/block_8/verticalAlign",
    "oae-tenants/block_8/videoPlaceholder",
    "oae-tenants/block_8/videoUrl",
    "oae-tenants/block_8/xs",
    "oae-tenants/block_9/bgColor",
    "oae-tenants/block_9/horizontalAlign",
    "oae-tenants/block_9/icon",
    "oae-tenants/block_9/imgUrl",
    "oae-tenants/block_9/lg",
    "oae-tenants/block_9/md",
    "oae-tenants/block_9/minHeight",
    "oae-tenants/block_9/sm",
    "oae-tenants/block_9/textColor",
    "oae-tenants/block_9/titleColor",
    "oae-tenants/block_9/type",
    "oae-tenants/block_9/verticalAlign",
    "oae-tenants/block_9/videoPlaceholder",
    "oae-tenants/block_9/videoUrl",
    "oae-tenants/block_9/xs"
];

var textKeysToClear = [
  "oae-tenants/block_1/text",
  "oae-tenants/block_2/text",
  "oae-tenants/block_3/text",
  "oae-tenants/block_4/text",
  "oae-tenants/block_5/text",
  "oae-tenants/block_6/text",
  "oae-tenants/block_7/text",
  "oae-tenants/block_8/text",
  "oae-tenants/block_9/text",
  "oae-tenants/block_10/text",
  "oae-tenants/block_11/text",
  "oae-tenants/block_12/text",
];

var clearDataSimple = {'configFields': simpleKeysToClear};
var clearDataText = {'configFields': textKeysToClear};

console.log('var clearDataSimple = %s;', JSON.stringify(clearDataSimple, null, 2));
console.log('var clearDataText = %s;', JSON.stringify(clearDataText, null, 2));
console.log('var tenantsToUpdate = %s;', JSON.stringify(unadoptedTenancies, null, 2));

console.log(function _clearTenantConfig(tenantAlias, data, callback) {
    $.ajax({
        'type': 'POST',
        'url': '/api/config/' + tenantAlias + '/clear',
        'data': data,
        'error': function(jqXhr, textStatus) {
            console.log('error: %s / %s', tenantAlias, textStatus);
            return callback(true);
        },
        'success': function() {
            return callback();
        }
    });
}.toString());

console.log(function _clearTenantConfigs() {
    if (tenantsToUpdate.length === 0) {
        return;
    }

    var tenantAlias = tenantsToUpdate.shift();
    console.log('clearing: %s', tenantAlias);
    _clearTenantConfig(tenantAlias, clearDataSimple, function(err) {
        if (err) {
            return _clearTenantConfigs();
        }

        _clearTenantConfig(tenantAlias, clearDataText, function() {
            return _clearTenantConfigs();
        });
    });
}.toString());

console.log('_clearTenantConfigs();');
