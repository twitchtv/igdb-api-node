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
import performRequest from '../js/perform-request';
import requestEndpoint from '../js/request-endpoint';

const apiShould = 'should make the correct HTTP request to IGDB based on passed arguments',
    igdbApiUrl = 'https://igdbcom-internet-game-database-v1.p.mashape.com';

configuration.api.key = 'example-api-key-123';

describe('igdb-api-node', () => {
    it('should fall back to an empty string API key if no key is configured or available in process or global scope', () => {
        nock(igdbApiUrl, {
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

    it('should fall back to global-scope API key property if no key is configured and no process-scope propert is set', () => {
        global.mashapeKey = 'example-api-key-123';

        nock(igdbApiUrl, {
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

        nock(igdbApiUrl, {
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
            });

            configuration.api.keyHeader = _configKeyHeader;
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
});

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

            nock(igdbApiUrl, {
                reqheaders: {
                    Accept: 'application/json',
                    'X-Mashape-Key': headerValue => headerValue
                }
            }).get('/characters/').query({
                fields: '*',
                limit: 2
            }).reply(200, _response);

            return igdb(configuration.api.key).characters({
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

            nock(igdbApiUrl, {
                reqheaders: {
                    Accept: 'application/json',
                    'X-Mashape-Key': headerValue => headerValue
                }
            }).get('/collections/').query({
                fields: '*'
            }).reply(200, _response);

            return igdb(configuration.api.key).collections({
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

            nock(igdbApiUrl, {
                reqheaders: {
                    Accept: 'application/json',
                    'X-Mashape-Key': headerValue => headerValue
                }
            }).get('/companies/').query({
                fields: '*',
                offset: 0,
                limit: 1
            }).reply(200, _response);

            return igdb(configuration.api.key).companies({
                fields: '*',
                offset: 0,
                limit: 1
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });
});
describe('Helpers', () => {
    describe('image', () => {
        it('should generate an image URL', () => {
            const image = igdb().image({
                cloudinary_id: 'qyardon47coclwtjfwwr',
                height: 1400,
                width: 2488
            }, 'thumb', 'webp');

            expect(image).to.equal('https://images.igdb.com/igdb/image/upload/t_thumb/qyardon47coclwtjfwwr.webp');
        });

        it('should default to `thumb` size if no size argument is provided', () => {
            const image = igdb().image({
                cloudinary_id: 'example_id'
            }, null, 'png');

            expect(image).to.equal('https://images.igdb.com/igdb/image/upload/t_thumb/example_id.png');
        });

        it('should default to `jpg` image format is no fileType argument is provided', () => {
            const image = igdb().image({
                cloudinary_id: 'example_id'
            }, 'screenshot_huge_2x');

            expect(image).to.equal('https://images.igdb.com/igdb/image/upload/t_screenshot_huge_2x/example_id.jpg');
        });

        it('should throw an Error if no image object is provided', () => {
            expect(() => {
                igdb().image();
            }).to.throw('No image object recieved');
        });
    });
});
