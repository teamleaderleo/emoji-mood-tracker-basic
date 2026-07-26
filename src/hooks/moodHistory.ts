export type MoodEntry = {
  mood: string;
  timestamp: Date;
};

export const DEFAULT_MOOD = "🤔";
export const MOOD_BLOCK_SIZE = 7;

export function currentMoodFromHistory(history: readonly MoodEntry[]): string {
  return history.length > 0 ? history[history.length - 1].mood : DEFAULT_MOOD;
}

export function appendMood(
  history: readonly MoodEntry[],
  mood: string,
  timestamp: Date = new Date(),
): MoodEntry[] {
  return [...history, { mood, timestamp }];
}

export function clearLastMood(history: readonly MoodEntry[]): MoodEntry[] {
  return history.length > 0 ? history.slice(0, -1) : [];
}

export function clearLastMoodBlock(
  history: readonly MoodEntry[],
  size: number = MOOD_BLOCK_SIZE,
): MoodEntry[] {
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("Mood block size must be a positive integer.");
  }
  return history.slice(0, Math.max(0, history.length - size));
}
