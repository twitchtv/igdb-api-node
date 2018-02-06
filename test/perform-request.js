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

configuration.threeScale.key = 'example-api-key-123';

describe('perform-request', () => {
    it('should returconfigurationn a rejected Promise for non-200 HTTP status codes', () => {
        nock('http://example.com/api/v1', {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => {
                    expect(headerValue).to.equal(configuration.threeScale.key);
                    return headerValue;
                }
            }
        }).get('/exampleEndpoint').reply(404);

        return performRequest('http://example.com/api/v1/exampleEndpoint', configuration.threeScale).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'HTTP Status 404 - http://example.com/api/v1/exampleEndpoint');
        });
    });

    it('should return a rejected Promise if the URI provides malformed JSON', () => {
        nock('http://example.com/api/v1', {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => {
                    expect(headerValue).to.equal(configuration.threeScale.key);
                    return headerValue;
                }
            }
        }).get('/exampleEndpoint').reply(200, 'this-is-not-json');

        return performRequest('http://example.com/api/v1/exampleEndpoint', configuration.threeScale).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'Unexpected token h in JSON at position 1');
        });
    });
});
