import React, { useEffect, useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = ({
  currentQ,
  userAns,
  questions,
  currentIndex,
  setCurrentIndex,
  flags,
  userAnswers,
  setShowFeedback,
  showFeedback,
  onSubmit,
  excludedAnswers,
  setExcludedAnswers,
  quizConfig,
  reviewOpen,
  setReviewOpen,
  reviewAcknowledged,
  setReviewAcknowledged,
  finalizeFinish,
  finishQuiz,
  quizFinished,
  notes
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!currentQ) return null;

  const [tempAns, setTempAns] = useState(userAns || []);
  const [tempExcluded, setTempExcluded] = useState([]);

  useEffect(() => {
    setTempAns(userAns || []);
    setTempExcluded((prev) => []);
  }, [currentIndex]);

  useEffect(() => {
    if (typeof excludedAnswers !== 'undefined') {
      const e = excludedAnswers[currentIndex] || [];
      setTempExcluded(e);
    }
  }, [currentIndex, excludedAnswers]);

  const isUserCorrect = (() => {
    try {
      const ua = (userAns || []).slice().sort();
      const ca = (currentQ.correct || []).slice().sort();
      return JSON.stringify(ua) === JSON.stringify(ca);
    } catch (e) {
      return false;
    }
  })();

  const Feedback = ({ isUserCorrect, currentQ }) => (
    <div className={`p-4 rounded-2xl mb-6 ${isUserCorrect ? isDarkMode ? 'bg-slate-700 border border-slate-600 text-emerald-400' : 'bg-emerald-50 border border-emerald-100 text-emerald-800' : isDarkMode ? 'bg-slate-700 border border-slate-600 text-red-400' : 'bg-red-50 border border-red-100 text-red-800'}`}>
      <div className="flex items-start gap-3">
        <div>
          <p className="font-bold mb-1">{isUserCorrect ? 'Correct!' : 'Incorrect'}</p>
          <p className="text-sm opacity-90 mb-2">Correct answer(s): {currentQ.correct.map(i => String.fromCharCode(65 + i)).join(', ')} - {currentQ.correct.map(i => currentQ.options[i]).join('; ')}</p>
          <p className="text-sm opacity-90">{currentQ.explanation}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      {!quizFinished ? (
        <>
            {reviewOpen ? (
              <div className="space-y-4 mb-6">
                <h4 className="font-bold mb-3">Review questions before finishing</h4>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {questions.map((q, idx) => {
                    const ans = userAnswers[idx] || [];
                    const hasAnswer = ans && ans.length > 0;
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${hasAnswer ? isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white' : isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <button onClick={() => { setCurrentIndex(idx); setShowFeedback(false); }} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100'}`}>{idx+1}</button>
                          <div>
                            <div className="text-sm font-medium">Question {idx + 1}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{hasAnswer ? 'Answered' : 'Unanswered'}</div>
                          </div>
                        </div>
                        <div>
                          {hasAnswer ? <span className="text-sm text-emerald-600 font-bold">Answered</span> : <span className="text-sm text-red-600 font-bold">Open</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={reviewAcknowledged} onChange={(e) => setReviewAcknowledged(e.target.checked)} />
                    <span className="text-sm">I have reviewed the questions and confirm to finish the test</span>
                  </label>
                </div>

                <div className="mt-4 flex gap-3">
                  <button onClick={() => { setReviewOpen(false); setReviewAcknowledged(false); }} className={`flex-1 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100'}`}>Cancel</button>
                  <button onClick={() => { if (reviewAcknowledged) finalizeFinish(); }} disabled={!reviewAcknowledged} className="flex-1 py-2 bg-emerald-500 text-white rounded-lg disabled:opacity-50">Confirm Finish</button>
                </div>
              </div>
            ) : (
              <>
              <div className="space-y-4 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = showFeedback ? userAns.includes(idx) : tempAns.includes(idx);
              const isCorrect = currentQ.correct.includes(idx);
              let stateStyle = isDarkMode ? "bg-slate-800 border-slate-700 text-slate-200 hover:border-orange-500" : "bg-white border-slate-200 text-slate-700 hover:border-orange-300";

              const isExcluded = tempExcluded.includes(idx);

              if (isSelected) stateStyle = "bg-orange-50 border-orange-500 text-orange-900 ring-1 ring-orange-500";
              if (isExcluded) stateStyle = "bg-slate-100 border-slate-200 text-slate-400 line-through";
              if (quizConfig?.immediateFeedback && showFeedback) {
                if (isCorrect) stateStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500";
                else if (isSelected && !isCorrect) stateStyle = "bg-red-50 border-red-500 text-red-900 ring-2 ring-red-500";
              }

              const disabled = quizFinished || (quizConfig?.type === 'domain' && showFeedback) || isExcluded;

              const maxSelectionsReached = currentQ.type === 'multiple' && tempAns.length >= 2 && !tempAns.includes(idx);

              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (disabled || maxSelectionsReached) return;
                      if (currentQ.type === 'single') setTempAns([idx]);
                      else setTempAns(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
                    }
                  }}
                  onClick={() => {
                    if (disabled || maxSelectionsReached) return;
                    if (isExcluded) {
                      const parentExcluded = (typeof excludedAnswers !== 'undefined' && excludedAnswers) ? excludedAnswers : {};
                      const next = tempExcluded.filter(i => i !== idx);
                      setTempExcluded(next);
                      if (setExcludedAnswers) setExcludedAnswers({ ...parentExcluded, [currentIndex]: next });
                      return;
                    }
                    if (currentQ.type === 'single') setTempAns([idx]);
                    else setTempAns(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
                  }}
                  aria-disabled={disabled || maxSelectionsReached}
                  className={`w-full flex items-center p-5 rounded-2xl border transition-all text-left shadow-sm ${stateStyle} ${disabled || maxSelectionsReached ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 ${
                    quizConfig?.immediateFeedback && showFeedback
                      ? isCorrect ? isDarkMode ? 'bg-emerald-500 text-white' : 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : isSelected ? 'bg-orange-500 text-white' : isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-medium">{opt}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const parentExcluded = (typeof excludedAnswers !== 'undefined' && excludedAnswers) ? excludedAnswers : {};
                      if (tempExcluded.includes(idx)) {
                        const next = tempExcluded.filter(i => i !== idx);
                        setTempExcluded(next);
                        if (setExcludedAnswers) setExcludedAnswers({ ...parentExcluded, [currentIndex]: next });
                      } else {
                        const next = [...tempExcluded, idx];
                        setTempExcluded(next);
                        if (setExcludedAnswers) setExcludedAnswers({ ...parentExcluded, [currentIndex]: next });
                        setTempAns(prev => prev.filter(i => i !== idx));
                      }
                    }}
                    title={isExcluded ? 'Reactivar opción' : 'Descartar opción'}
                    className="ml-3 text-sm text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </div>
              );
            })}

          {quizConfig && quizConfig.immediateFeedback && showFeedback && (
            <Feedback isUserCorrect={isUserCorrect} currentQ={currentQ} />
          )}

          <div className="mt-4 mb-6">
            {currentQ.type === 'multiple' && tempAns.length > 2 && (
              <div className="text-xs text-red-600 mb-2">You have selected more than 2 options. Reduce your choices to continue.</div>
            )}
            {quizConfig?.type !== 'full' && (
              <button
                onClick={() => onSubmit && onSubmit(tempAns)}
                disabled={quizFinished || JSON.stringify(tempAns.slice().sort()) === JSON.stringify((userAns || []).slice().sort()) || (currentQ.type === 'multiple' && tempAns.length > 2)}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            )}
          </div>
          </div>

          <div className={`mt-auto pt-8 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex gap-4 mb-8">
              {(() => {
                let prevUnanswered = null;
                let nextUnanswered = null;

                // For domain mode: find next/prev unanswered questions
                if (quizConfig?.type === 'domain') {
                  // find previous unanswered index
                  for (let i = currentIndex - 1; i >= 0; i--) {
                    const ans = userAnswers[i] || [];
                    if (!ans || ans.length === 0) {
                      prevUnanswered = i;
                      break;
                    }
                  }
                  // find next unanswered index
                  for (let i = currentIndex + 1; i < questions.length; i++) {
                    const ans = userAnswers[i] || [];
                    if (!ans || ans.length === 0) {
                      nextUnanswered = i;
                      break;
                    }
                  }
                } else {
                  // For exam mode: allow normal navigation through all questions
                  prevUnanswered = currentIndex > 0 ? currentIndex - 1 : null;
                  nextUnanswered = currentIndex < questions.length - 1 ? currentIndex + 1 : null;
                }

                const prevDisabled = prevUnanswered === null;
                const nextDisabled = nextUnanswered === null;

                return (
                  <>
                    <button
                      disabled={prevDisabled}
                      onClick={() => { 
                        if (!prevDisabled) { 
                          if (quizConfig?.type === 'full' && tempAns.length > 0) {
                            onSubmit && onSubmit(tempAns);
                          }
                          setCurrentIndex(prevUnanswered); 
                          setShowFeedback(false); 
                        } 
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold disabled:opacity-50 transition-all ${isDarkMode ? 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                      <ChevronLeft className="w-5 h-5" /> Previous
                    </button>
                    <button
                      disabled={nextDisabled}
                      onClick={() => { 
                        if (!nextDisabled) { 
                          if (quizConfig?.type === 'full' && tempAns.length > 0) {
                            onSubmit && onSubmit(tempAns);
                          }
                          setCurrentIndex(nextUnanswered); 
                          setShowFeedback(false); 
                        } 
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold disabled:opacity-50 transition-all ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                    >
                      Next <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                );
              })()}
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {questions.map((q, idx) => {
                const ans = userAnswers[idx] || [];
                const hasAnswer = ans && ans.length > 0;
                const isCorrect = hasAnswer && JSON.stringify(ans.slice().sort()) === JSON.stringify(q.correct.slice().sort());
                const isIncorrect = hasAnswer && !isCorrect;
                const hasNotes = notes && notes[idx] && notes[idx].trim().length > 0;

                const disabledGrid = quizConfig?.type === 'domain' && hasAnswer;

                const baseStyle = `${currentIndex === idx ? 'ring-2 ring-orange-500 border-orange-500' : 'border-transparent'}`;
                
                // For exam mode (full), only show answered/unanswered. For domain mode, show correct/incorrect
                const statusStyle = quizConfig?.type === 'full'
                  ? flags[idx]
                    ? isDarkMode ? 'bg-slate-700 text-orange-400 border-slate-600' : 'bg-orange-100 text-orange-600 border-orange-200'
                    : hasAnswer
                      ? isDarkMode ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-slate-200 text-slate-700 border-slate-300'
                      : isDarkMode ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-white text-slate-400 border-slate-200'
                  : flags[idx]
                    ? isDarkMode ? 'bg-slate-700 text-orange-400 border-slate-600' : 'bg-orange-100 text-orange-600 border-orange-200'
                    : isCorrect
                      ? isDarkMode ? 'bg-slate-700 text-emerald-400 border-slate-600' : 'bg-emerald-100 text-emerald-600 border-emerald-200'
                      : isIncorrect
                        ? isDarkMode ? 'bg-slate-700 text-red-400 border-slate-600' : 'bg-red-100 text-red-600 border-red-200'
                        : isDarkMode ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-white text-slate-400 border-slate-200';

                return (
                  <div key={idx} className="relative">
                    <button
                      onClick={() => { if (!disabledGrid) { setCurrentIndex(idx); setShowFeedback(false); } }}
                      disabled={disabledGrid}
                      aria-disabled={disabledGrid}
                      className={`w-full aspect-square text-[10px] font-bold rounded-lg flex items-center justify-center transition-all border ${baseStyle} ${statusStyle}`}
                    >
                      {idx + 1}
                    </button>
                    {hasNotes && (
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
              </>
            )}
        </>
      ) : (
        <div className="h-full flex flex-col justify-center">
           <h3 className={`font-bold uppercase tracking-widest text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Performance breakdown</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map(dom => {
                const domQs = questions.filter(q => q.domain === dom);
                const correctInDom = domQs.filter((q) => {
                  const globalIdx = questions.indexOf(q);
                  const ans = userAnswers[globalIdx] || [];
                  return JSON.stringify(ans.slice().sort()) === JSON.stringify(q.correct.slice().sort());
                }).length;
                const pct = Math.round((correctInDom / domQs.length) * 100) || 0;

                return (
                  <div key={dom} className={`p-4 rounded-xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Domain {dom}</span>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>{pct}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div 
                        className={`h-full transition-all duration-1000 ${pct >= 70 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                )
              })}
           </div>
           <div className={`mt-12 p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'}`}>
             <h4 className={`font-bold flex items-center gap-2 mb-2 italic ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
               <Info className="w-4 h-4" /> AWS Recommendation
             </h4>
             <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
               For the real exam AWS recommends consistently scoring at least 80% in practice tests before taking the exam.
             </p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
