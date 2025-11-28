import React from 'react';
import { GameState } from '../types';

export const ScoreBoard: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  return (
    <div className="flex gap-4 justify-center items-center mb-8 w-full max-w-lg">
      <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Score</span>
        <span className="text-3xl font-black text-slate-800">{gameState.score}</span>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Streak</span>
        <div className="flex items-center gap-1">
          <span className={`text-3xl font-black ${gameState.streak > 2 ? 'text-orange-500' : 'text-slate-800'}`}>
            {gameState.streak}
          </span>
          <span className="text-xl">🔥</span>
        </div>
      </div>
    </div>
  );
};