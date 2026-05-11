import React, { useState } from 'react';
import { QuizGenerator, QuizResult } from '../components/Quiz';
import { type QuizResultData } from '../services/gemini';

export const QuizPage: React.FC = () => {
  const [quizResult, setQuizResult] = useState<QuizResultData | null>(null);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">AI Quiz Generator</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate unique, exam-style practice questions using Gemini AI. Each question comes with a step-by-step solution.</p>
      </div>

      {!quizResult ? (
        <QuizGenerator onQuizGenerated={setQuizResult} />
      ) : (
        <QuizResult quiz={quizResult} onRegenerate={() => setQuizResult(null)} />
      )}
    </div>
  );
};
