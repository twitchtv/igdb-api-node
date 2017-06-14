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
import requestEndpoint from '../js/request-endpoint';

const igdbApiUrl = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

describe('request-endpoint', () => {
    it('should return a rejected Promise if no endpoint is provided', () => requestEndpoint().catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'No API endpoint provided');
    }));

    it('should create requests for endpoints without options', () => {
        const _response = {
            exampleResponse: true
        };

        nock(igdbApiUrl, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => headerValue
            }
        }).get('/characters/').reply(200, _response);

        return igdb(configuration.api.key).characters().then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for endpoints with fields', () => {
        const _response = {
            exampleResponse: true
        };

        nock(igdbApiUrl, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => headerValue
            }
        }).get('/games/').query({
            fields: 'id,name'
        }).reply(200, _response);

        return igdb(configuration.api.key).games({
            fields: [
                'id',
                'name'
            ]
        }).then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for endpoints with filters', () => {
        const _response = {
            exampleResponse: true
        };

        nock(igdbApiUrl, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => headerValue
            }
        }).get('/games/').query({
            fields: '*',
            filter: {
                platforms: {
                    eq: 3
                }
            },
            limit: 3,
            offset: 4,
            search: 'penguin'
        }).reply(200, _response);

        return igdb(configuration.api.key).games({
            fields: '*',
            filters: {
                'platforms-eq': 3
            },
            limit: 3,
            offset: 4,
            search: 'penguin'
        }).then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for endpoints with ids', () => {
        const _response = {
            exampleResponse: true
        };

        nock(igdbApiUrl, {
            reqheaders: {
                Accept: 'application/json',
                'X-Mashape-Key': headerValue => headerValue
            }
        }).get('/games/3766,3767').query({
            fields: '*'
        }).reply(200, _response);

        return igdb(configuration.api.key).games({
            fields: '*',
            ids: [
                3766,
                3767
            ]
        }).then(response => {
            expect(response.body).to.eql(_response);
        });
    });
});
