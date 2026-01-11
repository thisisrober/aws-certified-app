import React, { useState, useEffect } from 'react';
import FULL_POOL, { QUESTION_BANK } from './data/questions';
import { formatTime as formatTimeUtil, calculateScore as calculateScoreUtil, shuffle as shuffleUtil } from './utils/helpers';
import Header from './components/Header';
import Menu from './components/Menu';
import QuestionPanel from './components/QuestionPanel';
import Sidebar from './components/Sidebar';
import Result from './components/Result';

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
  const [view, setView] = useState('menu'); // 'menu', 'quiz'
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [notes, setNotes] = useState({});
  const [excludedAnswers, setExcludedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 min
  const [quizFinished, setQuizFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewAcknowledged, setReviewAcknowledged] = useState(false);
  const [lastPerformance, setLastPerformance] = useState(null);

  const startQuiz = (type, domainId = null) => {
    let selected = [];
    if (type === 'domain') {
      // For domain tests, use only the curated QUESTION_BANK to avoid generated practice items
      selected = shuffleUtil(QUESTION_BANK.filter(q => q.domain === domainId)).slice(0, 30);
    } else {
      const d1 = shuffleUtil(FULL_POOL.filter(q => q.domain === 1)).slice(0, 16);
      const d2 = shuffleUtil(FULL_POOL.filter(q => q.domain === 2)).slice(0, 20);
      const d3 = shuffleUtil(FULL_POOL.filter(q => q.domain === 3)).slice(0, 21);
      const d4 = shuffleUtil(FULL_POOL.filter(q => q.domain === 4)).slice(0, 8);
      selected = shuffleUtil([...d1, ...d2, ...d3, ...d4]);
    }

    selected = selected.map(q => shuffleQuestionOptions(q));

    setQuestions(selected);
    if (!selected || selected.length === 0) {
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

  const startQuizWrapper = (type, domainId = null) => {
    try {
      startQuiz(type, domainId);
    } catch (err) {
      alert('Error starting the test: ' + (err && err.message));
    }
  };


  useEffect(() => {
    let timer;
    if (view === 'quiz' && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setQuizFinished(true);
    }
    return () => clearInterval(timer);
  }, [view, quizFinished, timeLeft]);

  const requestFinish = () => {
    if (quizConfig?.type === 'full') {
      setReviewOpen(true);
      setReviewAcknowledged(false);
      return;
    }
    finalizeFinish();
  };

  const finalizeFinish = () => {
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
    setLastPerformance(perf);
    setQuizFinished(true);
    setReviewOpen(false);
  };

  const handleSubmit = (submittedAns) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: submittedAns });

    if (quizConfig?.type === 'domain') {
      setShowFeedback(true);
      return;
    }

    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const score = quizFinished ? calculateScoreUtil(questions, userAnswers) : null;

  if (view === 'menu') {
    return <Menu startQuiz={startQuizWrapper} lastPerformance={lastPerformance} />;
  }

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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header onBack={() => setView('menu')} quizConfig={quizConfig} timeLeft={timeLeft} formatTime={formatTimeUtil} quizFinished={quizFinished} finishQuiz={requestFinish} />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 md:w-3/5 overflow-y-auto p-6 md:p-12 bg-white">
          {!quizFinished ? (
            <div>
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block">
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
            </div>
          ) : (
            <Result score={score} onRetry={() => startQuiz(quizConfig.type, quizConfig.domainId)} onBack={() => setView('menu')} />
          )}
        </div>

        <div className="md:w-2/5 border-t md:border-t-0 md:border-l border-slate-200 bg-slate-50 p-6 md:p-12 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default App;