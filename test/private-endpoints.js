import {
    describe,
    it
} from 'mocha';

import configuration from '../configuration';
import {
    expect
} from 'chai';

import igdb from '../js/index';
import nock from 'nock';

configuration.threeScale.key = 'example-api-key-123';
const token = 'XXY',
    apiShould = 'should make the correct HTTP request to IGDB based on passed arguments';

describe('Private API endpoints', () => {
    describe('me', () => {
        it(apiShould, () => {
            const _response = {
                id: 534,
                username: 'userX',
                slug: 'userx',
                url: 'https://www.igdb.com/users/userx',
                created_at: 1348330154384,
                updated_at: 1522348334071,
                role: 1,
                color: 1,
                presentation: 'Kooloo-Limpah!',
                facebook: '',
                twitter: 'https://twitter.com/userx',
                twitch: '',
                instagram: '',
                youtube: '',
                steam: '',
                linkedin: '',
                pinterest: '',
                soundcloud: '',
                google_plus: '',
                reddit: '',
                battlenet: '',
                origin: '',
                uplay: '',
                discord: '',
                avatar: {
                    url: '//images.igdb.com/igdb/image/upload/t_thumb/f32f32ess22w2e3e.jpg',
                    cloudinary_id: 'f32f32ess22w2e3e',
                    width: 1344,
                    height: 1200
                },
                background: {
                    url: '//images.igdb.com/igdb/image/upload/t_thumb/fds3efdsvbvsrssssac.jpg',
                    cloudinary_id: 'fds3efdsvbvsrssssac',
                    width: 512,
                    height: 512
                }
            };

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => headerValue,
                    Authorization: `Bearer ${token}`
                }
            }).get('/me/').reply(200, _response);

            return igdb(configuration.threeScale.key).private({
                token
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });

    describe('me', () => {
        it(apiShould, () => {
            const _response = [
                {
                    id: 6335,
                    name: 'Games I used to have on Nintendo 64',
                    slug: 'games-i-used-to-have-on-nintendo-64',
                    updated_at: 1486910819589,
                    created_at: 1484741641313,
                    user: 76,
                    url: 'https://www.igdb.com/users/userx/lists/games-i-used-to-have-on-nintendo-64',
                    private: false,
                    numbering: false,
                    count: 14,
                    lists: [
                        27966,
                        27964,
                        276,
                        21271,
                        2747
                    ]
                }
            ];

            nock(configuration.threeScale.url, {
                reqheaders: {
                    Accept: 'application/json',
                    'user-key': headerValue => headerValue,
                    Authorization: `Bearer ${token}`
                }
            }).get('/private/lists/').reply(200, _response);

            return igdb(configuration.threeScale.key).private({
                endpoint: 'lists',
                token
            }).then(response => {
                expect(response.body).to.eql(_response);
            });
        });
    });
});
