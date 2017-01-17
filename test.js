var assert = require('assert')
var igdb = require('./index')

describe('helpers', () => {

  it('should generate an image url', () => {
    let image = igdb.image({
      "cloudinary_id": "qyardon47coclwtjfwwr",
      "width": 2488,
      "height": 1400
    }, 'thumb', 'webp')
    assert.equal(image, 'https://images.igdb.com/igdb/image/upload/t_thumb/qyardon47coclwtjfwwr.webp');
  });

})