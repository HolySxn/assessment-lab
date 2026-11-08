import test from 'node:test';
import assert from 'node:assert/strict';
import { freshActivity, readActivity, weightedGrade } from '../src/scoring.ts';
const weights = [30, 40, 30];

test('0, full marks, and equal midpoints preserve the 100-point scale', () => {
  assert.equal(weightedGrade([0, 0, 0], weights), 0);
  assert.equal(weightedGrade([4, 4, 4], weights), 100);
  assert.equal(weightedGrade([2, 2, 2], weights), 50);
});
test('unequal weights contribute the correct points without premature rounding', () => {
  assert.equal(weightedGrade([4, 0, 0], weights), 30);
  assert.equal(weightedGrade([0, 4, 0], weights), 40);
  assert.equal(weightedGrade([0, 0, 4], weights), 30);
  assert.equal(weightedGrade([3, 1, 0], weights), 32.5);
});
test('incomplete ratings cannot produce a result', () => {
  assert.equal(weightedGrade([null, 4, 4], weights), null);
  assert.equal(weightedGrade([null, null, null], weights), null);
});
test('all 125 valid combinations remain bounded and independent of an initial grade', () => {
  for (let a = 0; a <= 4; a++) for (let b = 0; b <= 4; b++) for (let c = 0; c <= 4; c++) {
    const score = weightedGrade([a, b, c], weights)!;
    assert.ok(score >= 0 && score <= 100);
    assert.equal(score, 7.5 * a + 10 * b + 7.5 * c);
  }
});
test('invalid scores and invalid weight totals are rejected', () => {
  assert.throws(() => weightedGrade([5, 1, 1], weights), RangeError);
  assert.throws(() => weightedGrade([1.5, 1, 1], weights), RangeError);
  assert.throws(() => weightedGrade([1, 1, 1], [30, 30, 30]), RangeError);
});
test('session restoration validates input and preserves a completed comparison', () => {
  const valid = { step: 3, initial: 72, ratings: [3, 1, 0], reflection: 'The evidence criterion mattered.' };
  assert.deepEqual(readActivity(JSON.stringify(valid)), valid);
  assert.deepEqual(readActivity('{broken'), freshActivity());
  assert.deepEqual(readActivity(JSON.stringify({ ...valid, initial: 101 })), freshActivity());
  assert.deepEqual(readActivity(JSON.stringify({ ...valid, ratings: [4, 2] })), freshActivity());
  assert.equal(readActivity(JSON.stringify({ ...valid, ratings: [null, 1, 0] })).step, 2);
});
test('reset creates independent blank ratings and clears reflection', () => {
  const first = freshActivity(); first.ratings[0] = 4; first.reflection = 'old';
  const reset = freshActivity();
  assert.equal(reset.step, 1); assert.equal(reset.reflection, '');
  assert.deepEqual(reset.ratings, [null, null, null]);
});
