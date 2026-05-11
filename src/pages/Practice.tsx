import React from 'react';
import { topics } from '../data/topics';
import { PracticeQuestion } from '../components/InteractiveLearning';

export const Practice: React.FC = () => {
  const handleComplete = (id: string, completed: boolean) => {
    localStorage.setItem(`prac-done-${id}`, String(completed));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Practice Problems</h1>
        <p className="text-slate-600 dark:text-slate-400">Master every topic by solving these core problems. Check the solution only after trying yourself.</p>
      </div>

      <div className="space-y-12">
        {topics.map(topic => {
          const isDone = localStorage.getItem(`prac-done-${topic.practiceQuestion.id}`) === 'true';
          return (
            <div key={topic.id} id={topic.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-dark-border flex items-center justify-between">
                {topic.title}
                {isDone && <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Completed</span>}
              </h2>
              <PracticeQuestion 
                id={topic.practiceQuestion.id}
                text={topic.practiceQuestion.text}
                solution={topic.practiceQuestion.solution}
                isCompleted={isDone}
                onComplete={handleComplete}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
