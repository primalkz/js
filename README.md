# Merge Time Ranges Module

This module provides a helper function, `mergeTimeRanges`, for merging overlapping or nearly contiguous time ranges based on a gap threshold.

## Getting Started

1. **Run the examples**
   ```bash
   node - <<'NODE'
   const { mergeTimeRanges } = require('./mergeTimeRanges');

   console.log('Example 1:', mergeTimeRanges([
     [1000, 2000],
     [2500, 4000],
     [3900, 4100],
     [8000, 9000],
     [9050, 9500],
   ], 200));

   console.log('Example 2:', mergeTimeRanges([
     [0, 10],
     [15, 20],
     [25, 30],
   ], 4));

   console.log('Example 3:', mergeTimeRanges([
     [0, 10],
     [12, 15],
     [17, 25],
     [27, 35],
   ], 3));
   NODE
   ```

2. **Using the module in code**
   ```javascript
   const { mergeTimeRanges } = require('./mergeTimeRanges');

   const merged = mergeTimeRanges([
     [1000, 2000],
     [2500, 4000],
     [3900, 4100],
   ], 200);

   console.log(merged);
   // Output: [ [ 1000, 2000 ], [ 2500, 4100 ] ]
   ```

## Function Signature

```javascript
/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */
const mergeTimeRanges = (ranges, threshold) => { /* ... */ };
```

## Notes
- The function ensures that ranges are normalized and sorted before merging.
- The original input array is not mutated.
- Gaps less than or equal to the threshold (in milliseconds) are merged into the preceding range.
