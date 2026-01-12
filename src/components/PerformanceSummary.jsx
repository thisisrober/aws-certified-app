import React, { useContext } from 'react';
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const PerformanceSummary = ({ domainScores, overallScore }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const domains = [
    { id: 1, name: 'Cloud Concepts', weight: 24 },
    { id: 2, name: 'Security and Compliance', weight: 30 },
    { id: 3, name: 'Cloud Technology and Services', weight: 34 },
    { id: 4, name: 'Billing, Pricing, and Support', weight: 12 },
  ];

  // Sort domains by weakest performance
  const sortedByPerformance = [...domains].sort((a, b) => {
    const scoreA = domainScores[a.id] || 0;
    const scoreB = domainScores[b.id] || 0;
    return scoreA - scoreB;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return { bg: isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50', text: isDarkMode ? 'text-emerald-400' : 'text-emerald-700', bar: 'bg-emerald-500' };
    if (score >= 60) return { bg: isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50', text: isDarkMode ? 'text-yellow-400' : 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: isDarkMode ? 'bg-red-900' : 'bg-red-50', text: isDarkMode ? 'text-red-400' : 'text-red-700', bar: 'bg-red-500' };
  };

  return (
    <div className={`rounded-2xl p-8 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Performance Breakdown by Domain
      </h3>
      <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        Review your performance across each domain to identify areas for improvement
      </p>

      {/* Overall Summary */}
      <div className={`mb-8 p-4 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Overall Score</span>
          <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{overallScore}</span>
        </div>
        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'} overflow-hidden`}>
          <div
            className={`h-full transition-all ${overallScore >= 700 ? 'bg-emerald-500' : 'bg-orange-500'}`}
            style={{ width: `${Math.min((overallScore - 100) / 9, 100)}%` }}
          />
        </div>
        <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {overallScore >= 700 ? '✓ Passing Score' : '✗ Below Passing (Target: 700)'}
        </p>
      </div>

      {/* Domain-by-domain breakdown */}
      <div className="space-y-4 mb-8">
        {sortedByPerformance.map((domain) => {
          const score = domainScores[domain.id] || 0;
          const colors = getScoreColor(score);
          const isWeak = score < 60;

          return (
            <div
              key={domain.id}
              className={`p-4 rounded-xl border ${colors.bg} ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Domain {domain.id}: {domain.name}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Weight: {domain.weight}% • {isWeak && '⚠️ Needs Review'}
                  </p>
                </div>
                <div className={`text-right ${colors.text}`}>
                  <div className="text-2xl font-black">{score}%</div>
                  {isWeak && <AlertCircle className="w-5 h-5 mt-1 ml-auto" />}
                </div>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-3 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'} overflow-hidden mb-2`}>
                <div
                  className={`h-full transition-all ${colors.bar}`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 text-xs">
                {score >= 80 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}>Strong performance</span>
                  </>
                ) : score >= 60 ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}>Average - room to improve</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className={isDarkMode ? 'text-red-400' : 'text-red-700'}>Priority for review</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className={`p-4 rounded-xl border-l-4 ${isDarkMode ? 'bg-slate-700 border-orange-500' : 'bg-orange-50 border-orange-500'}`}>
        <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Recommendations:
        </h4>
        <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {sortedByPerformance.slice(0, 2).map((domain) => {
            const score = domainScores[domain.id] || 0;
            return (
              <li key={domain.id}>
                • Focus on <strong>Domain {domain.id}</strong> ({score}%) - Review flashcards and practice questions
              </li>
            );
          })}
          <li>• Retake the Full Exam Simulation to track improvements</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceSummary;
