import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import configuration from '../configuration';
import igdb from '../js/index';
import nock from 'nock';

describe('client', () => {
    it('should fall back to an empty string API key if no key is configured or available in process or global scope', () => {
        nock(configuration.mashape.url, {
            reqheaders: {
                Accept: 'application/json'
            }
        }).get('/characters/').query({
            fields: '*',
            limit: 1
        }).reply(200, {});

        return igdb().characters({
            fields: '*',
            limit: 1
        }).then(response => {
            expect(response.body).to.eql({});
        });
    });

    it('should fall back to global-scope API key property if no key is configured and no process-scope property is set', () => {
        global.mashapeKey = 'example-api-key-123';

        nock(configuration.mashape.url, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/characters/').query({
            fields: '*',
            limit: 1
        }).reply(200, {});

        return igdb().characters({
            fields: '*',
            limit: 1
        }).then(response => {
            expect(response.body).to.eql({});
        });

        delete global.mashapeKey;
    });

    it('should fall back to process-scope API key property if no key is configured', () => {
        process.env.mashapeKey = 'example-api-key-123';

        nock(configuration.mashape.url, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => {
                    expect(headerValue).to.equal('example-api-key-123');
                    return headerValue;
                }
            }
        }).get('/characters/').query({
            fields: '*',
            limit: 1
        }).reply(200, {});

        return igdb().characters({
            fields: '*',
            limit: 1
        }).then(response => {
            expect(response.body).to.eql({});
        });

        delete process.env.mashapeKey;
    });
});
