import { validURL } from '../client/js/nameChecker';

describe('validURL: URL', function() {
    it('should match the expected URL', function() {
        const validURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const testURL = 'http://www.yahoo.com/';
        expect(validURL.test(testURL)).toBe(true);
    });
});