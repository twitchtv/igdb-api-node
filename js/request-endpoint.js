import performRequest from './perform-request';

/**
 * Composes and sends an API request URL based on provided fields and options.
 * @arg {string} endpoint
 * @arg {Object} [options]
 * @arg {Array} [fields]
 * @arg {object} [apiService]
 * @returns {Promise<Object>}
 * @example
 * requestEndpoint('example', { fields: '*', limit: 10 }, ['id', 'name'], 'example-api-key-123').then(console.log)
 */
export default (endpoint, options, fields, apiService) => {
    if (!endpoint) {
        return Promise.reject(new Error('No API endpoint provided'));
    }

    let url = `${apiService.url}/${endpoint}/`;

    if (options) {
        if (options.limit && options.limit > 50) {
            url = `${apiService.url}/pro/${endpoint}/`;
        }
        url = Object.keys(options).reduce((url, parameter) => {
            const parameterValue = options[parameter];

            switch (parameter) {
                case 'filters':
                    url.options.push(...Object.keys(parameterValue).reduce((optionUrls, filter) => {
                        const splitFilter = filter.split('-').join('][');

                        optionUrls.push(`filter[${splitFilter}]=${parameterValue[filter]}`);
                        return optionUrls;
                    }, []));
                    break;

                case 'ids':
                    url.baseUrl += parameterValue.join(',');
                    break;

                case 'expand':
                    url.options.push(`expand=${parameterValue.join(',')}`);
                    break;

                case 'endpoint': {
                    url.baseUrl += `${parameterValue}/`;
                    break;
                }

                case 'token': {
                    apiService.token = parameterValue;
                    break;
                }

                default:
                    url.options.push(`${parameter}=${parameterValue}`);
            }

            return url;
        }, {
            baseUrl: url,
            options: []
        });

        if (fields) {
            url.options.push(`fields=${fields.join(',')}`);
        }

        if (url.options.length) {
            url = `${url.baseUrl}?${url.options.join('&')}`;
        } else {
            url = url.baseUrl;
        }
    }

    return performRequest(url, apiService);
};
