import apicalypse from 'apicalypse';
import getTagNumber from './tag-number';
import { VERSION } from './version';

interface IGDBOptions {
    method?: string;
    baseURL?: string;
    headers?: Record<string, string>;
    responseType?: string;
    [key: string]: any;
}

/**
 * Creates the IGDB API object, populated with methods for building a query.
 * @param clientID - The Twitch Client ID
 * @param appAccessToken - The Twitch App Access Token
 * @param opts - Apicalypse Options
 * @returns The configured API client
 */
export default function createIGDBClient(
    clientID?: string,
    appAccessToken?: string,
    opts: IGDBOptions = {}
): ReturnType<typeof apicalypse> {
    const id = clientID || process.env.TWITCH_CLIENT_ID || (global as any).TWITCH_CLIENT_ID;
    const token = appAccessToken || process.env.TWITCH_APP_ACCESS_TOKEN || (global as any).TWITCH_APP_ACCESS_TOKEN;
    
    if (!id) {
        throw new Error("ClientID must be provided, either as an argument or through env TWITCH_CLIENT_ID");
    }
    if (!token) {
        throw new Error("AppAccessToken must be provided, either as an argument or through env TWITCH_APP_ACCESS_TOKEN");
    }

    const defaultOptions: IGDBOptions = {
        method: 'POST',
        baseURL: 'https://api.igdb.com/v4',
        headers: {
            'client-id': id,
            'authorization': `Bearer ${token}`,
            'x-user-agent': `igdb-api-node v${VERSION}`,
            accept: 'application/json',
        },
        responseType: 'json'
    };

    // Deep merge the headers
    const mergedOptions = {
        ...defaultOptions,
        ...opts,
        headers: {
            ...defaultOptions.headers,
            ...(opts.headers || {})
        }
    };
    return apicalypse(mergedOptions);
}

export { getTagNumber };