import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import request from '../js/request-promise';

const testUrl = 'http://localhost:0/asdf';

describe('request-promise', () => {
    it('should reject when called without a url', () => request({}).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'options.uri is a required argument');
    }));

    it('should reject when called with an invalid url', () => request({
        url: 'this-is-not-a-valid-url'
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'Invalid URI "this-is-not-a-valid-url"');
    }));

    it('should reject when called with a url that is missing a protocol', () => request({
        url: 'example.com/url-is-not-valid-without-protocol'
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'Invalid URI "example.com/url-is-not-valid-without-protocol"');
    }));

    it('should reject when called with an invalid url and environmental NO_PROXY variable is set', () => {
        process.env.NO_PROXY = 'google.com';

        return request({
            url: 'invalid'
        }).catch(error => {
            expect(error).to.be.an.instanceOf(Error).with.property('message', 'Invalid URI "invalid"');
            delete process.env.NO_PROXY;
        });
    });

    it('should reject when called with a deprecated UNIX url', () => request({
        uri: 'unix://path/to/socket/and/then/request/path'
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', '`unix://` URL scheme is no longer supported. Please use the format `http://unix:SOCKET:PATH`');
    }));

    it('should reject when called with invalid body', () => request({
        body: {},
        url: testUrl
    }).catch(error => {
        expect(error).to.be.an.instanceOf(Error).with.property('message', 'Argument error, options.body.');
    }));
});
