import React, { useState } from 'react';
import { MathRenderer, TextWithMath } from './MathRenderer';
import { CheckCircle, Circle, Eye, EyeOff } from 'lucide-react';

export const SolvedExample: React.FC<{ title: string; problem: string; solution: string }> = ({ title, problem, solution }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl overflow-hidden mb-6 shadow-sm">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-5 py-3 border-b border-slate-200 dark:border-dark-border flex justify-between items-center cursor-pointer" onClick={() => setShowSolution(!showSolution)}>
        <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Example</span>
          {title}
        </h4>
        <button className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors flex items-center gap-1 text-sm font-medium">
          {showSolution ? <><EyeOff size={16} /> Hide Solution</> : <><Eye size={16} /> Show Solution</>}
        </button>
      </div>
      <div className="p-5">
        <div className="text-slate-700 dark:text-slate-300 mb-4"><TextWithMath text={problem} /></div>
        
        {showSolution && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
            <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Solution</h5>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <MathRenderer math={solution} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PracticeQuestion: React.FC<{ id: string; text: string; solution: string; onComplete?: (id: string, isCompleted: boolean) => void; isCompleted?: boolean }> = ({ id, text, solution, onComplete, isCompleted = false }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const toggleComplete = () => {
    const newVal = !completed;
    setCompleted(newVal);
    if (onComplete) onComplete(id, newVal);
  };

  return (
    <div className={`border rounded-xl overflow-hidden mb-6 transition-all ${completed ? 'border-green-200 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/5' : 'border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm'}`}>
      <div className="p-5">
        <div className="flex gap-4 items-start">
          <button 
            onClick={toggleComplete}
            className={`mt-1 flex-shrink-0 transition-colors ${completed ? 'text-green-500' : 'text-slate-300 hover:text-slate-400 dark:text-slate-600 dark:hover:text-slate-500'}`}
          >
            {completed ? <CheckCircle size={24} /> : <Circle size={24} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Practice</span>
            </h4>
            <div className="text-slate-700 dark:text-slate-300 mb-4"><TextWithMath text={text} /></div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSolution(!showSolution)}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                {showSolution ? 'Hide Solution' : 'Check Answer'}
              </button>
            </div>
            
            {showSolution && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <MathRenderer math={solution} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
