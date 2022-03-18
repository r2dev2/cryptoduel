import { fmtTime } from '@/js/utils.js';

describe('formatting time', () => {
  it.each([
    [ (1 * 60 + 20) * 1000, '1:20' ],
    [ (1 * 60 + 2) * 1000, '1:02' ],
    [ (1 * 3600 + 2 * 60 + 10) * 1000, '1:02:10' ],
  ])('formats %s ms correctly', (ms, correctlyFormattedTime) => {
    expect(fmtTime(ms)).toEqual(correctlyFormattedTime);
  });
});
