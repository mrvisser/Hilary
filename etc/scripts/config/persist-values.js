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
var read = require('read');

var RestAPI = require('oae-rest');
var RestContext = require('oae-rest/lib/model').RestContext;
var RestUtil = require('oae-rest/lib/util');

var adoptedTenantAliases = require('./adoptedTenancyList');

var configKeysToPersist = [
    'oae-authentication/local/enabled',
    'oae-authentication/local/allowAccountCreation',
    'oae-tenants/block_2/lg',
    'oae-tenants/block_2/md',
    'oae-tenants/block_2/minHeight',
    'oae-tenants/block_2/text/default',
    'oae-tenants/block_2/textColor',
    'oae-tenants/block_2/titleColor',
    'oae-tenants/block_2/type',
    'oae-tenants/block_2/videoPlaceholder',
    'oae-tenants/block_2/videoUrl',
    'oae-tenants/block_3/imgUrl',
    'oae-tenants/block_3/lg',
    'oae-tenants/block_3/md',
    'oae-tenants/block_3/sm',
    'oae-tenants/block_3/text/default',
    'oae-tenants/block_3/textColor',
    'oae-tenants/block_3/titleColor',
    'oae-tenants/block_3/type',
    'oae-tenants/block_4/bgColor',
    'oae-tenants/block_4/icon',
    'oae-tenants/block_4/text/default',
    'oae-tenants/block_4/textColor',
    'oae-tenants/block_4/titleColor',
    'oae-tenants/block_5/bgColor',
    'oae-tenants/block_5/icon',
    'oae-tenants/block_5/lg',
    'oae-tenants/block_5/md',
    'oae-tenants/block_5/sm',
    'oae-tenants/block_5/text/default',
    'oae-tenants/block_5/textColor',
    'oae-tenants/block_5/titleColor',
    'oae-tenants/block_6/bgColor',
    'oae-tenants/block_6/icon',
    'oae-tenants/block_6/lg',
    'oae-tenants/block_6/md',
    'oae-tenants/block_6/sm',
    'oae-tenants/block_6/text/default',
    'oae-tenants/block_6/textColor',
    'oae-tenants/block_6/titleColor',
    'oae-tenants/block_6/type'
];

// Swallow errors, we handle them in the API calls
RestUtil.on('error', function(err) {});

read({'prompt': 'Base URL:'}, function(err, baseUrl) {
    if (err) {
        return console.error(err);
    }

    read({'prompt': 'Password:', 'silent': true}, function(err, password) {
        if (err) {
            return console.error(err);
        }

        var restContext = new RestContext(baseUrl, {'strictSSL': false});
        RestAPI.Authentication.login(restContext, 'administrator', password, function(err) {
            if (err) {
                return console.error(JSON.stringify(err));
            }

            _getConfigUpdatesByTenantAlias(restContext, adoptedTenantAliases, function(err, updates) {
                if (err) {
                    return console.error(JSON.stringify(err));
                }
            });
        });
    });
});

function _getConfigUpdatesByTenantAlias(restContext, adoptedTenantAliases, callback) {
    adoptedTenantAliases = adoptedTenantAliases.slice();
    if (_.isEmpty(adoptedTenantAliases)) {
        return callback();
    }

    var tenantAlias = adoptedTenantAliases.shift();
    RestAPI.Config.getTenantConfig(restContext, tenantAlias, function(err, config) {
        if (err) {
            return callback(err);
        }

        var updates = _.chain(configKeysToPersist)
            .map(function(configKey) {
                return [configKey, _getValueWithKey(config, configKey)];
            })
            .object()
            .value();

        console.log('$.post("/api/config/%s", %s);', tenantAlias, JSON.stringify(updates, null, 2));

        return _getConfigUpdatesByTenantAlias(restContext, adoptedTenantAliases, callback);
    });
};

function _getValueWithKey(config, configKey) {
    var value = config;
    _.each(configKey.split('/'), function(part) {
        value = value[part];
    });
    return value;
}
