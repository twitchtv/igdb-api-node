const assert = require('assert');
const apicalypse = require('../lib/index.js').default;

describe("index.js", () => {

  it('Should deeply merge options', () => {
    const client = apicalypse(null, {
      headers: {
        test: 1
      }
    });
    assert(Object.keys(client.config.headers).length > 1);
  });

  it('Should not convert buffers to json', () => {
    const client = apicalypse(null, {
      responseType: 'arraybuffer',
      data: Buffer.from("test")
    });
    assert.equal(client.config.data.constructor, Buffer);
  });
});