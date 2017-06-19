import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import configuration from '../configuration';
import nock from 'nock';
import performRequest from '../js/perform-request';

describe('perform-request', () => {
    it('should default API key header to `X-Mashape-Key` if not configured', () => {
        const _configKeyHeader = configuration.api.keyHeader,
            _response = {
                exampleResponse: true
            };

        configuration.api.keyHeader = null;

        nock('http://example.com/api/v1', {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/exampleEndpoint').reply(200, _response);

        return performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').then(response => {
            expect(response.body).to.eql(_response);
            configuration.api.keyHeader = _configKeyHeader;
        });
    });

    it('should return a rejected Promise for non-200 HTTP status codes', () => {
        nock('http://example.com/api/v1', {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/exampleEndpoint').reply(404);

        return performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'HTTP Status 404 - http://example.com/api/v1/exampleEndpoint');
        });
    });

    it('should return a rejected Promise if the URI provides malformed JSON', () => {
        nock('http://example.com/api/v1', {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/exampleEndpoint').reply(200, 'this-is-not-json');

        return performRequest('http://example.com/api/v1/exampleEndpoint', 'example-api-key-123').catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'Unexpected token h in JSON at position 1');
        });
    });

    it('should provide a scroll method on the response object when scrolling is possible', () => {
        const _igdbApiUrl = 'http://example.com/api/v1',
            gamesUrl = `${_igdbApiUrl}/games/?order=rating&scroll=1`,
            scrollUrl = `${_igdbApiUrl}/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=`;

        nock(_igdbApiUrl, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/games/').query({
            order: 'rating',
            scroll: 1
        }).reply(200, {
            gamesResponse: true
        }, {
            'X-Count': 1337,
            'X-Next-Page': scrollUrl
        });

        return performRequest(gamesUrl, 'example-api-key-123').then(response => {
            expect(response.body).to.eql({
                gamesResponse: true
            });
            expect(response.scrollCount).to.equal(1337);
            expect(response.scrollUrl).to.equal(scrollUrl);

            nock(_igdbApiUrl, {
                reqheaders: {
                    Accept: 'application/json',
                    'X-Mashape-Key': headerValue => {
                        expect(headerValue).to.equal('example-api-key-123');
                        return headerValue;
                    }
                }
            }).get('/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=').reply(200, {
                scrollResponse: true
            });

            return response.scroll();
        }).then(scrollResponse => {
            expect(scrollResponse.body).to.eql({
                scrollResponse: true
            });
        });
    });
});
