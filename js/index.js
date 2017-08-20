/* eslint no-process-env: 0 */
import config from '../configuration';
import endpoints from './endpoints';
import getImage from './get-image';
import getScrollAll from './scroll-all';
import parseEndpoint from './parse-endpoint';
import performRequest from './perform-request';

/**
 * Creates the IGDB API object, populated with methods for all defined endpoints.
 * @arg {string} [apiKey]
 * @returns {Object}
 */
export default apiKey => {
    let apiService = config.mashape;

    if (apiKey) {
        switch (apiKey.length) {
            case 32:
                apiService = config.threeScale;
                break;
            default:
                apiService = config.mashape;
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
        scroll: url => performRequest(url, apiService),
        scrollAll: (url, options) => getScrollAll(url, options, apiService, performRequest)
    });
};

export {
    config
};
