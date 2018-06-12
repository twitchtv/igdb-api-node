import {
    addScrollParameter
} from './utilities';

const promiseWhile = (condition, execute) => new Promise((resolve, reject) => {
    const iterate = () => {
        if (condition()) {
            return execute()
                .then(iterate)
                .catch(reject);
        }
        return resolve();
    };

    return iterate();
});

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

    // Ensure url has scroll=1
    const newUrl = addScrollParameter(url);

    options = Object.assign({}, {
        interval: 500
    }, options);

    let results = [],
        xNextPage,
        xCount,
        maxPages = 2,
        currentPage = 1,
        first = true;

    promiseWhile(
        () => {
            if (!first) {
                // If there is only one page of results.
                if (results.length >= xCount) {
                    return false;
                }

                // If all pages have been retrieved
                if (maxPages <= currentPage) {
                    return false;
                }

                currentPage += 1;
            }
            return true;
        },
        () => new Promise((accept2, reject2) => {
            request(`${apiService.url}${xNextPage || newUrl}`, apiService)
                .then(response => {
                    if (first) {
                        first = false;
                        xNextPage = response.headers['x-next-page']; // Now only query the cursor url;
                        xCount = parseInt(response.headers['x-count'], 10); // Set the total results
                        maxPages = Math.round(xCount / response.body.length); // Convert total results to total pages

                        // If the user wants only a limited number of pages, override the max pages.
                        if (options.pageLimit && options.pageLimit < maxPages) {
                            maxPages = options.pageLimit;
                        }
                    }

                    // If there's only one page of results or some other error
                    if (response.body && !response.body.length) {
                        first = false;
                        maxPages = currentPage;
                        accept2();
                        return;
                    }

                    results = results.concat(response.body);
                    setTimeout(() => accept2(), options.interval);
                }).catch(reject2);
        }),
    ).then(() => {
        accept(results);
    }).catch(reject);
});
