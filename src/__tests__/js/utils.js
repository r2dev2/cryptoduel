import { fmtTime, getDuplicates } from '@/js/utils.js';

describe('formatting time', () => {
  it.each([
    [(1 * 60 + 20) * 1000, '1:20'],
    [(1 * 60 + 2) * 1000, '1:02'],
    [(1 * 3600 + 2 * 60 + 10) * 1000, '1:02:10'],
  ])('formats %s ms correctly', (ms, correctlyFormattedTime) => {
    expect(fmtTime(ms)).toEqual(correctlyFormattedTime);
  });
});

describe('getting duplicates', () => {
  it.each([
    [[1, 2, 3], new Set()],
    [[1, 2, 3, 3], new Set([3])],
    [['a', 'b', 'c'], new Set()],
    [['a', 'b', 'b', 'c'], new Set(['b'])],
  ])('finds duplicates of %s', (arr, duplicates) => {
    expect(getDuplicates(arr)).toEqual(duplicates);
  });
});
