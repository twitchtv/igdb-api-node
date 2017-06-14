/* eslint no-process-env: 0 */
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
    scroll: url => performRequest(url, apiKey)
});

export {
    config
};
