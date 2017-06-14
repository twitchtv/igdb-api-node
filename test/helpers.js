import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import igdb from '../js/index';

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
});
