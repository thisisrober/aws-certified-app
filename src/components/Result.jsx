import React, { useContext } from 'react';
import { Trophy } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import PerformanceSummary from './PerformanceSummary';

const Result = ({ score, domainScores, quizType, onRetry, onBack }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      {/* Score Card - Centered */}
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className={`p-8 rounded-full ${score >= 700 ? isDarkMode ? 'bg-slate-700 text-emerald-400' : 'bg-emerald-100 text-emerald-600' : isDarkMode ? 'bg-slate-700 text-red-400' : 'bg-red-100 text-red-600'}`}>
            <Trophy className="w-16 h-16" />
          </div>
        </div>
        
        <h2 className={`text-4xl font-extrabold mb-2 ${isDarkMode ? 'text-white' : ''}`}>
          {score >= 700 ? 'Certification Passed!' : 'Not Passed'}
        </h2>
        <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your estimated score on the AWS scale</p>
        
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="text-center">
            <div className={`text-5xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{score}</div>
            <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Points (100-1000)</div>
          </div>
          <div className={`w-[1px] h-12 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div className="text-center">
            <div className={`text-5xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>700</div>
            <div className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Minimum to pass</div>
          </div>
        </div>

        {/* Performance Summary - Only for Full Exams */}
        {quizType === 'full' && domainScores && (
          <div className="mb-12 text-left">
            <PerformanceSummary domainScores={domainScores} overallScore={score} />
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onBack}
            className={`p-4 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            Back to Home
          </button>
          <button 
            onClick={onRetry}
            className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors"
          >
            Retry Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;