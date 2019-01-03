import apicalypse from 'apicalypse';
import getTagNumber from './tag-number';

/**
 * Creates the IGDB API object, populated with methods for building a query.
 * @arg {string} [apiKey]
 * @returns {Object}
 */
export default (apiKey, opts = {}) => {
    const key = apiKey || process.env.IGDB_API_KEY || global.IGDB_API_KEY;
    const defaultOptions = {
        method: 'POST',
        baseURL: 'https://api-v3.igdb.com',
        headers: {
          'user-key': key,
          accept: 'application/json',
        },
        responseType: 'json'
    };

    return apicalypse({
        ...defaultOptions,
        ...opts
    });
};

export {
    getTagNumber
}