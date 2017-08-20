/**
 * Retrieves all pages or a limited set and returns a single concatinated object.
 * @arg {String} url A query url
 * @arg {Object} options a selection of options.
 * @arg {Object} apiService The API service object containing endpoint details and key
 * @arg {Function} request The perform-request function
 * @returns {Object} Concatinated results
 */
export default (url, options, apiService, request) => new Promise((accept, reject) => {
    if (!url) {
        reject(new Error('No url provided for scrollAll'));
    }

    options = Object.assign({}, {
        interval: 200
    }, options);

    let pagesToGet = 0,
        maxPages = 0,
        results = [];
    const getNextPage = (xNextPage, first) => {
        request(xNextPage, apiService)
            .then(response => {
                if (response.body && !response.body.length) {
                    return accept([]);
                }

                if (first) {
                    if (response.headers['x-count']) {
                        try {
                            const xCount = parseInt(response.headers['x-count'], 10);

                            if (response.body.length >= xCount) {
                                return accept(response.body);
                            }
                            maxPages = Math.round(xCount / response.body.length);
                            if (options.pageLimit && options.pageLimit < maxPages) {
                                maxPages = options.pageLimit;
                            }
                        } catch (err) {
                            reject(new Error('X-Count header is not a number'));
                        }
                    } else {
                        reject(new Error('X-Count header is not present.'));
                    }
                }
                results = results.concat(response.body);
                pagesToGet += 1;
                if (maxPages > pagesToGet) {
                    setTimeout(() => getNextPage(response.headers['x-next-page']), options.interval);
                } else {
                    accept(results);
                }
            }).catch(reject);
    };

    getNextPage(`${apiService.url}${url}`, true);
});
