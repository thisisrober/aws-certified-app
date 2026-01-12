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
// Uses standard Fisher-Yates algorithm for proper randomization
export const shuffle = (arr) => {
  const a = Array.isArray(arr) ? arr.slice() : [];
  
  // Standard Fisher-Yates shuffle - single pass is sufficient
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
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
