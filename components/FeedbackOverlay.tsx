import React, { useEffect, useState } from 'react';
import { FeedbackState } from '../types';
import { BIN_CONFIG } from '../constants';

interface FeedbackOverlayProps {
  feedback: FeedbackState;
  onNext: () => void;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ feedback, onNext }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (feedback.show) {
      setVisible(true);
    }
  }, [feedback.show]);

  if (!feedback.show || !feedback.item) return null;

  const correctBinConfig = BIN_CONFIG[feedback.item.correctBin];
  const isCorrect = feedback.isCorrect;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden animate-[bounceIn_0.5s_ease-out]">
        
        {/* Background Blob */}
        <div className={`absolute top-0 left-0 w-full h-32 ${isCorrect ? 'bg-green-100' : 'bg-red-100'} -z-10 rounded-b-[50%] scale-x-150 translate-y-[-20%]`}></div>

        <div className="mb-4">
           <span className="text-6xl animate-pulse inline-block">
             {isCorrect ? '🎉' : '🤔'}
           </span>
        </div>

        <h2 className={`text-3xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? 'Awesome Job!' : 'Not Quite!'}
        </h2>
        
        <div className="bg-gray-50 rounded-xl p-4 my-6 border-2 border-dashed border-gray-200">
          <p className="text-xl font-semibold text-gray-800 mb-1">
             {feedback.item.emoji} {feedback.item.name}
          </p>
          <p className="text-gray-500 text-sm mb-4">({feedback.item.thaiName})</p>
          
          <div className="text-left text-gray-700">
             {!isCorrect && (
               <p className="mb-2">
                 <span className="font-bold text-red-500">Oops!</span> You put it in the <span className="font-bold">{feedback.selectedBin ? BIN_CONFIG[feedback.selectedBin].label : 'wrong'}</span> bin.
               </p>
             )}
             <p>
               It belongs in the <span className={`font-bold px-2 py-0.5 rounded text-white ${correctBinConfig.colorClass}`}>{correctBinConfig.label}</span> bin.
             </p>
             <div className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
               💡 Fact: {feedback.item.explanation}
             </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          {isCorrect ? 'Next Item ➡️' : 'Try Again 🔄'}
        </button>
      </div>
    </div>
  );
};