const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${truncateNumber(bytes, 1)} B`;
  else if (bytes < 1024 * 1024) return `${truncateNumber(bytes / 1024, 1)} KB`;
  else if (bytes < 1024 * 1024 * 1024)
    return `${truncateNumber(bytes / 1024 / 1024, 1)} MB`;
  else return `${truncateNumber(bytes / 1024 / 1024 / 1024, 1)} GB`;
};

const truncateNumber = (number: number, decimals: number): string => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (decimals || -1) + '})?');
  const matches = number.toString().match(re);
  return matches ? matches[0] : '';
};

export default formatFileSize;
