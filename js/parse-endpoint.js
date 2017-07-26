import requestEndpoint from './request-endpoint';

/**
 * Transforms an endpoint name into a Function that performs a request to that endpoint.
 * @arg {string} endpoint The endpoint name
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
    const endpointFunction = (options, fields) => requestEndpoint(endpoint, options, fields, apiService);

    return endpointFunction;
};
