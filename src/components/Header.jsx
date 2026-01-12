import React, { useState, useContext } from 'react';
import { X, Clock, ClipboardCheck, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ onBack, quizConfig, timeLeft, formatTime, quizFinished, finishQuiz }) => {
  const [showAbandonDialog, setShowAbandonDialog] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const domainNames = {
    1: 'Domain 1: Cloud Concepts',
    2: 'Domain 2: Security and Compliance',
    3: 'Domain 3: Cloud Technology and Services',
    4: 'Domain 4: Billing, Pricing, and Support'
  };

  const animationStyles = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .modal-overlay {
      animation: fadeIn 0.2s ease-in-out;
    }
    .modal-content {
      animation: zoomIn 0.3s ease-in-out;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
    <nav className={`border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => quizFinished ? onBack() : setShowAbandonDialog(true)}
          className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
        >
          <X className="w-5 h-5" />
        </button>
        <div className={`h-6 w-[1px] ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} mx-2`} />
        <h2 className={`font-bold hidden sm:block ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {quizConfig?.type === 'domain' ? domainNames[quizConfig.domainId] : 'Certification Exam'}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => toggleTheme()}
          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
          <Clock className="w-4 h-4 text-orange-500" />
          {formatTime(timeLeft)}
        </div>
        {!quizFinished && (
          <button 
            onClick={finishQuiz}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <ClipboardCheck className="w-4 h-4" />
            Finish
          </button>
        )}
      </div>

      {showAbandonDialog && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`modal-content rounded-2xl p-8 max-w-md shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Abandon Test?</h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Are you sure you want to leave the test? Your progress will not be saved.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAbandonDialog(false)}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAbandonDialog(false);
                  onBack();
                }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors"
              >
                Abandon
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Header;
