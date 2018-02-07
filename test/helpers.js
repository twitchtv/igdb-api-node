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

const apiKey = 'example-api-key-123';

const xNextPage = '/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=';

describe('Helper Methods', () => {
    describe('client.image', () => {
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

    describe('client.tagNumber', () => {
        it('should generate a tag number', () => {
            expect(igdb().tagNumber(1, 5)).to.equal(268435461);
        });
    });

    describe('client.scroll', () => {
        it('should retrieve next page of results via scrollUrl and client.scroll', () => {
            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => {
                        expect(headerValue).to.equal(apiKey);
                        return headerValue;
                    }
                }
            }).get('/games/').query({
                order: 'rating',
                scroll: 1
            }).reply(200, {}, {
                'x-count': 1337,
                'x-next-page': xNextPage
            });

            return igdb(apiKey).games({
                order: 'rating',
                scroll: 1
            }).then(response => {
                expect(response.body).to.eql({});
                expect(response.scrollCount).to.equal(1337);
                expect(response.scrollUrl).to.equal(xNextPage);

                nock(configuration.threeScale.url, {
                    reqheaders: {
                        Accept: 'application/json',
                        'user-key': headerValue => {
                            expect(headerValue).to.equal(apiKey);
                            return headerValue;
                        }
                    }
                }).get(xNextPage).reply(200, {});

                return igdb(apiKey).scroll(xNextPage);
            }).then(response => {
                expect(response.body).to.eql({});
            });
        });
    });

    describe('client.scrollAll', () => {
        it('should retrieve all pages and concatinate results into a single array', () => {
            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => {
                        expect(headerValue).to.equal(apiKey);
                        return headerValue;
                    }
                }
            }).get('/games/').reply(200, [1], {
                'X-Count': 2,
                'X-Next-Page': xNextPage
            });

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => {
                        expect(headerValue).to.equal(apiKey);
                        return headerValue;
                    }
                }
            }).get(xNextPage).reply(200, [2], {
                'X-Count': 2,
                'X-Next-Page': xNextPage
            });

            return igdb(apiKey).scrollAll('/games/', {
                interval: 0
            }).then(response => {
                expect(response).to.eql([1, 2]);
            });
        });
    });
});
