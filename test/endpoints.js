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

configuration.threeScale.key = 'example-api-key-123';
const apiShould = 'should make the correct HTTP request to IGDB based on passed arguments';

describe('API endpoints', () => {
    describe('characters', () => {
        it(apiShould, () => {
            const _response = [
                {
                    id: 6007,
                    name: 'Col. Lev Kravchenko',
                    created_at: 1446687391083,
                    updated_at: 1446687391132,
                    slug: 'col-lev-kravchenko',
                    url: 'https://www.igdb.com/characters/col-lev-kravchenko',
                    people: [
                        100199
                    ],
                    games: [
                        1122
                    ]
                },
                {
                    id: 6008,
                    name: 'President Bosworth',
                    created_at: 1446687391220,
                    updated_at: 1446687391278,
                    slug: 'president-bosworth',
                    url: 'https://www.igdb.com/characters/president-bosworth',
                    people: [
                        100200
                    ],
                    games: [
                        1122
                    ]
                }
            ];

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => headerValue
                }
            }).get('/characters/').query({
                fields: '*',
                limit: 2
            }).reply(200, _response);

            return igdb(configuration.threeScale.key).characters({
                fields: '*',
                limit: 2
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });

    describe('collections', () => {
        it(apiShould, () => {
            const _response = [
                {
                    id: 2394,
                    name: 'Dex',
                    created_at: 1471863278228,
                    updated_at: 1471863278228,
                    slug: 'dex',
                    url: 'https://www.igdb.com/collections/dex',
                    games: [
                        16925,
                        22795
                    ]
                },
                {
                    id: 2395,
                    name: 'Style Savvy',
                    created_at: 1471863279526,
                    updated_at: 1471863279526,
                    slug: 'style-savvy',
                    url: 'https://www.igdb.com/collections/style-savvy',
                    games: [
                        22796,
                        6892
                    ]
                },
                {
                    id: 2396,
                    name: 'Strike Vector',
                    created_at: 1471871583200,
                    updated_at: 1471871583200,
                    slug: 'strike-vector',
                    url: 'https://www.igdb.com/collections/strike-vector',
                    games: [
                        9464,
                        22798
                    ]
                },
                {
                    id: 2398,
                    name: 'Oceanhorn',
                    created_at: 1471891241782,
                    updated_at: 1471891241782,
                    slug: 'oceanhorn',
                    url: 'https://www.igdb.com/collections/oceanhorn',
                    games: [
                        18975,
                        22800
                    ]
                },
                {
                    id: 2399,
                    name: 'Cyberstrike',
                    created_at: 1471973399270,
                    updated_at: 1471973399270,
                    slug: 'cyberstrike',
                    url: 'https://www.igdb.com/collections/cyberstrike',
                    games: [
                        22809,
                        22810
                    ]
                }
            ];

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => headerValue
                }
            }).get('/collections/').query({
                fields: '*'
            }).reply(200, _response);

            return igdb(configuration.threeScale.key).collections({
                fields: '*'
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });

    describe('companies', () => {
        it(apiShould, () => {
            const _response = [
                {
                    id: 6411,
                    name: 'Sei Mikaeru Joshi Gakuen',
                    created_at: 1441308347129,
                    updated_at: 1441354622985,
                    slug: 'sei-mikaeru-joshi-gakuen',
                    url: 'https://www.igdb.com/companies/sei-mikaeru-joshi-gakuen',
                    logo: {
                        url: '//images.igdb.com/igdb/image/upload/t_thumb/fpho2uqafdwm6sijsogv.jpg',
                        cloudinary_id: 'fpho2uqafdwm6sijsogv',
                        width: 450,
                        height: 120
                    }
                }
            ];

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => headerValue
                }
            }).get('/companies/').query({
                fields: '*',
                offset: 0,
                limit: 1
            }).reply(200, _response);

            return igdb(configuration.threeScale.key).companies({
                fields: '*',
                offset: 0,
                limit: 1
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });
});
