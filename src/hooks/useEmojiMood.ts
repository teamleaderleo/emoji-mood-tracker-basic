import { useState, useEffect } from "react";

type MoodEntry = {
  mood: string;
  timestamp: Date;
};

export function useEmojiMood() {
  const [currentMood, setCurrentMood] = useState<string>("🤔");
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
      history
    };
    localStorage.setItem("mood-tracker-data", JSON.stringify(dataToSave));
  }, [currentMood, history, isLoaded]);

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

  // Calculate streak (consecutive same moods)
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
    streak,
  };
}