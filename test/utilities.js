import {
    describe,
    it
} from 'mocha';
import {
    addScrollParameter
} from '../js/utilities';
import {
    expect
} from 'chai';

describe('Utilities', () => {
    describe('addScrollParameter', () => {
        it('should safely add scroll as a parameter to the path', () => {
            const url = addScrollParameter('/games/?fields=*');

            expect(url).to.equal('/games/?fields=*&scroll=1');
        });
        it('should not add the scroll parameter if it already exists', () => {
            const url = addScrollParameter('/games/?fields=*&scroll=1');

            expect(url).to.equal('/games/?fields=*&scroll=1');
        });
    });
});
