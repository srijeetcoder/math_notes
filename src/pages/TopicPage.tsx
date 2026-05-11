import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { formulas } from '../data/formulas';
import { MathRenderer } from '../components/MathRenderer';
import { SolvedExample, PracticeQuestion } from '../components/InteractiveLearning';
import { BinomialCalculator } from '../components/BinomialCalculator';
import { PMFCalculator, CDFBuilder } from '../components/Calculators';
import { CheckCircle } from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const topic = topics.find(t => t.id === id);
  const topicFormulas = formulas.filter(f => f.topicId === id);
  
  const [isRevised, setIsRevised] = useState(false);

  useEffect(() => {
    if (topic) {
      const revised = localStorage.getItem(`topic-revised-${topic.id}`) === 'true';
      setIsRevised(revised);
    }
  }, [topic]);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const toggleRevised = () => {
    const newVal = !isRevised;
    setIsRevised(newVal);
    localStorage.setItem(`topic-revised-${topic.id}`, String(newVal));
  };

  const handlePracticeComplete = (pracId: string, completed: boolean) => {
    localStorage.setItem(`prac-done-${pracId}`, String(completed));
  };

  const isPracDone = localStorage.getItem(`prac-done-${topic.practiceQuestion.id}`) === 'true';

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{topic.title}</h1>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${topic.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : topic.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
              {topic.priority} Priority
            </span>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">{topic.conceptExplanation}</p>
        </div>
        
        <button 
          onClick={toggleRevised}
          className={`shrink-0 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${isRevised ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
        >
          <CheckCircle size={20} />
          {isRevised ? 'Marked as Revised' : 'Mark as Revised'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          <section className="bg-white dark:bg-dark-card rounded-xl p-6 border border-slate-200 dark:border-dark-border shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">Step-by-Step Method</h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
              {topic.stepByStepMethod.map((step, i) => (
                <li key={i} className="pl-2">{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Solved Examples</h2>
            {topic.solvedExamples.map((ex, i) => (
              <SolvedExample key={i} title={ex.title} problem={ex.problem} solution={ex.solution} />
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Practice Question</h2>
            <PracticeQuestion 
              id={topic.practiceQuestion.id}
              text={topic.practiceQuestion.text}
              solution={topic.practiceQuestion.solution}
              isCompleted={isPracDone}
              onComplete={handlePracticeComplete}
            />
          </section>

          {topic.id === 'binomial' && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Interactive Calculator</h2>
              <BinomialCalculator />
            </section>
          )}

          {topic.id === 'pmf-pdf-cdf' && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Interactive Tools</h2>
              <CDFBuilder />
            </section>
          )}

          {topic.id === 'expectation-variance' && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Interactive Calculator</h2>
              <PMFCalculator />
            </section>
          )}

        </div>
        
        <div className="space-y-6">
          <section className="bg-primary-50 dark:bg-primary-900/10 rounded-xl p-5 border border-primary-100 dark:border-primary-900/30">
            <h3 className="font-bold text-primary-800 dark:text-primary-300 mb-2 uppercase tracking-wider text-sm">When to use it</h3>
            <p className="text-primary-900 dark:text-primary-200 text-sm">{topic.whenToUse}</p>
          </section>
          
          <section className="bg-red-50 dark:bg-red-900/10 rounded-xl p-5 border border-red-100 dark:border-red-900/30">
            <h3 className="font-bold text-red-800 dark:text-red-400 mb-2 uppercase tracking-wider text-sm">Common Mistakes</h3>
            <ul className="list-disc list-inside space-y-2 text-red-900 dark:text-red-300 text-sm">
              {topic.commonMistakes.map((mistake, i) => (
                <li key={i}>{mistake}</li>
              ))}
            </ul>
          </section>

          {topicFormulas.length > 0 && (
            <section className="bg-white dark:bg-dark-card rounded-xl border border-slate-200 dark:border-dark-border overflow-hidden shadow-sm">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-dark-border">
                Important Formulas
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {topicFormulas.map(f => (
                  <div key={f.id} className="p-4 flex flex-col gap-2 w-full max-w-full overflow-x-auto">
                    <MathRenderer math={f.expression} />
                    <span className="text-xs text-slate-500 text-center">{f.title}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
