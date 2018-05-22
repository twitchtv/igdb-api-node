import {URL} from 'url';

const addScrollParameter = path => {
    const testUrl = new URL(`http://x.x${path}`);

    if (!testUrl.searchParams.get('scroll')) {
        testUrl.searchParams.set('scroll', '1');
    }

    return `${testUrl.pathname}?${testUrl.searchParams.toString()}`;
};

export {
    addScrollParameter
};
