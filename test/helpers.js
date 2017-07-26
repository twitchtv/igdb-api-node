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

configuration.mashape.key = 'example-api-key-123';

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

    describe('client.scroll', () => {
        it('should retrive next page of results via scrollUrl and client.scroll', () => {
            nock(configuration.mashape.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'X-Mashape-Key': headerValue => {
                        expect(headerValue).to.equal(configuration.mashape.key);
                        return headerValue;
                    }
                }
            }).get('/games/').query({
                order: 'rating',
                scroll: 1
            }).reply(200, {}, {
                'X-Count': 1337,
                'X-Next-Page': `${configuration.mashape.url}/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=`
            });

            return igdb(configuration.mashape.key).games({
                order: 'rating',
                scroll: 1
            }).then(response => {
                expect(response.body).to.eql({});
                expect(response.scrollCount).to.equal(1337);
                expect(response.scrollUrl).to.equal(`${configuration.mashape.url}/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=`);

                nock(`${configuration.mashape.url}`, {
                    reqheaders: {
                        Accept: 'application/json',
                        'X-Mashape-Key': headerValue => {
                            expect(headerValue).to.equal(configuration.mashape.key);
                            return headerValue;
                        }
                    }
                }).get('/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=').reply(200, {});

                return igdb(configuration.mashape.key).scroll(`${configuration.mashape.url}/games/scroll/cXVlcnlBbmRGZXRjaDsxOzE5OkhBck1wUUZsUnpPUDgwMGtDN0hSdEE7MDs=`);
            }).then(response => {
                expect(response.body).to.eql({});
            });
        });
    });
});
