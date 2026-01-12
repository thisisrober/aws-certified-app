export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
};

// Fisher-Yates shuffle returns a new shuffled array
// Enhanced with timestamp-based randomization for better variety
export const shuffle = (arr) => {
  const a = Array.isArray(arr) ? arr.slice() : [];
  
  // Add extra randomization using timestamp and multiple passes
  const seed = Date.now() + Math.random();
  const extraShuffles = Math.floor(Math.random() * 3) + 1; // 1-3 extra shuffles
  
  for (let pass = 0; pass < extraShuffles; pass++) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  
  return a;
};

// calculateScore expects (questions, userAnswers, scoredQuestionIndices)
// For full exams (65 questions): scoredQuestionIndices contains 50 random indices that count
// For domain tests (30 questions): scoredQuestionIndices is null, all 30 count
export const calculateScore = (questions, userAnswers, scoredQuestionIndices = null) => {
  let correctCount = 0;

  if (scoredQuestionIndices) {
    // Full exam: only count questions in the scoredQuestionIndices array
    scoredQuestionIndices.forEach((idx) => {
      const q = questions[idx];
      const ans = userAnswers[idx] || [];
      if (JSON.stringify(ans.slice().sort()) === JSON.stringify(q.correct.slice().sort())) {
        correctCount++;
      }
    });
    const scaledScore = Math.round(100 + (correctCount / 50) * 900);
    return scaledScore;
  } else {
    // Domain test: all questions count
    questions.forEach((q, idx) => {
      const ans = userAnswers[idx] || [];
      if (JSON.stringify(ans.slice().sort()) === JSON.stringify(q.correct.slice().sort())) {
        correctCount++;
      }
    });
    const scaledScore = Math.round(100 + (correctCount / questions.length) * 900);
    return scaledScore;
  }
};
