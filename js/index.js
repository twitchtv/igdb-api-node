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
export default apiKey => {
    const apiService = config.threeScale;

    apiService.key = apiKey || process.env.IGDB_API_KEY || process.env['3scaleKey'] || process.env.mashapeKey || global.IGDB_API_KEY || global['3scaleKey'] || global.mashapeKey;

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
