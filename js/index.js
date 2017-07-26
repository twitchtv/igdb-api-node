/* eslint no-process-env: 0, no-console: 0 */
import config from '../configuration';
import endpoints from './endpoints';
import getImage from './get-image';
import parseEndpoint from './parse-endpoint';
import performRequest from './perform-request';

/**
 * Creates the IGDB API object, populated with methods for all defined endpoints.
 * @arg {string} [apiKey]
 * @returns {Object}
 */
export default apiKey => endpoints.reduce((endpointObj, endpoint) => {
    if (!apiKey) {
        apiKey = process.env[config.api.globalProperty] || global[config.api.globalProperty] || '';
    }

    endpointObj[endpoint] = parseEndpoint(endpoint, apiKey);
    return endpointObj;
}, {
    image: getImage,
    /**
     * Performs a client request on an arbitrary URL. Intended for use with scrolling paginated results.
     * @arg {string} url
     * @returns {Promise<Object>}
     * @deprecated since version 3.1.0
     */
    scroll: url => {
        console.log('The client.scroll function is deprecated and will be removed in v4.0.0');
        return performRequest(url, apiKey);
    }
});

export {
    config
};
