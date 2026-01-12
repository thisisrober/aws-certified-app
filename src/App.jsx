import React, { useState, useEffect, useContext } from 'react';
import FULL_POOL, { QUESTION_BANK } from './data/questions';
import { formatTime as formatTimeUtil, calculateScore as calculateScoreUtil, shuffle as shuffleUtil } from './utils/helpers';
import Header from './components/Header';
import Menu from './components/Menu';
import QuestionPanel from './components/QuestionPanel';
import Sidebar from './components/Sidebar';
import Result from './components/Result';
import { ThemeContext } from './context/ThemeContext';

const shuffleQuestionOptions = (question) => {
  const optionsWithIndices = question.options.map((opt, idx) => ({ option: opt, originalIdx: idx }));
  const shuffled = shuffleUtil(optionsWithIndices);
  const newOptions = shuffled.map(item => item.option);
  const newCorrect = question.correct.map(correctIdx => shuffled.findIndex(item => item.originalIdx === correctIdx));
  
  return {
    ...question,
    options: newOptions,
    correct: newCorrect
  };
};

const App = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [view, setView] = useState('menu'); // 'menu', 'quiz'
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [notes, setNotes] = useState({});
  const [excludedAnswers, setExcludedAnswers] = useState({});
  const [scoredQuestionIndices, setScoredQuestionIndices] = useState(null); // For full exams: which 50 of 65 questions count
  const [timeLeft, setTimeLeft] = useState(5400); // 90 min
  const [quizFinished, setQuizFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewAcknowledged, setReviewAcknowledged] = useState(false);
  const [lastPerformance, setLastPerformance] = useState(null);
  const [lastFullExamPerformance, setLastFullExamPerformance] = useState(null);
  const [lastFullExamScore, setLastFullExamScore] = useState(null);

  // Prevent screenshots and text copying during quiz
  useEffect(() => {
    if (view === 'quiz' && !quizFinished) {
      const handleKeyDown = (e) => {
        // Prevent PrintScreen, Ctrl+Shift+S, Windows+Shift+S
        if (e.key === 'PrintScreen' || 
            (e.ctrlKey && e.shiftKey && e.key === 's') ||
            (e.metaKey && e.shiftKey && e.key === 's')) {
          e.preventDefault();
          alert('Screenshots are not allowed during the test.');
          return false;
        }
      };

      const handleCopy = (e) => {
        e.preventDefault();
        alert('Copying text is not allowed during the test.');
        return false;
      };

      const handleContextMenu = (e) => {
        e.preventDefault();
        return false;
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('copy', handleCopy);
      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('copy', handleCopy);
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, [view, quizFinished]);

  // Load performance data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('domainPerformance');
    if (saved) {
      try {
        setLastPerformance(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse domainPerformance from localStorage', e);
      }
    }

    const savedExam = localStorage.getItem('lastFullExamPerformance');
    if (savedExam) {
      try {
        setLastFullExamPerformance(JSON.parse(savedExam));
      } catch (e) {
        console.error('Failed to parse lastFullExamPerformance from localStorage', e);
      }
    }    const savedScore = localStorage.getItem('lastFullExamScore');
    if (savedScore) {
      try {
        setLastFullExamScore(JSON.parse(savedScore));
      } catch (e) {
        console.error('Failed to parse lastFullExamScore from localStorage', e);
      }
    }  }, []);

  // Save performance to localStorage
  useEffect(() => {
    if (lastPerformance) {
      localStorage.setItem('domainPerformance', JSON.stringify(lastPerformance));
    }
  }, [lastPerformance]);

  useEffect(() => {
    if (lastFullExamPerformance) {
      localStorage.setItem('lastFullExamPerformance', JSON.stringify(lastFullExamPerformance));
    }
  }, [lastFullExamPerformance]);

  useEffect(() => {
    if (lastFullExamScore) {
      localStorage.setItem('lastFullExamScore', JSON.stringify(lastFullExamScore));
    }
  }, [lastFullExamScore]);

  const startQuiz = (type, domainId = null) => {
    let selected = [];
    let scoredIndices = null;
    
    if (type === 'domain') {
      // For domain tests, use only the curated QUESTION_BANK to avoid generated practice items
      // Single shuffle is sufficient for proper randomization
      const domainQuestions = QUESTION_BANK.filter(q => q.domain === domainId);
      const shuffledDomain = shuffleUtil(domainQuestions);
      selected = shuffledDomain.slice(0, 30);
    } else {
      // For full exams, shuffle each domain pool once for proper randomization
      const d1Pool = FULL_POOL.filter(q => q.domain === 1);
      const d2Pool = FULL_POOL.filter(q => q.domain === 2);
      const d3Pool = FULL_POOL.filter(q => q.domain === 3);
      const d4Pool = FULL_POOL.filter(q => q.domain === 4);
      
      const d1 = shuffleUtil(d1Pool).slice(0, 16);
      const d2 = shuffleUtil(d2Pool).slice(0, 20);
      const d3 = shuffleUtil(d3Pool).slice(0, 21);
      const d4 = shuffleUtil(d4Pool).slice(0, 8);
      selected = shuffleUtil([...d1, ...d2, ...d3, ...d4]);
      
      // For full exams (65 questions): randomly select 50 to count, 15 are experimental
      if (selected.length === 65) {
        const allIndices = Array.from({ length: 65 }, (_, i) => i);
        scoredIndices = shuffleUtil(allIndices).slice(0, 50).sort((a, b) => a - b);
      }
    }

    selected = selected.map(q => shuffleQuestionOptions(q));

    setQuestions(selected);
    setScoredQuestionIndices(scoredIndices);
    // Diagnostic: if no questions found, notify user
    if (!selected || selected.length === 0) {
      // eslint-disable-next-line no-alert
      alert(`No questions available for Domain ${domainId}`);
    }
    setQuizConfig({ type, domainId, immediateFeedback: type === 'domain' });
    setView('quiz');
    setCurrentIndex(0);
    setUserAnswers({});
    setFlags({});
    setNotes({});
    setExcludedAnswers({});
    setShowFeedback(false);
    setQuizFinished(false);
    setTimeLeft(5400);
  };

  // Wrapper to help diagnose click events from Menu
  const startQuizWrapper = (type, domainId = null) => {
    try {
      startQuiz(type, domainId);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Error starting the test: ' + (err && err.message));
    }
  };

  // showFeedback is controlled by submit actions; no global close events needed

  useEffect(() => {
    let timer;
    if (view === 'quiz' && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setQuizFinished(true);
    }
    return () => clearInterval(timer);
  }, [view, quizFinished, timeLeft]);

  // Request to finish quiz: for full/exam mode trigger review step
  const requestFinish = () => {
    if (quizConfig?.type === 'full') {
      setReviewOpen(true);
      setReviewAcknowledged(false);
      return;
    }
    finalizeFinish();
  };

  const finalizeFinish = () => {
    // compute per-domain breakdown and store for Menu
    const perf = {};
    [1,2,3,4].forEach(dom => {
      const domQs = questions.filter(q => q.domain === dom);
      const correctInDom = domQs.filter((q) => {
        const globalIdx = questions.indexOf(q);
        const ans = userAnswers[globalIdx] || [];
        return JSON.stringify(ans.slice().sort()) === JSON.stringify(q.correct.slice().sort());
      }).length;
      const pct = Math.round((correctInDom / (domQs.length || 1)) * 100) || 0;
      perf[dom] = pct;
    });

    if (quizConfig?.type === 'domain') {
      const updatedPerf = lastPerformance ? { ...lastPerformance } : { 1: null, 2: null, 3: null, 4: null };
      updatedPerf[quizConfig.domainId] = perf[quizConfig.domainId];
      setLastPerformance(updatedPerf);
    } else if (quizConfig?.type === 'full') {
      setLastFullExamPerformance(perf);
      const finalScore = calculateScoreUtil(questions, userAnswers, scoredQuestionIndices);
      setLastFullExamScore(finalScore);
    }

    setQuizFinished(true);
    setReviewOpen(false);
  };

  // Submit the finalized answer for the current question.
  const handleSubmit = (submittedAns) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: submittedAns });

    // Study mode (domain): show feedback and lock navigation while feedback visible.
    if (quizConfig?.type === 'domain') {
      setShowFeedback(true);
      return;
    }

    // Exam/full mode: do not show feedback, auto-advance to next question.
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const score = quizFinished ? calculateScoreUtil(questions, userAnswers, scoredQuestionIndices) : null;

  if (view === 'menu') {
    return <Menu startQuiz={startQuizWrapper} lastPerformance={lastPerformance} lastFullExamPerformance={lastFullExamPerformance} lastExamScore={lastFullExamScore} />;
  }

  // If we're in quiz view but no questions were loaded, show helpful message
  if (view === 'quiz' && (!questions || questions.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No questions loaded</h2>
          <p className="text-sm text-slate-500 mb-4">Try refreshing the page or open the console for errors.</p>
          <button onClick={() => setView('menu')} className="px-4 py-2 bg-orange-500 text-white rounded">Back</button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const userAns = userAnswers[currentIndex] || [];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} ${view === 'quiz' && !quizFinished ? 'select-none' : ''}`}>
      <style>{view === 'quiz' && !quizFinished ? `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        input[type="checkbox"] {
          -webkit-user-select: auto !important;
          user-select: auto !important;
        }
      ` : ''}</style>
      <Header onBack={() => setView('menu')} quizConfig={quizConfig} timeLeft={timeLeft} formatTime={formatTimeUtil} quizFinished={quizFinished} finishQuiz={requestFinish} />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div style={quizFinished ? {scrollbarWidth: 'none', msOverflowStyle: 'none'} : {}} className={`${quizFinished ? 'w-full' : 'flex-1 md:w-3/5 overflow-y-auto'} p-6 md:p-12 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} ${quizFinished ? '[&::-webkit-scrollbar]:hidden' : ''}`}>
          {!quizFinished ? (
            <>
              {reviewOpen ? (
                <div className="flex flex-col h-full">
                  <style>{`
                    #review-questions-list::-webkit-scrollbar {
                      width: 16px;
                    }
                    #review-questions-list::-webkit-scrollbar-track {
                      background: transparent;
                    }
                    #review-questions-list::-webkit-scrollbar-thumb {
                      background: #3b82f6;
                      border-radius: 10px;
                    }
                    #review-questions-list::-webkit-scrollbar-thumb:hover {
                      background: #2563eb;
                    }
                    #review-questions-list::-webkit-scrollbar-button {
                      display: none;
                    }
                    #review-questions-list {
                      scrollbar-color: #3b82f6 transparent;
                      scrollbar-width: auto;
                    }
                  `}</style>
                  <div className={`mb-6 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400 bg-slate-800' : 'text-slate-400 bg-slate-100'} px-3 py-1 rounded-full w-fit`}>
                    Review Questions ({questions.length} total)
                  </div>
                  <div id="review-questions-list" className="overflow-y-auto max-h-[calc(100vh-200px)] space-y-2 pr-2">
                    {questions.map((q, idx) => {
                      const isAnswered = userAnswers[idx] && userAnswers[idx].length > 0;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                            isAnswered
                              ? isDarkMode
                                ? 'bg-slate-700 border-emerald-500 hover:bg-slate-600'
                                : 'bg-emerald-50 border-emerald-500 hover:bg-emerald-100'
                              : isDarkMode
                              ? 'bg-slate-700 border-red-500 hover:bg-slate-600'
                              : 'bg-red-50 border-red-500 hover:bg-red-100'
                          }`}
                          onClick={() => setCurrentIndex(idx)}
                        >
                          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Question {idx + 1}
                          </div>
                          <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {isAnswered ? (
                              <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}>✓ Answered</span>
                            ) : (
                              <span className={isDarkMode ? 'text-red-400' : 'text-red-700'}>✗ Not answered</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  <div className={`mb-4 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400 bg-slate-800' : 'text-slate-400 bg-slate-100'} px-3 py-1 rounded-full inline-block`}>
                    Question {currentIndex + 1} of {questions.length}
                  </div>
                  <QuestionPanel
                    currentQ={currentQ}
                    currentIndex={currentIndex}
                    flags={flags}
                    setFlags={setFlags}
                    notes={notes}
                    setNotes={setNotes}
                    userAns={userAns}
                    showFeedback={showFeedback}
                    quizConfig={quizConfig}
                  />
                </>
              )}
            </>
          ) : (
            <Result 
              score={score} 
              domainScores={lastFullExamPerformance}
              quizType={quizConfig?.type}
              onRetry={() => startQuiz(quizConfig.type, quizConfig.domainId)} 
              onBack={() => setView('menu')} 
            />
          )}
        </div>

        {!quizFinished && (
          <div className={`md:w-2/5 border-t md:border-t-0 md:border-l ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'} p-6 md:p-12 overflow-y-auto`}>
            <Sidebar
            currentQ={currentQ}
            userAns={userAns}
            questions={questions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            flags={flags}
            userAnswers={userAnswers}
            setShowFeedback={setShowFeedback}
            showFeedback={showFeedback}
            quizConfig={quizConfig}
            onSubmit={handleSubmit}
            excludedAnswers={excludedAnswers}
            setExcludedAnswers={setExcludedAnswers}
              reviewOpen={reviewOpen}
              setReviewOpen={setReviewOpen}
              reviewAcknowledged={reviewAcknowledged}
              setReviewAcknowledged={setReviewAcknowledged}
              finalizeFinish={finalizeFinish}
            quizFinished={quizFinished}
            notes={notes}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;