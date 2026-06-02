import React, { useState } from 'react';
import { QuizGenerator, QuizResult } from '../components/Quiz';
import { type QuizResultData } from '../services/gemini';
import { Clock, Trash2, ArrowRight } from 'lucide-react';

export const QuizPage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<QuizResultData | null>(null);
  const [history, setHistory] = useState<QuizResultData[]>(() => {
    const saved = localStorage.getItem('quiz-history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const saveHistory = (newHistory: QuizResultData[]) => {
    setHistory(newHistory);
    localStorage.setItem('quiz-history', JSON.stringify(newHistory));
  };

  const handleQuizGenerated = (quiz: QuizResultData) => {
    const newQuiz = { ...quiz, id: Date.now().toString(), createdAt: Date.now() };
    setActiveQuiz(newQuiz);
    saveHistory([newQuiz, ...history]);
  };

  const deleteQuiz = (id: string) => {
    saveHistory(history.filter(q => q.id !== id));
    if (activeQuiz?.id === id) {
      setActiveQuiz(null);
    }
    localStorage.removeItem(`quiz-state-${id}-solutions`);
    localStorage.removeItem(`quiz-state-${id}-options`);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">AI Quiz Generator</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate unique, exam-style practice questions using Gemini AI. Quizzes are automatically saved to your history.</p>
      </div>

      {!activeQuiz ? (
        <div className="space-y-10">
          <QuizGenerator onQuizGenerated={handleQuizGenerated} />
          
          {history.length > 0 && (
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Clock size={20} className="text-slate-500" />
                Quiz History
              </h3>
              
              <div className="space-y-3">
                {history.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">{quiz.title}</h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {quiz.questions.length} questions • {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : 'Unknown date'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => deleteQuiz(quiz.id!)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete quiz"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => setActiveQuiz(quiz)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
                      >
                        Resume <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <QuizResult quiz={activeQuiz} onBack={() => setActiveQuiz(null)} />
      )}
    </div>
  );
};
