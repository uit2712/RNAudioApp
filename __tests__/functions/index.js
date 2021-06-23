import { formatTimeString } from '@functions/index';

test('formatTimeString: format time 35000 miliseconds is 00:02:30', () => {
    expect(formatTimeString(35000)).toBe('00:00:35');
});