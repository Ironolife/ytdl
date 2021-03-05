import formatFileSize from './formatFileSize';

const KB = 1024;
const MB = 1024 ** 2;
const GB = 1024 ** 3;

const cases: [number, string][] = [
  [1, '1 B'],
  [103, '103 B'],
  [KB - 1, '1023 B'],
  [KB, '1 KB'],
  [KB + 1, '1.0 KB'],
  [KB + 103, '1.1 KB'],
  [MB - 1, '1023.9 KB'],
  [MB, '1 MB'],
  [GB - 1, '1023.9 MB'],
  [GB, '1 GB'],
  [GB * 1024, '1024 GB'],
];

describe(formatFileSize, () => {
  test.each(cases)(`%i Bytes`, (bytes, fileSize) => {
    expect(formatFileSize(bytes)).toEqual(fileSize);
  });
});
