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
});
