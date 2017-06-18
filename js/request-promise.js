import presage from 'presage';
import request from 'request';

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
