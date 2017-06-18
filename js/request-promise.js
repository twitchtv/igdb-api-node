import presage from 'presage';
import request from 'request';

/**
 * A Promise-based wrapper for `request`.
 * @arg {string} url An HTTP url.
 * @returns {Promise<Object>} An object containing the response object and response body.
 */
export default url => {
    const {
        callbackFunction,
        promise
    } = presage.promiseWithCallback();

    request(url, (error, response, body) => {
        if (error) {
            callbackFunction(error);
            return;
        }

        callbackFunction(null, {
            body,
            response
        });
    });

    return promise;
};
