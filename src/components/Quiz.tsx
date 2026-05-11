import React, { useState } from 'react';
import { generateQuiz, type QuizResultData } from '../services/gemini';
import { TextWithMath } from './MathRenderer';
import { Loader2, Copy, Download, RefreshCw, AlertCircle } from 'lucide-react';

export const QuizGenerator: React.FC<{ onQuizGenerated: (quiz: QuizResultData) => void }> = ({ onQuizGenerated }) => {
  const [topic, setTopic] = useState('Basic probability');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(3);
  const [type, setType] = useState('MCQ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const quiz = await generateQuiz(topic, difficulty, count, type);
      onQuizGenerated(quiz);
    } catch (err: any) {
      setError(err.message || 'Failed to generate quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-200 dark:border-dark-border shadow-sm">
      <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        Generate AI Quiz
        <span className="bg-accent-bg text-accent border border-accent-border text-xs px-2 py-0.5 rounded-full">Beta</span>
      </h3>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/30 flex items-start gap-3 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Topic</label>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-2.5 border border-slate-300 dark:border-dark-border rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow">
            <option value="Basic probability">Basic probability</option>
            <option value="Conditional probability">Conditional probability</option>
            <option value="Bayes theorem">Bayes theorem</option>
            <option value="PMF, PDF, CDF">PMF, PDF, CDF</option>
            <option value="Expectation and Variance">Expectation and Variance</option>
            <option value="Binomial distribution">Binomial distribution</option>
            <option value="Correlation coefficient">Correlation coefficient</option>
            <option value="Regression lines">Regression lines</option>
            <option value="Spearman rank correlation">Spearman rank correlation</option>
            <option value="Mixed all topics">Mixed all topics</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full p-2.5 border border-slate-300 dark:border-dark-border rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Number of Questions</label>
          <input type="number" min="1" max="10" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2.5 border border-slate-300 dark:border-dark-border rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Question Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2.5 border border-slate-300 dark:border-dark-border rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-shadow">
            <option value="MCQ">MCQ (Multiple Choice)</option>
            <option value="Short Answer">Short Answer</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : <BrainCircuitIcon />}
        {loading ? 'Generating Unique Questions...' : 'Generate Quiz'}
      </button>
    </div>
  );
};

const BrainCircuitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-5.224 4.668A4 4 0 0 0 4.907 18h14.186a4 4 0 0 0 4.125-5.207 4 4 0 0 0-5.224-4.668A3 3 0 1 0 12 5Z"/><path d="M8.5 12h7"/><path d="M12 8.5v7"/></svg>
);

  export const QuizResult: React.FC<{ quiz: QuizResultData; onRegenerate: () => void }> = ({ quiz, onRegenerate }) => {
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const toggleSolution = (id: number) => {
    setShowSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectOption = (questionId: number, option: string) => {
    if (showSolutions[questionId]) return; // prevent changing answer after checking
    setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
  };

  const copyToClipboard = () => {
    const text = quiz.questions.map((q, i) => `
Q${i+1}: ${q.question}
${q.options ? q.options.map(o => `- ${o}`).join('\n') : ''}
Answer: ${q.answer}
Solution: ${q.solution.join(' \n ')}
`).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const downloadText = () => {
    const text = quiz.questions.map((q, i) => `Q${i+1}: ${q.question}\n${q.options ? q.options.map(o => `- ${o}`).join('\n') + '\n' : ''}Answer: ${q.answer}\nSolution:\n${q.solution.join('\n')}`).join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${quiz.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const score = quiz.questions.reduce((acc, q) => acc + (showSolutions[q.id] && selectedOptions[q.id] === q.answer ? 1 : 0), 0);
  const totalAnswered = Object.keys(showSolutions).filter(id => showSolutions[Number(id)]).length;
  const allAnswered = totalAnswered === quiz.questions.length;

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{quiz.title}</h2>
          {totalAnswered > 0 && (
            <p className={`mt-2 font-medium ${allAnswered ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400'}`}>
              Score: {score} / {totalAnswered} {allAnswered && '🎉'}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyToClipboard} className="p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Copy text"><Copy size={18} /></button>
          <button onClick={downloadText} className="p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Download text"><Download size={18} /></button>
          <button onClick={onRegenerate} className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors">
            <RefreshCw size={16} /> Regenerate
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, index) => {
          const isRevealed = showSolutions[q.id];
          const selected = selectedOptions[q.id];
          
          return (
          <div key={q.id} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3 gap-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded">Q{index + 1}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${q.difficulty === 'Hard' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                  {q.difficulty}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">{q.topic}</span>
              </div>
            </div>
            
            <div className="text-slate-800 dark:text-slate-200 mb-5 text-lg">
              <TextWithMath text={q.question} />
            </div>

            {q.options && q.options.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {q.options.map((opt, i) => {
                  const isSelected = selected === opt;
                  const isCorrect = opt === q.answer;
                  
                  let btnClass = "p-4 border rounded-xl text-left transition-all duration-200 focus:outline-none ";
                  
                  if (isRevealed) {
                    if (isCorrect) {
                      btnClass += "bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300 shadow-[0_0_0_1px_rgba(34,197,94,1)]";
                    } else if (isSelected && !isCorrect) {
                      btnClass += "bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300 shadow-[0_0_0_1px_rgba(239,68,68,1)] opacity-80";
                    } else {
                      btnClass += "border-slate-200 bg-slate-50/50 text-slate-500 dark:border-slate-700 dark:bg-slate-800/30 dark:text-slate-400 opacity-60";
                    }
                  } else {
                    if (isSelected) {
                      btnClass += "bg-teal-50 border-teal-500 text-teal-900 dark:bg-teal-900/20 dark:border-teal-500 dark:text-teal-300 shadow-[0_0_0_1px_rgba(20,184,166,1)]";
                    } else {
                      btnClass += "border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-dark-card dark:hover:border-teal-700/50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300";
                    }
                  }

                  return (
                    <button 
                      key={i} 
                      onClick={() => selectOption(q.id, opt)}
                      disabled={isRevealed}
                      className={btnClass}
                    >
                      <TextWithMath text={opt} />
                    </button>
                  );
                })}
              </div>
            )}

            <button 
              onClick={() => toggleSolution(q.id)}
              disabled={!selected && (q.options?.length ?? 0) > 0 && !isRevealed}
              className={`text-sm font-medium focus:outline-none px-4 py-2 rounded-lg transition-colors ${!selected && (q.options?.length ?? 0) > 0 && !isRevealed ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500' : 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:hover:bg-teal-900/50'}`}
            >
              {isRevealed ? 'Hide Answer & Solution' : 'Check Answer'}
            </button>

            {showSolutions[q.id] && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-300">
                <div className="mb-3 font-semibold text-slate-800 dark:text-slate-200">
                  Answer: <span className="text-green-600 dark:text-green-400"><TextWithMath text={q.answer} /></span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-slate-700 dark:text-slate-300 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Step-by-step Solution:</h5>
                  {q.solution.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-400 dark:text-slate-500 select-none">{i+1}.</span>
                      <TextWithMath text={step} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
};
