import React, { useState } from 'react';
import { lastNightPlan } from '../data/revisionPlan';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export const RevisionPlanPage: React.FC = () => {
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('revision-plan-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSession = (id: string) => {
    const newSessions = { ...completedSessions, [id]: !completedSessions[id] };
    setCompletedSessions(newSessions);
    localStorage.setItem('revision-plan-progress', JSON.stringify(newSessions));
  };

  const progress = Math.round((Object.values(completedSessions).filter(Boolean).length / lastNightPlan.length) * 100) || 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">Last Night Revision Plan</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">A structured timeline to review everything efficiently.</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-200 dark:border-dark-border mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">Overall Progress</span>
          <span className="font-bold text-primary-600 dark:text-primary-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div className="bg-primary-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-8 pb-4">
        {lastNightPlan.map((session) => {
          const isCompleted = completedSessions[session.id];
          return (
            <div key={session.id} className="relative pl-8 md:pl-10">
              <button 
                onClick={() => toggleSession(session.id)}
                className={`absolute -left-[17px] top-1 bg-white dark:bg-dark-bg transition-colors ${isCompleted ? 'text-green-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'}`}
              >
                {isCompleted ? <CheckCircle size={32} className="bg-white dark:bg-dark-bg rounded-full" /> : <Circle size={32} className="bg-white dark:bg-dark-bg rounded-full" />}
              </button>
              
              <div className={`bg-white dark:bg-dark-card border rounded-xl p-5 shadow-sm transition-all duration-300 ${isCompleted ? 'border-green-200 dark:border-green-900/30 bg-green-50/10' : 'border-slate-200 dark:border-dark-border'}`}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <Clock size={14} /> {session.duration}
                  </span>
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${isCompleted ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                  {session.topics.join(', ')}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {session.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
