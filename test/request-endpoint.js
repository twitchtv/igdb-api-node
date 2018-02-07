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

configuration.threeScale.key = 'example-api-key-123';

describe('request-endpoint', () => {
    it('should return a rejected Promise if no endpoint is provided', () => requestEndpoint().catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'No API endpoint provided');
    }));

    it('should create requests for endpoints without options', () => {
        const _response = {
            exampleResponse: true
        };

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
            }
        }).get('/characters/').reply(200, _response);

        return igdb(configuration.threeScale.key).characters().then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for endpoints with fields', () => {
        const _response = {
            exampleResponse: true
        };

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
            }
        }).get('/games/').query({
            fields: 'id,name',
            limit: 1
        }).reply(200, _response);

        return igdb(configuration.threeScale.key).games({
            limit: 1
        }, [
            'id',
            'name'
        ]).then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for endpoints with filters', () => {
        const _response = {
            exampleResponse: true
        };

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
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

        return igdb(configuration.threeScale.key).games({
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

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
            }
        }).get('/games/3766,3767').query({
            fields: '*'
        }).reply(200, _response);

        return igdb(configuration.threeScale.key).games({
            fields: '*',
            ids: [
                3766,
                3767
            ]
        }).then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should create requests for expanded entities', () => {
        const _response = {
            exampleResponse: true
        };

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
            }
        }).get('/games/').query({
            fields: 'name,genres.name',
            expand: 'genres'
        }).reply(200, _response);

        return igdb(configuration.threeScale.key).games({
            fields: [
                'name',
                'genres.name'
            ],
            expand: [
                'genres'
            ]
        }).then(response => {
            expect(response.body).to.eql(_response);
        });
    });

    it('should change the url path if limit is above 50', () => {
        const _response = {
            exampleResponse: true
        };

        nock(configuration.threeScale.url, {
            reqheaders: {
                Accept: 'application/json',
                'user-key': headerValue => headerValue
            }
        }).get('/games/pro/').query({
            limit: 51
        }).reply(200, _response);

        return igdb(configuration.threeScale.key).games({
            limit: 51
        }).then(response => {
            expect(response.url).to.contain('/pro/');
        });
    });
});
