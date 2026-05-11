import React from 'react';
import { MathRenderer } from './MathRenderer';

export const TopicCard: React.FC<{ title: string; priority: string; description: string; to: string; onClick?: () => void }> = ({ title, priority, description, onClick }) => (
  <div onClick={onClick} className="bg-white dark:bg-dark-card p-5 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
        {priority}
      </span>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-400 flex-1">{description}</p>
  </div>
);

export const FormulaCard: React.FC<{ title: string; expression: string; explanation: string; whenToUse: string }> = ({ title, expression, explanation, whenToUse }) => (
  <div className="bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border shadow-sm overflow-hidden flex flex-col h-full">
    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-dark-border flex justify-center items-center overflow-x-auto">
      <MathRenderer math={expression} />
    </div>
    <div className="p-4 flex-1 flex flex-col gap-3">
      <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{explanation}</p>
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">When to use</span>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{whenToUse}</p>
      </div>
    </div>
  </div>
);

export const ProgressCard: React.FC<{ label: string; value: number; total: number; color?: string }> = ({ label, value, total, color = 'bg-primary-500' }) => {
  const percentage = Math.round((value / total) * 100) || 0;
  return (
    <div className="bg-white dark:bg-dark-card p-5 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm">
      <div className="flex justify-between items-end mb-2">
        <h4 className="font-semibold text-slate-700 dark:text-slate-300">{label}</h4>
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-1 overflow-hidden">
        <div className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 text-right">{value} of {total} completed</p>
    </div>
  );
};
