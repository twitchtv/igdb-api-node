import requestEndpoint from './request-endpoint';

/**
 * Transforms a private endpoint name into a Function that performs a request to that private endpoint.
 * @arg {string} endpoint The private endpoint name
 * @arg {object} [apiService] The API service object from config
 * @returns {Function} The returned function
 */
export default (endpoint, apiService) => {
    /**
     * A function that performs a request against the given endpoint.
     * @arg {Object} options An object containing URL query parameters and values
     * @arg {Array} [fields]
     * @returns {Promise<Object>}
     */
    const endpointFunction = (options, fields) => requestEndpoint(options.endpoint ?
        'private' :
        'me', options, fields, apiService);

    return endpointFunction;
};
