import { fmtTime, getDuplicates, getCounts } from '@/js/utils.js';

describe('formatting time', () => {
  it.each([
    [(1 * 60 + 20) * 1000, '1:20'],
    [(1 * 60 + 2) * 1000, '1:02'],
    [(1 * 3600 + 2 * 60 + 10) * 1000, '1:02:10'],
    [20 * 1000, '00:20'],
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

describe('getting counts', () => {
  it.each([
    [
      'hello',
      new Map([
        ['h', 1],
        ['e', 1],
        ['l', 2],
        ['o', 1],
      ]),
    ],
    ['', new Map()],
  ])('counts items in %s', (sentence, correctCounts) => {
    expect(getCounts(sentence)).toEqual(correctCounts);
  });
});
