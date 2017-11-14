/* eslint no-process-env: 0 */
import config from '../configuration';
import endpoints from './endpoints';
import getImage from './get-image';
import getScrollAll from './scroll-all';
import getTagNumber from './tag-number';
import parseEndpoint from './parse-endpoint';
import performRequest from './perform-request';

/**
 * Creates the IGDB API object, populated with methods for all defined endpoints.
 * @arg {string} [apiKey]
 * @arg {bool} [staging]
 * @returns {Object}
 */
export default (apiKey, staging) => {
    let apiService = config.mashape;

    if (apiKey) {
        apiService = config.mashape;

        if (apiKey.length === 32) {
            if (staging) {
                apiService = config.threeScaleStaging;
            } else {
                apiService = config.threeScale;
            }
        }
        apiService.key = apiKey;
    } else {
        Object.keys(config).forEach(api => {
            api = config[api];
            apiKey = process.env[api.globalProperty] || global[api.globalProperty] || '';
            if (apiKey) {
                apiService = api;
                apiService.key = apiKey;
            }
        });
    }

    return endpoints.reduce((endpointObj, endpoint) => {
        endpointObj[endpoint] = parseEndpoint(endpoint, apiService);
        return endpointObj;
    }, {
        image: getImage,
        tagNumber: getTagNumber,
        scroll: url => performRequest(`${apiService.url}${url}`, apiService),
        scrollAll: (url, options) => getScrollAll(url, options, apiService, performRequest)
    });
};

export {
    config
};
