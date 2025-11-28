import React, { useState, useEffect, useCallback } from 'react';
import { BinType, WasteItem, GameState, FeedbackState } from './types';
import { BIN_CONFIG, INITIAL_GAME_STATE } from './constants';
import { generateWasteItem } from './services/geminiService';
import { BinButton } from './components/BinButton';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ScoreBoard } from './components/ScoreBoard';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<FeedbackState>({
    show: false,
    isCorrect: false,
    item: null,
    selectedBin: null,
  });

  const fetchNewItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const item = await generateWasteItem();
      setCurrentItem(item);
    } catch (error) {
      console.error("Failed to load item", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchNewItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleBinSelect = (selectedBin: BinType) => {
    if (!currentItem || feedback.show) return;

    const isCorrect = selectedBin === currentItem.correctBin;

    // Show feedback immediately
    setFeedback({
      show: true,
      isCorrect,
      item: currentItem,
      selectedBin,
    });

    // Update score in background
    setGameState(prev => {
      let newScore = prev.score;
      let newStreak = prev.streak;

      if (isCorrect) {
        newScore += 10 + (prev.streak * 2); // Bonus for streak
        newStreak += 1;
      } else {
        newStreak = 0;
      }

      return {
        ...prev,
        score: newScore,
        streak: newStreak,
        history: [...prev.history, { item: currentItem.name, correct: isCorrect }]
      };
    });
  };

  const handleNext = () => {
    setFeedback({ ...feedback, show: false });
    fetchNewItem();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-sans text-slate-800 flex flex-col items-center py-8 px-4">
      
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2 drop-shadow-sm">
          Thai Waste Sort Hero
        </h1>
        <p className="text-slate-500 font-medium">Keep Thailand Clean! Help sort the trash.</p>
      </header>

      {/* Score and Stats */}
      <ScoreBoard gameState={gameState} />

      {/* Game Area */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center">
        
        {/* Item Display */}
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl p-8 mb-8 text-center border-4 border-indigo-100 min-h-[250px] flex flex-col items-center justify-center transition-all">
          
          {isLoading ? (
             <div className="flex flex-col items-center">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
               <p className="text-indigo-400 font-bold animate-pulse">Finding trash...</p>
             </div>
          ) : currentItem ? (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <div className="text-8xl mb-6 filter drop-shadow-lg transform hover:scale-110 transition-transform cursor-help duration-300">
                {currentItem.emoji}
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-1">{currentItem.name}</h2>
              <h3 className="text-xl text-slate-500 font-medium">{currentItem.thaiName}</h3>
              <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">Where does this go?</p>
            </div>
          ) : (
             <p className="text-red-400">Error loading item.</p>
          )}
        </div>

        {/* Bins Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {(Object.keys(BIN_CONFIG) as BinType[]).map((binType) => (
            <BinButton
              key={binType}
              type={binType}
              onClick={handleBinSelect}
              disabled={isLoading || feedback.show}
            />
          ))}
        </div>
      </main>

      {/* Feedback Modal */}
      <FeedbackOverlay feedback={feedback} onNext={handleNext} />

      {/* Footer Instructions */}
      <footer className="mt-12 text-center text-slate-400 text-sm max-w-2xl">
        <p className="mb-2"><strong>Tip:</strong> Look at the color of the bins in your school!</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Green: Wet</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Yellow: Recycle</span>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded">Red: Hazardous</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Blue: General</span>
        </div>
      </footer>
    </div>
  );
};

export default App;