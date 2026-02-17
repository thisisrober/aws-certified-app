import React, { useState, useEffect, useContext } from 'react';
import { BookOpen, ShieldCheck, Cloud, CreditCard, Trophy, Map, Info, Loader, Moon, Sun } from 'lucide-react';
import ConceptMap from './ConceptMap';
import Footer from './Footer';
import LastExamSummary from './LastExamSummary';
import { ThemeContext } from '../context/ThemeContext';

const Menu = ({ startQuiz, lastPerformance, lastFullExamPerformance, lastExamScore }) => {
  const [activeTab, setActiveTab] = useState('tests');
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (tab === activeTab) {
      window.scrollTo(0, 0);
    } else {
      setIsLoading(true);
      setActiveTab(tab);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className={`fixed inset-0 ${isDarkMode ? 'bg-slate-900 bg-opacity-75' : 'bg-white bg-opacity-75'} flex items-center justify-center z-50`}>
          <Loader className="w-12 h-12 text-orange-500 animate-spin" />
        </div>
      )}

      <div className="flex-1 p-6 md:p-12 font-sans">
        {/* Hero Section */}
        <header className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
                <Cloud className="text-white w-12 h-12" />
              </div>
            </div>
            <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600'}`}>
              AWS Certified Application
            </h1>
            <p className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Exam prep application by thisisrober
            </p>
            <p className={`text-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-8`}>Master the fundamentals of Cloud Practitioner with our comprehensive practice exam simulator. <i>(more certifications coming soon!)</i></p>
            
            {/* Tab Navigation */}
            <div className="flex gap-2 justify-center mb-8 flex-wrap">
              <button
                onClick={() => handleTabChange('tests')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'tests'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : isDarkMode ? 'bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500' : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                }`}
              >
                <Trophy className="w-5 h-5 inline-block mr-2" />
                Practice Tests
              </button>
              <button
                onClick={() => handleTabChange('concepts')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'concepts'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : isDarkMode ? 'bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500' : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                }`}
              >
                <Map className="w-5 h-5 inline-block mr-2" />
                Concept Map
              </button>
              <button
                onClick={() => handleTabChange('about')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  activeTab === 'about'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : isDarkMode ? 'bg-slate-700 text-slate-100 border border-slate-600 hover:border-slate-500' : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-300'
                }`}
              >
                <Info className="w-5 h-5 inline-block mr-2" />
                About
              </button>
              <div className="w-[1px] mx-2" />
              <button
                onClick={() => toggleTheme()}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="max-w-6xl mx-auto">
          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div className="space-y-8">
              {/* Domain Tests */}
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Domain Mastery Tests</h2>
                <p className={`mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Focus on specific domains with targeted 30-question quizzes</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { id: 1, title: 'Domain 1: Cloud Concepts', icon: <BookOpen />, color: 'bg-blue-500', weight: '24%' },
            { id: 2, title: 'Domain 2: Security and Compliance', icon: <ShieldCheck />, color: 'bg-red-500', weight: '30%' },
            { id: 3, title: 'Domain 3: Cloud Technology and Services', icon: <Cloud />, color: 'bg-green-500', weight: '34%' },
            { id: 4, title: 'Domain 4: Billing, Pricing, and Support', icon: <CreditCard />, color: 'bg-purple-500', weight: '12%' },
          ].map(d => {
            const pct = lastPerformance ? lastPerformance[d.id] : null;
            const radius = 50;
            const circumference = 2 * Math.PI * radius;
            const offset = pct !== null ? ((100 - pct) / 100) * circumference : circumference;
            const isGood = pct && pct >= 80;
            
            return (
              <button 
                key={d.id}
                onClick={() => startQuiz('domain', d.id)}
                className={`flex items-center p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:border-orange-300 transition-shadow group text-left hover-smooth-scale relative ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                {pct !== null && (
                  <div className="absolute top-2 right-2 flex items-center justify-center">
                    <svg className="w-20 h-20" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={isDarkMode ? '#475569' : '#cbd5e1'}
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={isGood ? '#10b981' : '#ef4444'}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                        transform="rotate(-90 60 60)"
                      />
                      {/* Percentage text */}
                      <text
                        x="60"
                        y="68"
                        textAnchor="middle"
                        fontFamily="inherit"
                        fontSize="28"
                        fontWeight="700"
                        fill={isGood ? '#10b981' : '#ef4444'}
                      >
                        {pct}%
                      </text>
                    </svg>
                  </div>
                )}
                <div className={`${d.color} text-white p-4 rounded-xl mr-5 domain-icon-box flex-shrink-0`}>
                  {d.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-lg leading-tight ${isDarkMode ? 'text-white' : ''}`}>{d.title}</h3>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>Weight: {d.weight} • 30 Questions</p>
                </div>
              </button>
            );
          })}
                </div>

                {/* Full Exam Simulation */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-700">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="bg-orange-500 w-fit p-3 rounded-xl mb-4">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">Full Exam Simulation</h2>
                      <p className="text-slate-300">Experience the real exam with all domains combined</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 text-slate-300 text-sm mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                      <span>65 randomized questions from all domains</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                      <span>90 minutes to complete (realistic exam time)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                      <span>Official domain distribution (16, 20, 21, 8 questions)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                      <span>15 unscored questions included</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => startQuiz('full')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-900/20 hover:shadow-xl"
                  >
                    Start full exam simulation
                  </button>
                </div>

                {/* Last Exam Summary Card */}
                {lastFullExamPerformance && lastExamScore && (
                  <div className="mt-8">
                    <LastExamSummary domainScores={lastFullExamPerformance} overallScore={lastExamScore} />
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Concepts Tab */}
          {activeTab === 'concepts' && (
            <ConceptMap />
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      About This Tool
                    </h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      This AWS Cloud Practitioner practice exam simulator is designed to help you prepare for the official AWS certification exam.
                    </p>
                    <p className={`mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      It provides realistic exam conditions with questions organized by the four official exam domains, allowing you to study specific topics or take full-length practice exams.
                    </p>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                      The tool includes immediate feedback in domain mastery mode and a comprehensive performance breakdown after each exam.
                    </p>
                  </div>

                  <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      How to Use
                    </h3>
                    <ul className={`space-y-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <li className="flex gap-3">
                        <span className="font-bold text-orange-500 flex-shrink-0">1.</span>
                        <span>Choose a domain to focus on specific topics or take the full exam simulation</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-orange-500 flex-shrink-0">2.</span>
                        <span>Answer questions and manage your time (90 minutes for full exam)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-orange-500 flex-shrink-0">3.</span>
                        <span>Review your answers before finishing (in exam mode)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-orange-500 flex-shrink-0">4.</span>
                        <span>Check your score and domain-by-domain performance breakdown</span>
                      </li>
                    </ul>
                  </div>

                  <div className={`p-8 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                      <div className="bg-green-500 p-2 rounded-lg">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      Study Tips
                    </h3>
                    <ul className={`space-y-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-500 flex-shrink-0">✓</span>
                        <span>Start with individual domain tests to understand weak areas</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-500 flex-shrink-0">✓</span>
                        <span>Review the concept map to understand domain relationships</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-500 flex-shrink-0">✓</span>
                        <span>Take multiple full exams until you consistently score 70%+</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-green-500 flex-shrink-0">✓</span>
                        <span>AWS recommends 80% as a safe score before exam day</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-2xl text-white shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <div className="bg-white bg-opacity-30 p-2 rounded-lg">
                        <Info className="w-6 h-6 text-orange-600" />
                      </div>
                      Important
                    </h3>
                    <p className="mb-4">
                      This tool is designed for study purposes. Make sure you're familiar with the official AWS documentation and exam guides before taking the actual exam.
                    </p>
                    <p>
                      AWS recommends consistently scoring at least 80% in practice tests before attempting the official certification exam.
                    </p>
                  </div>
                </div>
              </div>
            )}
        </main>
      </div>

      {/* Footer */}
      <Footer onTabChange={handleTabChange} />
    </div>
  );
};

export default Menu;