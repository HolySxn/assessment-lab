export type Ratings = [number | null, number | null, number | null];
export type ActivityState = {
  step: 1 | 2 | 3;
  initial: number;
  ratings: Ratings;
  reflection: string;
};
export const freshActivity = (): ActivityState => ({ step: 1, initial: 65, ratings: [null, null, null], reflection: '' });

export function weightedGrade(ratings: Ratings, weights: readonly number[]): number | null {
  if (ratings.length !== 3 || weights.length !== 3 || weights.reduce((sum, w) => sum + w, 0) !== 100 || weights.some(w => !Number.isFinite(w) || w < 0)) throw new RangeError('Weights must be three non-negative numbers totalling 100.');
  if (ratings.some(v => v === null)) return null;
  if (ratings.some(v => !Number.isInteger(v) || v! < 0 || v! > 4)) throw new RangeError('Ratings must be integers from 0 to 4.');
  return Math.round(ratings.reduce<number>((sum, value, i) => sum + value! / 4 * weights[i], 0) * 10) / 10;
}

export function readActivity(raw: string | null): ActivityState {
  try {
    const value = JSON.parse(raw || 'null');
    if (!value || ![1, 2, 3].includes(value.step) || !Number.isInteger(value.initial) || value.initial < 0 || value.initial > 100 || !Array.isArray(value.ratings) || value.ratings.length !== 3 || value.ratings.some((v: unknown) => v !== null && (typeof v !== 'number' || !Number.isInteger(v) || v < 0 || v > 4)) || typeof value.reflection !== 'string') return freshActivity();
    if (value.step === 3 && value.ratings.includes(null)) value.step = 2;
    return { step: value.step, initial: value.initial, ratings: value.ratings, reflection: value.reflection.slice(0, 2000) };
  } catch { return freshActivity(); }
}
