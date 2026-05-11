import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { formulas } from '../data/formulas';
import { TopicCard, FormulaCard, ProgressCard } from '../components/ContentCards';
import { Clock, BrainCircuit, PlayCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState(0);
  const [completedPractice, setCompletedPractice] = useState(0);
  
  // Calculate exam countdown (placeholder: 3 days from now if not set)
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    // Check localStorage for progress
    let tCount = 0;
    let pCount = 0;
    
    topics.forEach(t => {
      if (localStorage.getItem(`topic-revised-${t.id}`) === 'true') tCount++;
      if (localStorage.getItem(`prac-done-${t.practiceQuestion.id}`) === 'true') pCount++;
    });
    
    setCompletedTopics(tCount);
    setCompletedPractice(pCount);

    // Mock exam date: Tomorrow 10 AM
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 1);
    examDate.setHours(10, 0, 0, 0);

    const updateTimer = () => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('Exam Started!');
        return;
      }
      const h = Math.floor((diff / (1000 * 60 * 60)));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${h}h ${m}m left`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const highPriorityTopics = topics.filter(t => t.priority === 'High').slice(0, 3);
  const quickFormulas = formulas.slice(0, 3); // Just grabbing first 3 for quick view

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to crush CA3?</h2>
          <p className="text-primary-100 mb-6 max-w-lg">Your exam is approaching fast. Review high-yield topics, practice targeted questions, and test your knowledge with AI generated quizzes.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/revision-plan')}
              className="bg-white text-primary-700 hover:bg-slate-50 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <PlayCircle size={20} /> Start 2-Hour Revision
            </button>
            <button 
              onClick={() => navigate('/quiz')}
              className="bg-primary-500 hover:bg-primary-400 text-white border border-primary-400/50 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <BrainCircuit size={20} /> Generate Quiz
            </button>
          </div>
        </div>
        
        {/* Countdown Badge */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-center hidden sm:block">
          <Clock size={24} className="mx-auto mb-1 text-white" />
          <div className="text-xs font-semibold uppercase tracking-wider text-primary-100 mb-1">Exam In</div>
          <div className="text-xl font-bold font-mono">{timeLeft}</div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressCard label="Topics Revised" value={completedTopics} total={topics.length} color="bg-primary-500" />
        <ProgressCard label="Practice Questions" value={completedPractice} total={topics.length} color="bg-green-500" />
      </div>

      {/* High Priority Topics */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">High Priority Topics</h3>
          <Link to="/practice" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">View All Topics</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highPriorityTopics.map(topic => (
            <TopicCard 
              key={topic.id}
              title={topic.title}
              priority={topic.priority}
              description={topic.conceptExplanation.substring(0, 80) + '...'}
              to={`/topic/${topic.id}`}
              onClick={() => navigate(`/topic/${topic.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Formulas */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Quick Formulas</h3>
          <Link to="/formulas" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">View Formula Sheet</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickFormulas.map(formula => (
            <FormulaCard 
              key={formula.id}
              title={formula.title}
              expression={formula.expression}
              explanation={formula.explanation}
              whenToUse={formula.whenToUse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
