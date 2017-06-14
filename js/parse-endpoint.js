import requestEndpoint from './request-endpoint';

/**
 * Transforms an endpoint name into a Function that performs a request to that endpoint.
 * @arg {string} endpoint The endpoint name
 * @arg {string} [apiKey] The API key
 * @returns {Function} The returned function
 */
export default (endpoint, apiKey) => {
    /**
     * A function that performs a request against the given endpoint.
     * @arg {Object} options An object containing URL query parameters and values
     * @arg {Array} [fields]
     * @returns {Promise<Object>}
     */
    const endpointFunction = (options, fields) => requestEndpoint(endpoint, options, fields, apiKey);

    return endpointFunction;
};
