import apicalypse, { ApicalypseConfig } from 'apicalypse';
import getTagNumber from './tag-number';
import { VERSION } from './version';

const createIGDBClient = (
    clientID?: string,
    appAccessToken?: string,
    opts: ApicalypseConfig = {}
): ReturnType<typeof apicalypse> => {
    const id = clientID || process.env.TWITCH_CLIENT_ID || (global as any).TWITCH_CLIENT_ID;
    const token = appAccessToken || process.env.TWITCH_APP_ACCESS_TOKEN || (global as any).TWITCH_APP_ACCESS_TOKEN;
    
    if (!id) {
        throw new Error("ClientID must be provided, either as an argument or through env TWITCH_CLIENT_ID");
    }
    if (!token) {
        throw new Error("AppAccessToken must be provided, either as an argument or through env TWITCH_APP_ACCESS_TOKEN");
    }

    const defaultOptions: ApicalypseConfig = {
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

export default createIGDBClient;