import config from '../configuration';
import request from './request-promise';

/**
 * Sends a HTTP request to the provided URL.
 * @arg {string} url
 * @arg {string} [apiKey] The API key that permits access to the URL
 * @returns {Promise<Object>} The parsed HTTP response
 * @example
 * performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').then(console.log)
 */
const performRequest = (url, apiKey) => {
    const options = {
        headers: {
            Accept: 'application/json'
        },
        url
    };

    /*
    Expects the key header property to be set in configuration.js.
    If it's not set, default to 'X-Mashape-Key'
    */
    if (!config.api.keyHeader) {
        config.api.keyHeader = 'X-Mashape-Key';
    }

    /*
    If no API key is provided to the function, look for the key in the
    process or global scope. The property to inspect is set in
    configuration.js as `globalProperty`.
    */
    options.headers[config.api.keyHeader] = apiKey;

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
            const {
                body,
                response
            } = result,
                responseObj = {
                    body: JSON.parse(body),
                    headers: response.headers,
                    scrollCount: response.headers['x-count'] || response.headers['X-Count'],
                    scrollUrl: response.headers['x-next-page'] || response.headers['X-Next-Page'],
                    url: options.url
                };

            // Add a scroll method to the response object if applicable.
            if (responseObj.scrollUrl) {
                responseObj.scroll = () => performRequest(responseObj.scrollUrl, apiKey);
            }

            resolve(responseObj);
        } catch (error) {
            // JSON.parse() error
            reject(error);
        }
    }));
};

export default performRequest;
