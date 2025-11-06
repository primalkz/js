/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */
const coerceThreshold = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return value < 0 ? 0 : value;
};

const sanitizeRange = (range) => {
  if (!Array.isArray(range) || range.length < 2) {
    return null;
  }

  const [start, end] = range;
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return null;
  }

  return start <= end ? [start, end] : [end, start];
};

const normalizeRanges = (ranges) =>
  ranges
    .map(sanitizeRange)
    .filter((range) => range !== null)
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

const parseRanges = (ranges) => {
  if (typeof ranges === 'string') {
    try {
      const parsed = JSON.parse(ranges);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  return Array.isArray(ranges) ? ranges : [];
};

const mergeSortedRanges = (ranges, threshold) => {
  if (ranges.length === 0) {
    return [];
  }

  const merged = [ranges[0].slice()];

  for (let index = 1; index < ranges.length; index += 1) {
    const current = ranges[index];
    const lastMerged = merged[merged.length - 1];
    const gap = current[0] - lastMerged[1];

    if (gap <= threshold) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current.slice());
    }
  }

  return merged;
};

const mergeTimeRanges = (ranges, threshold = 0) => {
  const parsedRanges = parseRanges(ranges);
  if (parsedRanges.length === 0) {
    return [];
  }

  const normalizedThreshold = coerceThreshold(threshold);
  const normalizedRanges = normalizeRanges(parsedRanges);

  return mergeSortedRanges(normalizedRanges, normalizedThreshold);
};

module.exports = {
  mergeTimeRanges,
};
