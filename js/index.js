import apicalypse from 'apicalypse';
import merge from 'deepmerge';
import isPlainObject from 'is-plain-object';
import getTagNumber from './tag-number';
import { version } from '../package.json';
import assert from 'assert';

/**
 * Creates the IGDB API object, populated with methods for building a query.
 * @arg {string} [clientID]
 * @arg {string} [appAccessToken]
 * @arg {Object} [options] Apicalypse Options
 * @returns {Object}
 */
export default (clientID, appAccessToken, opts = {}) => {
  const id = clientID || process.env.TWITCH_CLIENT_ID || global.TWITCH_CLIENT_ID;
  const token = appAccessToken || process.env.TWITCH_APP_ACCESS_TOKEN || global.TWITCH_APP_ACCESS_TOKEN;
  assert(id, "ClientID must be provided, either as an argument or through env TWITCH_CLIENT_ID");
  assert(token, "AppAccessToken must be provided, either as an argument or through env TWITCH_APP_ACCESS_TOKEN");

  const defaultOptions = {
    method: 'POST',
    baseURL: 'https://api.igdb.com/v4',
    headers: {
      'client-id': id,
      'authorization': `Bearer ${token}`,
      'x-user-agent': `igdb-api-node v${version}`,
      accept: 'application/json',
    },
    responseType: 'json'
  };

  return apicalypse(merge(defaultOptions, opts, {
    isMergeableObject: isPlainObject
  }));
};

export {getTagNumber};

