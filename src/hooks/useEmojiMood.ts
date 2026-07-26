import { useState, useEffect } from "react";
import {
  appendMood,
  clearLastMood,
  clearLastMoodBlock,
  currentMoodFromHistory,
  type MoodEntry,
} from "./moodHistory";

function parseStoredHistory(value: unknown): MoodEntry[] {
  if (!Array.isArray(value)) {
    throw new TypeError("Stored mood history must be an array.");
  }
  return value.map((entry) => {
    if (!entry || typeof entry !== "object") {
      throw new TypeError("Stored mood entry must be an object.");
    }
    const candidate = entry as { mood?: unknown; timestamp?: unknown };
    if (typeof candidate.mood !== "string" || candidate.mood.length === 0) {
      throw new TypeError("Stored mood entry must contain a mood string.");
    }
    if (typeof candidate.timestamp !== "string" && typeof candidate.timestamp !== "number") {
      throw new TypeError("Stored mood entry must contain a timestamp.");
    }
    const timestamp = new Date(candidate.timestamp);
    if (Number.isNaN(timestamp.getTime())) {
      throw new TypeError("Stored mood entry timestamp is invalid.");
    }
    return { mood: candidate.mood, timestamp };
  });
}

export function useEmojiMood() {
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentMood = currentMoodFromHistory(history);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mood-tracker-data");

    if (saved) {
      try {
        const data = JSON.parse(saved) as { history?: unknown; isDarkMode?: unknown };

        if (data.history !== undefined) {
          setHistory(parseStoredHistory(data.history));
        }
        if (typeof data.isDarkMode === "boolean") {
          setIsDarkMode(data.isDarkMode);
        }
      } catch (error) {
        console.warn("Failed to load mood data from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save the source-of-truth state whenever it changes, after initial load.
  useEffect(() => {
    if (!isLoaded) return;

    const dataToSave = {
      history,
      isDarkMode,
    };
    localStorage.setItem("mood-tracker-data", JSON.stringify(dataToSave));
  }, [history, isDarkMode, isLoaded]);

  const setMood = (mood: string) => {
    setHistory((previous) => appendMood(previous, mood));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const clearLastWeek = () => {
    setHistory((previous) => clearLastMoodBlock(previous));
  };

  const clearToday = () => {
    setHistory((previous) => clearLastMood(previous));
  };

  // Calculate mood summary stats
  const moodSummary = (() => {
    if (history.length === 0) return null;

    // Count occurrences of each mood
    const moodCounts: Record<string, number> = {};
    history.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    // Find most common mood (ES2015 compatible way)
    const moods = Object.keys(moodCounts);
    let mostCommonMood = moods[0];
    let mostCommonCount = moodCounts[mostCommonMood];

    moods.forEach((mood) => {
      if (moodCounts[mood] > mostCommonCount) {
        mostCommonMood = mood;
        mostCommonCount = moodCounts[mood];
      }
    });

    return {
      totalEntries: history.length,
      mostCommonMood,
      mostCommonCount,
      uniqueMoods: moods.length,
      moodCounts,
    };
  })();

  // Pick-me-up messages based on current mood
  const pickMeUpMessage = (() => {
    const messages: Record<string, string> = {
      "😊": "Keep that positive energy flowing! ✨",
      "😢": "It's okay to feel down sometimes. You've got this! 💙",
      "😡": "Take a deep breath. This feeling will pass. 🌬️",
      "😴": "Rest is important. Take care of yourself! 💤",
      "🤩": "Your excitement is contagious! Keep shining! ⭐",
      "😱": "Overwhelming moments happen. You're stronger than you know! 💪",
      "🤔": "Ready to track your mood? How are you feeling right now?",
    };

    return messages[currentMood] || "Every emotion is valid. Thanks for checking in! 🌈";
  })();

  const toggleTheme = () => {
    setIsDarkMode((previous) => !previous);
  };

  const streak = (() => {
    if (history.length === 0) return 0;

    const lastMood = history[history.length - 1]?.mood;
    let count = 0;

    for (let index = history.length - 1; index >= 0; index -= 1) {
      if (history[index].mood === lastMood) {
        count += 1;
      } else {
        break;
      }
    }

    return count;
  })();

  return {
    mood: currentMood,
    history: history.map((entry) => entry.mood),
    setMood,
    clearHistory,
    clearLastWeek,
    clearToday,
    streak,
    moodSummary,
    pickMeUpMessage,
    isDarkMode,
    toggleTheme,
  };
}
