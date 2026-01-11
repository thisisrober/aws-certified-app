import React, { useState, useContext } from 'react';
import { Flag, BookMarked, Info } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const QuestionPanel = ({
  currentQ,
  currentIndex,
  flags,
  setFlags,
  notes,
  setNotes,
  userAns,
  showFeedback,
  quizConfig
}) => {
  const [showNotesBox, setShowNotesBox] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  if (!currentQ) return null;

  const animationStyles = `
    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        max-height: 500px;
        transform: translateY(0);
      }
    }
    @keyframes slideUp {
      from {
        opacity: 1;
        max-height: 500px;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
      }
    }
    .notes-box {
      animation: ${showNotesBox ? 'slideDown' : 'slideUp'} 0.3s ease-in-out forwards;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isDarkMode ? 'text-slate-400 bg-slate-700' : 'text-slate-400 bg-slate-100'}`}>
            Question {currentIndex + 1}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setFlags({...flags, [currentIndex]: !flags[currentIndex]})}
              className={`p-2 rounded-lg border transition-all ${flags[currentIndex] ? isDarkMode ? 'bg-orange-900 border-orange-700 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-500' : isDarkMode ? 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-500' : 'text-slate-400 border-slate-200 hover:border-slate-300'}`}
              title="Mark for review"
            >
              <Flag className={`w-5 h-5 ${flags[currentIndex] ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={() => setShowNotesBox(!showNotesBox)}
              className={`p-2 rounded-lg border transition-all ${showNotesBox ? isDarkMode ? 'bg-blue-900 border-blue-700 text-blue-400' : 'bg-blue-50 border-blue-200' : isDarkMode ? 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-500' : 'text-slate-400 border-slate-200 hover:border-slate-300'}`}
              title="Add note"
            >
              <BookMarked className={`w-5 h-5 ${showNotesBox ? isDarkMode ? 'text-blue-400' : 'text-blue-500' : isDarkMode ? 'text-slate-400' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        <h3 className={`text-2xl font-semibold leading-snug mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {currentQ.text}
        </h3>

        {/* Notes box with animation */}
        {showNotesBox && (
          <div className="notes-box">
            <textarea 
              placeholder="Write your notes for this question..."
              value={notes[currentIndex] || ''}
              onChange={(e) => setNotes({...notes, [currentIndex]: e.target.value})}
              className={`w-full p-4 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all border ${isDarkMode ? 'bg-slate-700 border-blue-600 text-white' : 'bg-slate-50 border-blue-200'}`}
              rows={3}
              autoFocus
            />
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionPanel;
