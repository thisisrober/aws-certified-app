import React, { useContext } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const LastExamSummary = ({ domainScores, overallScore }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!domainScores || !overallScore) {
    return null;
  }

  const domains = [
    { id: 1, name: 'Cloud Concepts', full: 'Domain 1: Cloud Concepts' },
    { id: 2, name: 'Security & Compliance', full: 'Domain 2: Security and Compliance' },
    { id: 3, name: 'Cloud Tech & Services', full: 'Domain 3: Cloud Technology and Services' },
    { id: 4, name: 'Billing & Support', full: 'Domain 4: Billing, Pricing, and Support' },
  ];

  // Sort domains by score (worst first) for the weakness indicator
  const sortedDomains = [...domains].sort((a, b) => {
    const scoreA = domainScores[a.id] || 0;
    const scoreB = domainScores[b.id] || 0;
    return scoreA - scoreB;
  });

  const weakestDomain = sortedDomains[0];
  const weakestScore = domainScores[weakestDomain.id];

  const getStatusColor = (score) => {
    if (score >= 80) return { bg: isDarkMode ? 'bg-emerald-900' : 'bg-emerald-50', text: isDarkMode ? 'text-emerald-400' : 'text-emerald-700', bar: 'bg-emerald-500' };
    if (score >= 60) return { bg: isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50', text: isDarkMode ? 'text-yellow-400' : 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: isDarkMode ? 'bg-red-900' : 'bg-red-50', text: isDarkMode ? 'text-red-400' : 'text-red-700', bar: 'bg-red-500' };
  };

  return (
    <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Latest Exam Performance</h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your last full exam simulation</p>
          </div>
        </div>
        <div className={`text-3xl font-black ${overallScore >= 700 ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600' : isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
          {overallScore} <span className="text-lg">pts</span>
        </div>
      </div>

      {/* Quick Domain Breakdown - in original order */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {domains.map((domain) => {
          const score = domainScores[domain.id] || 0;
          const colors = getStatusColor(score);
          return (
            <div key={domain.id} className={`p-4 rounded-lg ${colors.bg}`}>
              <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{domain.full}</div>
              <div className={`text-3xl font-black ${colors.text}`}>{score}%</div>
              <div className={`w-full h-2 rounded-full mt-2 ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'} overflow-hidden`}>
                <div className={`h-full transition-all ${colors.bar}`} style={{ width: `${score}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weakest Domain Alert */}
      <div className={`p-3 rounded-lg border-l-4 ${isDarkMode ? 'bg-slate-700 border-orange-500' : 'bg-orange-50 border-orange-500'} flex items-start gap-2`}>
        <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
        <div>
          <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Focus Area</p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {weakestDomain.full} ({weakestScore}%) needs more review
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastExamSummary;
