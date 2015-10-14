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

var adoptedTenancies = require('./adoptedTenancyList');

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

            _getTenantConfigs(restContext, adoptedTenancies, function(err, configs) {
                if (err) {
                    return console.error(JSON.stringify(err));
                }

                console.log(JSON.stringify(_ordered(configs)));
            });
        });
    });
});

function _getTenantConfigs(restContext, aliases, callback, _configs) {
    if (_.isEmpty(aliases)) {
        return callback(null, _configs);
    }

    var alias = aliases.shift();
    console.log('getting config for: %s', alias);
    RestAPI.Config.getTenantConfig(restContext, alias, function(err, config) {
        if (err) {
            return callback(err);
        }

        _configs = _.extend({}, _configs, _.object([[alias, config]]));
        return _getTenantConfigs(restContext, aliases, callback, _configs);
    });
}

function _ordered(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return obj;
    }

    return _.chain(obj)
        .keys()
        .sort()
        .map(function(key) {
            return [key, _ordered(obj[key])];
        })
        .object()
        .value();
}
