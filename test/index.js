const assert = require("assert");
const igdb = require("../lib/index.js").default;

describe("index.js", () => {
  it("Sets auth headers correctly", () => {
    const client = igdb("my-client-id", "my-app-access-token");
    assert.deepStrictEqual(client.config.headers["client-id"], "my-client-id");
    assert.deepStrictEqual(client.config.headers["authorization"], "Bearer my-app-access-token");
  });

  it("Throws error when clientID not provided", () => {
    assert.throws(() => igdb(), Error, "Should throw error when ClientID not provided");
  });

  it("Throws error when appAccessToken not provided", () => {
    assert.throws(() => igdb("client-id"), Error, "Should throw error when AppAccessToken not provided");
  });

  it("Should deeply merge options", () => {
    const vanilla = igdb("a", "b");
    const normalHeaders = Object.keys(vanilla.config.headers).length;
    const client = igdb("a", "b", {
      headers: {
        test: 1,
      },
    });
    assert.deepStrictEqual(Object.keys(client.config.headers).length, normalHeaders + 1);
  });

  it("Should not convert buffers to json", () => {
    const client = igdb("a", "b", {
      responseType: "arraybuffer",
      data: Buffer.from("test"),
    });
    assert.deepStrictEqual(client.config.data.constructor, Buffer);
  });
});
