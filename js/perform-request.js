/* eslint no-process-env: 0 */
import config from '../configuration'
import request from 'request'

/**
 * Sends a HTTP request to the provided URL.
 * @arg {string} url
 * @arg {string} [apiKey] The API key that permits access to the URL
 * @returns {Promise<Object>} The parsed HTTP response
 * @example
 * performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').then(console.log)
 */
export default (url, apiKey) => new Promise((resolve, reject) => {
    const options = {
        headers: {
            Accept: 'application/json'
        },
        url
    }

    /*
    Expects the key header property to be set in configuration.js.
    If it's not set, default to 'X-Mashape-Key'
    */
    if (!config.api.keyHeader) {
        config.api.keyHeader = 'X-Mashape-Key'
    }

    /*
    If no API key is provided to the function, look for the key in the
    process or global scope. The property to inspect is set in
    configuration.js as `globalProperty`.
    */
    options.headers[config.api.keyHeader] = apiKey

    // Send the request to the API
    request(options, (error, response, body) => {
        if (!error) {
            /*
            Even if there is no error from the request itself, there
            might still be an HTTP error in the response.
            */
            error = response.statusCode === 200 ?
                null :
                new Error(`HTTP Status ${response.statusCode} - ${options.url}`)
        }

        if (error) {
            reject(error)
            return
        }

        try {
            /*
            Always wrap any logic containing JSON.parse() in a
            try-catch block just in case the string is malformed
            and it throws an Error.
            */
            resolve({
                body: JSON.parse(body),
                headers: response.headers,
                scrollCount: response.headers['X-Count'],
                scrollUrl: response.headers['X-Next-Page'],
                url: options.url
            })
        } catch (error) {
            // JSON.parse() error
            reject(error)
        }
    })
})
