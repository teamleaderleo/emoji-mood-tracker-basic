import { useState, useEffect } from "react";

type MoodEntry = {
  mood: string;
  timestamp: Date;
};

export function useEmojiMood() {
  const [currentMood, setCurrentMood] = useState<string>("🤔");
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mood-tracker-data");
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        
        if (data.history) {
          // Convert timestamps back to Date objects
          const historyWithDates = data.history.map((entry: any) => ({
            ...entry,
            timestamp: new Date(entry.timestamp)
          }));
          setHistory(historyWithDates);
        }
        if (data.currentMood) {
          setCurrentMood(data.currentMood);
        }
        if (typeof data.isDarkMode === 'boolean') {
          setIsDarkMode(data.isDarkMode);
        }
      } catch (error) {
        console.warn("Failed to load mood data from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    
    const dataToSave = {
      currentMood,
      history,
      isDarkMode
    };
    localStorage.setItem("mood-tracker-data", JSON.stringify(dataToSave));
  }, [currentMood, history, isDarkMode, isLoaded]);

  const setMood = (mood: string) => {
    setCurrentMood(mood);
    const newEntry: MoodEntry = {
      mood,
      timestamp: new Date()
    };
    setHistory(prev => [...prev, newEntry]);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentMood("🤔");
  };

  const clearLastWeek = () => {
    // Remove last 7 entries (or however many exist if less than 7)
    const entriesToRemove = Math.min(7, history.length);
    setHistory(prev => prev.slice(0, -entriesToRemove));
    
    // Reset current mood if we cleared everything
    if (history.length <= 7) {
      setCurrentMood("🤔");
    }
  };

  const clearToday = () => {
    // Remove the last entry (most recent mood)
    if (history.length > 0) {
      setHistory(prev => prev.slice(0, -1));
      
      // Reset current mood if we cleared everything
      if (history.length === 1) {
        setCurrentMood("🤔");
      }
    }
  };

  // Calculate mood summary stats
  const moodSummary = (() => {
    if (history.length === 0) return null;

    // Count occurrences of each mood
    const moodCounts: Record<string, number> = {};
    history.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    // Find most common mood (ES2015 compatible way)
    const moods = Object.keys(moodCounts);
    let mostCommonMood = moods[0];
    let mostCommonCount = moodCounts[mostCommonMood];
    
    moods.forEach(mood => {
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
      moodCounts
    };
  })();

  // Pick-me-up messages based on current mood
  const pickMeUpMessage = (() => {
    const messages: Record<string, string> = {
      '😊': "Keep that positive energy flowing! ✨",
      '😢': "It's okay to feel down sometimes. You've got this! 💙",
      '😡': "Take a deep breath. This feeling will pass. 🌬️",
      '😴': "Rest is important. Take care of yourself! 💤",
      '🤩': "Your excitement is contagious! Keep shining! ⭐",
      '😱': "Overwhelming moments happen. You're stronger than you know! 💪",
      '🤔': "Ready to track your mood? How are you feeling right now?"
    };
    
    return messages[currentMood] || "Every emotion is valid. Thanks for checking in! 🌈";
  })();

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  const streak = (() => {
    if (history.length === 0) return 0;
    
    const lastMood = history[history.length - 1]?.mood;
    let count = 0;
    
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].mood === lastMood) {
        count++;
      } else {
        break;
      }
    }
    
    return count;
  })();

  return {
    mood: currentMood,
    history: history.map(entry => entry.mood),
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