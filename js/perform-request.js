/* eslint no-process-env: 0 */
import request from './request-promise';

/**
 * Sends a HTTP request to the provided URL.
 * @arg {string} url
 * @arg {object} [apiService] The API service object containing endpoint details and key
 * @returns {Promise<Object>} The parsed HTTP response
 * @example
 * performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').then(console.log)
 */
export default (url, apiService) => {
    const options = {
        headers: {
            Accept: 'application/json'
        },
        url
    };

    /*
    If no API key is provided to the function, look for the key in the
    process or global scope. The property to inspect is set in
    configuration.js as `globalProperty`.
    */
    options.headers[apiService.keyHeader] = apiService.key;

    // Send the request to the API
    return request(options).then(result => new Promise((resolve, reject) => {
        if (result.response.statusCode !== 200) {
            reject(new Error(`HTTP Status ${result.response.statusCode} - ${options.url}`));
            return;
        }

        try {
            /*
            Always wrap any logic containing JSON.parse() in a
            try-catch block just in case the string is malformed
            and it throws an Error.
            */
            resolve({
                body: JSON.parse(result.body),
                headers: result.response.headers,
                scrollCount: result.response.headers['x-count'] || result.response.headers['X-Count'],
                scrollUrl: result.response.headers['x-next-page'] || result.response.headers['X-Next-Page'],
                url: options.url
            });
        } catch (error) {
            // JSON.parse() error
            reject(error);
        }
    }));
};
