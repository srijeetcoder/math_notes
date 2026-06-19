import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { formulas } from '../data/formulas';
import { MathRenderer, TextWithMath } from '../components/MathRenderer';
import { SolvedExample } from '../components/InteractiveLearning';
import { BinomialCalculator } from '../components/BinomialCalculator';
import { PMFCalculator, CDFBuilder } from '../components/Calculators';
import { CheckCircle, Circle, Eye, EyeOff, Info, Award, HelpCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { CopyButton } from '../components/ContentCards';

// Theorems Database
const topicTheorems: Record<string, { title: string; statement: string; proof: string; example: string }[]> = {
  'basic-probability': [
    {
      title: 'Addition Theorem (Inclusion-Exclusion)',
      statement: 'For any two events $A$ and $B$ in a probability space: \n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$',
      proof: 'Since $A \\cup B = A \\cup (B \\setminus (A \\cap B))$ where $A$ and $B \\setminus (A \\cap B)$ are mutually exclusive, by the countable additivity axiom:\n$$P(A \\cup B) = P(A) + P(B \\setminus (A \\cap B))$$\nAlso, since $B = (A \\cap B) \\cup (B \\setminus (A \\cap B))$ where they are mutually exclusive:\n$$P(B) = P(A \\cap B) + P(B \\setminus (A \\cap B)) \\implies P(B \\setminus (A \\cap B)) = P(B) - P(A \\cap B)$$\nSubstituting this back into the first equation yields:\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$',
      example: 'If $P(A) = 0.6$, $P(B) = 0.5$, and $P(A \\cap B) = 0.3$, then: \n$$P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8$$'
    },
    {
      title: "Boole's Inequality (Union Bound)",
      statement: 'For any countable sequence of events $A_1, A_2, \\dots$: \n$$P\\left(\\bigcup_{i=1}^n A_i\\right) \\le \\sum_{i=1}^n P(A_i)$$',
      proof: 'Let $B_1 = A_1$, and for $i \\ge 2$, let $B_i = A_i \\setminus \\bigcup_{j=1}^{i-1} A_j$. The events $B_i$ are pairwise disjoint and satisfy:\n$$\\bigcup_{i=1}^n A_i = \\bigcup_{i=1}^n B_i$$\nBy additivity:\n$$P\\left(\\bigcup_{i=1}^n A_i\\right) = \\sum_{i=1}^n P(B_i)$$\nSince $B_i \\subseteq A_i$, by monotonicity $P(B_i) \\le P(A_i)$. Therefore:\n$$P\\left(\\bigcup_{i=1}^n A_i\\right) \\le \\sum_{i=1}^n P(A_i)$$',
      example: 'If $P(A_1) = 0.2$ and $P(A_2) = 0.15$, the probability of their union is at most $0.35$.'
    }
  ],
  'conditional-probability': [
    {
      title: 'Multiplication Theorem',
      statement: 'For any two events $A$ and $B$:\n$$P(A \\cap B) = P(A)P(B|A) = P(B)P(A|B)$$',
      proof: 'By definition of conditional probability:\n$$P(B|A) = \\frac{P(A \\cap B)}{P(A)} \\quad (\\text{if } P(A) > 0)$$\nMultiplying both sides by $P(A)$ yields:\n$$P(A \\cap B) = P(A)P(B|A)$$\nSimilarly, using $P(A|B)$ yields the second equality.',
      example: 'Drawing two aces from a deck of cards without replacement:\n$$P(A_1 \\cap A_2) = P(A_1)P(A_2|A_1) = \\frac{4}{52} \\times \\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$$'
    }
  ],
  'bayes-theorem': [
    {
      title: "Bayes' Theorem",
      statement: 'Let $B_1, B_2, \\dots, B_n$ be a partition of sample space $\\Omega$. For any event $A$ with $P(A) > 0$:\n$$P(B_k|A) = \\frac{P(B_k)P(A|B_k)}{\\sum_{i=1}^n P(B_i)P(A|B_i)}$$',
      proof: 'By the definition of conditional probability:\n$$P(B_k|A) = \\frac{P(B_k \\cap A)}{P(A)}$$\nUsing the Multiplication Theorem: $P(B_k \\cap A) = P(B_k)P(A|B_k)$.\nUsing the Law of Total Probability: $P(A) = \\sum_{i=1}^n P(B_i)P(A|B_i)$.\nSubstituting these into the first equation yields Bayes\' formula.',
      example: 'A diagnostic test problem where a patient tests positive for a disease with 1% prevalence.'
    }
  ],
  'chebyshev-inequality': [
    {
      title: "Chebyshev's Inequality",
      statement: 'Let $X$ be a random variable with finite mean $\\mu$ and variance $\\sigma^2$. For any real $k > 0$:\n$$P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}$$',
      proof: 'For a continuous random variable $X$ with PDF $f(x)$:\n$$\\sigma^2 = \\int_{-\\infty}^{\\infty} (x-\\mu)^2 f(x) dx \\ge \\int_{|x-\\mu| \\ge k\\sigma} (x-\\mu)^2 f(x) dx$$\nFor all $x$ in the region of integration, $(x-\\mu)^2 \\ge k^2\\sigma^2$, so:\n$$\\sigma^2 \\ge k^2\\sigma^2 \\int_{|x-\\mu| \\ge k\\sigma} f(x) dx = k^2\\sigma^2 P(|X - \\mu| \\ge k\\sigma)$$\nDividing by $k^2\\sigma^2$ yields:\n$$P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}$$',
      example: 'The probability that a variable is more than 3 standard deviations away from its mean is at most $1/9 \\approx 11.1\\%$.'
    }
  ]
};

// Multi-Difficulty Practice Problems Database
const extraPracticeQuestions: Record<string, {
  easy: { text: string; solution: string };
  medium: { text: string; solution: string };
  hard: { text: string; solution: string };
}> = {
  'basic-probability': {
    easy: {
      text: 'A card is drawn from a standard pack of 52 cards. What is the probability that it is a spade?',
      solution: '\\text{Sample space } n(\\Omega) = 52. \\\\ \\text{Number of spades } n(A) = 13. \\\\ P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{13}{52} = \\frac{1}{4} = 0.25'
    },
    medium: {
      text: 'If two fair dice are rolled, find the probability that the sum of the numbers shown is a multiple of 3 or a multiple of 4.',
      solution: '\\text{Total outcomes } n(\\Omega) = 36. \\\\ \\text{Let } A = \\text{sum is multiple of 3, } B = \\text{sum is multiple of 4.} \\\\ A = \\{(1,2),(2,1),(1,5),(2,4),(3,3),(4,2),(5,1),(3,6),(4,5),(5,4),(6,3),(6,6)\\} \\Rightarrow n(A) = 12. \\\\ B = \\{(1,3),(2,2),(3,1),(2,6),(3,5),(4,4),(5,3),(6,2),(6,6)\\} \\Rightarrow n(B) = 9. \\\\ A \\cap B = \\{(6,6)\\} \\Rightarrow n(A \\cap B) = 1. \\\\ P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{12}{36} + \\frac{9}{36} - \\frac{1}{36} = \\frac{20}{36} = \\frac{5}{9} \\approx 0.5556'
    },
    hard: {
      text: 'If three cards are drawn at random from a 52-card deck, what is the probability that at least one is an ace?',
      solution: '\\text{We use the complement rule: } P(\\text{at least one Ace}) = 1 - P(\\text{no Aces}). \\\\ \\text{Total ways to choose 3 cards: } \\binom{52}{3} = \\frac{52 \\times 51 \\times 50}{3 \\times 2 \\times 1} = 22100. \\\\ \\text{Ways to choose 3 non-Aces (from 48 cards): } \\binom{48}{3} = \\frac{48 \\times 47 \\times 46}{6} = 17296. \\\\ P(\\text{no Aces}) = \\frac{17296}{22100} \\approx 0.7826. \\\\ P(\\text{at least one Ace}) = 1 - 0.7826 = 0.2174 \\quad (21.74\\%)'
    }
  },
  'conditional-probability': {
    easy: {
      text: 'A fair coin is tossed twice. Find the probability of getting two heads, given that the first toss is a head.',
      solution: '\\text{Sample space } \\Omega = \\{HH, HT, TH, TT\\}. \\\\ \\text{Let } A = \\text{two heads } \\{HH\\}, \\, B = \\text{first toss is head } \\{HH, HT\\}. \\\\ P(B) = 2/4 = 0.5, \\quad A \\cap B = \\{HH\\} \\Rightarrow P(A \\cap B) = 1/4 = 0.25. \\\\ P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.25}{0.50} = 0.5'
    },
    medium: {
      text: 'A box contains 5 red and 3 blue marbles. Two marbles are drawn one after the other without replacement. Find the probability that the second marble is blue, given that the first was red.',
      solution: '\\text{Let } R_1 = \\text{first marble is red, } B_2 = \\text{second marble is blue.} \\\\ \\text{Initially, total marbles = 8 (5 red, 3 blue).} \\\\ \\text{If the first marble is red, it is removed, leaving 7 marbles (4 red, 3 blue).} \\\\ P(B_2 | R_1) = \\frac{\\text{favorable outcomes}}{\\text{total remaining}} = \\frac{3}{7} \\approx 0.4286'
    },
    hard: {
      text: 'If $A$ and $B$ are independent events with $P(A) = 0.3$ and $P(B) = 0.4$. Find the probability that exactly one of them occurs.',
      solution: '\\text{We want to find } P((A \\cap B^c) \\cup (A^c \\cap B)). \\\\ \\text{Since the two events are mutually exclusive: } \\\\ P(\\text{exactly one}) = P(A \\cap B^c) + P(A^c \\cap B). \\\\ \\text{Since A and B are independent, their complements are also independent:} \\\\ P(A \\cap B^c) = P(A)P(B^c) = 0.3 \\times (1 - 0.4) = 0.3 \\times 0.6 = 0.18. \\\\ P(A^c \\cap B) = P(A^c)P(B) = (1 - 0.3) \\times 0.4 = 0.7 \\times 0.4 = 0.28. \\\\ P(\\text{exactly one}) = 0.18 + 0.28 = 0.46.'
    }
  },
  'bayes-theorem': {
    easy: {
      text: 'An insurance company claims that 30% of drivers are high-risk, and 70% are low-risk. The probability of an accident in a year is 0.15 for high-risk drivers and 0.05 for low-risk drivers. If a driver has an accident, what is the probability that they are high-risk?',
      solution: '\\text{Let } H = \\text{high-risk, } L = \\text{low-risk, } A = \\text{accident.} \\\\ P(H) = 0.30, \\quad P(L) = 0.70. \\\\ P(A|H) = 0.15, \\quad P(A|L) = 0.05. \\\\ P(A) = P(H)P(A|H) + P(L)P(A|L) = (0.30)(0.15) + (0.70)(0.05) = 0.045 + 0.035 = 0.080. \\\\ P(H|A) = \\frac{P(H)P(A|H)}{P(A)} = \\frac{0.045}{0.080} = 0.5625'
    },
    medium: {
      text: 'A disease affects 1% of a population. A diagnostic test is 99% accurate when the disease is present, but has a 2% false-positive rate. If a person tests positive, what is the probability they actually have the disease?',
      solution: '\\text{Let } D = \\text{has disease, } D\' = \\text{healthy, } T = \\text{tests positive.} \\\\ P(D) = 0.01 \\Rightarrow P(D\') = 0.99. \\\\ P(T|D) = 0.99 \\quad (\\text{sensitivity / true positive}). \\\\ P(T|D\') = 0.02 \\quad (\\text{false positive}). \\\\ \\text{By Law of Total Probability: } \\\\ P(T) = P(D)P(T|D) + P(D\')P(T|D\') = (0.01)(0.99) + (0.99)(0.02) = 0.0099 + 0.0198 = 0.0297. \\\\ \\text{By Bayes\' Theorem: } \\\\ P(D|T) = \\frac{P(D)P(T|D)}{P(T)} = \\frac{0.0099}{0.0297} = \\frac{1}{3} \\approx 0.3333'
    },
    hard: {
      text: 'Three boxes each have two drawers. Box 1 contains two gold coins, Box 2 contains two silver coins, and Box 3 contains one gold and one silver coin. A box is chosen at random and a drawer is opened to reveal a gold coin. What is the probability that the other drawer of this box also contains a gold coin?',
      solution: '\\text{Let } B_1, B_2, B_3 \\text{ be the events of choosing Box 1, 2, and 3. } P(B_1)=P(B_2)=P(B_3)=1/3. \\\\ \\text{Let } G = \\text{revealing a gold coin.} \\\\ P(G|B_1) = 1.0, \\quad P(G|B_2) = 0.0, \\quad P(G|B_3) = 0.5. \\\\ \\text{We want to find } P(B_1|G). \\\\ P(G) = P(B_1)P(G|B_1) + P(B_2)P(G|B_2) + P(B_3)P(G|B_3) \\\\ = (1/3)(1) + (1/3)(0) + (1/3)(0.5) = 1/2. \\\\ P(B_1|G) = \\frac{P(B_1)P(G|B_1)}{P(G)} = \\frac{(1/3)(1)}{1/2} = \\frac{2}{3} \\approx 0.6667'
    }
  }
};

const TheoremBox: React.FC<{ title: string; statement: string; proof: string; example: string }> = ({ 
  title, 
  statement, 
  proof, 
  example 
}) => {
  const [showProof, setShowProof] = useState(false);
  const [showExample, setShowExample] = useState(false);
  
  return (
    <div className="bg-white dark:bg-[#0f1b2e] rounded-2xl border border-zinc-200 dark:border-[#1e293b] p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-[#4f46e5] dark:bg-violet-950/40 dark:text-violet-400 border border-indigo-150 dark:border-violet-850 px-2 py-0.5 rounded">
          Theorem
        </span>
        <h4 className="font-extrabold text-[#0f172a] dark:text-[#f8fafc] text-sm tracking-wide uppercase">{title}</h4>
      </div>
      <div className="text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed mb-4">
        <TextWithMath text={statement} />
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setShowProof(!showProof)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] hover:underline cursor-pointer"
        >
          {showProof ? <EyeOff size={14} /> : <Eye size={14} />}
          {showProof ? 'Hide Proof' : 'View Proof'}
        </button>
        <button 
          onClick={() => setShowExample(!showExample)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] hover:underline cursor-pointer"
        >
          {showExample ? <EyeOff size={14} /> : <Eye size={14} />}
          {showExample ? 'Hide Example' : 'View Example'}
        </button>
      </div>
      
      {showProof && (
        <div className="mt-4 pt-4 border-t border-zinc-150 dark:border-[#1e293b]/50 animate-in fade-in duration-300">
          <h5 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <Award size={12} /> Mathematical Proof
          </h5>
          <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl text-sm leading-relaxed border border-zinc-200 dark:border-[#1e293b] font-serif">
            <TextWithMath text={proof} />
          </div>
        </div>
      )}
      
      {showExample && (
        <div className="mt-4 pt-4 border-t border-zinc-150 dark:border-[#1e293b]/50 animate-in fade-in duration-300">
          <h5 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1">
            <BookOpen size={12} /> Verification Example
          </h5>
          <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl text-sm leading-relaxed border border-zinc-200 dark:border-[#1e293b] font-serif">
            <TextWithMath text={example} />
          </div>
        </div>
      )}
    </div>
  );
};

const TopicPageContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const topic = topics.find(t => t.id === id);
  const topicFormulas = formulas.filter(f => f.topicId === id);
  
  const [isRevised, setIsRevised] = useState(() => {
    if (!id) return false;
    return localStorage.getItem(`topic-revised-${id}`) === 'true';
  });

  const [practiceDiff, setPracticeDiff] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showSolution, setShowSolution] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(() => {
    if (!topic) return false;
    const key = `prac-done-${topic.id}-${practiceDiff}`;
    return localStorage.getItem(key) === 'true';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update complete state when diff changes
  useEffect(() => {
    if (topic) {
      const key = `prac-done-${topic.id}-${practiceDiff}`;
      setIsCompletedState(localStorage.getItem(key) === 'true');
      setShowSolution(false);
    }
  }, [practiceDiff, id, topic]);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const toggleRevised = () => {
    const newVal = !isRevised;
    setIsRevised(newVal);
    localStorage.setItem(`topic-revised-${topic.id}`, String(newVal));
  };

  const togglePracCompleted = () => {
    const newVal = !isCompletedState;
    setIsCompletedState(newVal);
    localStorage.setItem(`prac-done-${topic.id}-${practiceDiff}`, String(newVal));
  };

  // Get active practice question details
  const getPracticeQuestion = () => {
    const set = extraPracticeQuestions[topic.id];
    if (set) {
      return set[practiceDiff];
    }
    // Fallback to topic default
    return {
      text: topic.practiceQuestion.text,
      solution: topic.practiceQuestion.solution
    };
  };

  const activeQuestion = getPracticeQuestion();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Top conceptual introduction header */}
      <div className="bg-white dark:bg-[#0f1b2e] border border-zinc-200 dark:border-[#1e293b] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/5 dark:bg-[#22d3ee]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-[#475569] dark:text-[#94a3b8] border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-full shadow-sm">
              Study Lecture
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
              topic.priority === 'High' 
                ? 'bg-red-500/10 text-red-650 dark:text-red-400 border-red-500/10' 
                : topic.priority === 'Medium' 
                  ? 'bg-amber-500/10 text-amber-600 dark:text-[#f59e0b] border-amber-500/10' 
                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border-emerald-500/10'
            }`}>
              {topic.priority} Priority
            </span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0f172a] dark:text-[#f8fafc]">{topic.title}</h1>
            <div className="text-sm md:text-base text-[#475569] dark:text-[#94a3b8] mt-3 leading-relaxed">
              <TextWithMath text={topic.conceptExplanation} />
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleRevised}
          className={`shrink-0 z-10 px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs shadow-sm cursor-pointer border ${
            isRevised 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
              : 'bg-zinc-900 text-white dark:bg-white dark:text-[#07111f] border-zinc-900 dark:border-white hover:opacity-90'
          }`}
        >
          <CheckCircle size={16} />
          {isRevised ? 'Marked as Revised' : 'Mark as Revised'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Theorems Section */}
          {topicTheorems[topic.id] && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] tracking-wide uppercase flex items-center gap-2">
                Core Theorems & Laws
              </h2>
              {topicTheorems[topic.id].map((theorem, idx) => (
                <TheoremBox 
                  key={idx}
                  title={theorem.title}
                  statement={theorem.statement}
                  proof={theorem.proof}
                  example={theorem.example}
                />
              ))}
            </section>
          )}

          {/* Step by Step Guide */}
          <section className="bg-white dark:bg-[#0f1b2e] rounded-2xl p-6 border border-zinc-200 dark:border-[#1e293b] shadow-sm">
            <h2 className="text-lg font-black mb-4 text-[#0f172a] dark:text-[#f8fafc] border-b border-zinc-100 dark:border-[#1e293b]/50 pb-2 flex items-center gap-1.5 uppercase tracking-wide">
              Step-by-Step Method
            </h2>
            <ol className="list-decimal list-inside space-y-3.5 text-[#475569] dark:text-[#94a3b8] text-sm">
              {topic.stepByStepMethod.map((step, i) => (
                <li key={i} className="pl-1 leading-relaxed"><TextWithMath text={step} /></li>
              ))}
            </ol>
          </section>

          {/* Solved Examples */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] uppercase tracking-wide flex items-center gap-2">
              Solved Examples
            </h2>
            {topic.solvedExamples.map((ex, i) => (
              <SolvedExample key={i} title={ex.title} problem={ex.problem} solution={ex.solution} />
            ))}
          </section>

          {/* Upgraded Practice Section */}
          <section className="bg-white dark:bg-[#0f1b2e] rounded-2xl border border-zinc-200 dark:border-[#1e293b] overflow-hidden shadow-sm">
            <div className="bg-zinc-50 dark:bg-[#0f1b2e]/60 px-6 py-4 border-b border-zinc-200 dark:border-[#1e293b] flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-base font-black text-[#0f172a] dark:text-[#f8fafc] uppercase tracking-wide flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600 dark:text-[#22d3ee]" /> Practice Sandbox
              </h2>
              {/* Difficulty Tabs */}
              <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setPracticeDiff(diff)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                      practiceDiff === diff
                        ? 'bg-white dark:bg-[#0f1b2e] text-[#0f172a] dark:text-[#22d3ee] shadow-sm border border-zinc-200/50 dark:border-[#1e293b]/50'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-[#f8fafc]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4 items-start">
                {/* Completion Check Circle */}
                <button 
                  onClick={togglePracCompleted}
                  className={`mt-1 flex-shrink-0 transition-colors cursor-pointer ${
                    isCompletedState 
                      ? 'text-emerald-500' 
                      : 'text-zinc-300 hover:text-zinc-400 dark:text-zinc-700 dark:hover:text-zinc-650'
                  }`}
                  title={isCompletedState ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isCompletedState ? <CheckCircle size={24} /> : <Circle size={24} />}
                </button>
                
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    Difficulty level: 
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      practiceDiff === 'hard' 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10' 
                        : practiceDiff === 'medium'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-[#f59e0b] border-amber-500/10'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10'
                    }`}>
                      {practiceDiff}
                    </span>
                  </div>
                  <div className="text-sm text-[#0f172a] dark:text-[#f8fafc] leading-relaxed font-semibold">
                    <TextWithMath text={activeQuestion.text} />
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => setShowSolution(!showSolution)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#4f46e5] dark:text-[#22d3ee] hover:underline cursor-pointer"
                    >
                      {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
                      {showSolution ? 'Hide Solution' : 'Check Answer & Steps'}
                    </button>
                  </div>
                  
                  {showSolution && (
                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-[#1e293b]/50 animate-in fade-in duration-300">
                      <h5 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase mb-2">Calculus Breakdown</h5>
                      <div className="bg-zinc-50 dark:bg-zinc-950/70 p-4 rounded-xl text-sm leading-relaxed border border-zinc-200 dark:border-[#1e293b] font-mono overflow-x-auto">
                        <MathRenderer math={activeQuestion.solution} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Calculators rendered for specific subtopics */}
          {topic.id === 'binomial' && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] uppercase tracking-wide flex items-center gap-2">
                Binomial Calculator
              </h2>
              <BinomialCalculator />
            </section>
          )}

          {topic.id === 'pmf-pdf-cdf' && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] uppercase tracking-wide flex items-center gap-2">
                CDF Visual Builder
              </h2>
              <CDFBuilder />
            </section>
          )}

          {topic.id === 'expectation-variance' && (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#0f172a] dark:text-[#f8fafc] uppercase tracking-wide flex items-center gap-2">
                PMF & Expectation Sandbox
              </h2>
              <PMFCalculator />
            </section>
          )}

        </div>
        
        {/* Right Sidebar Columns */}
        <div className="space-y-6">
          
          {/* Quick Info Box */}
          <section className="bg-indigo-50/50 dark:bg-[#0f1b2e]/60 rounded-2xl p-5 border border-indigo-100/50 dark:border-[#1e293b] shadow-sm">
            <h3 className="font-extrabold text-[#4f46e5] dark:text-[#22d3ee] mb-2 uppercase tracking-widest text-xs flex items-center gap-1">
              <Info size={14} /> When to use it
            </h3>
            <p className="text-[#475569] dark:text-[#94a3b8] text-sm leading-relaxed font-medium">{topic.whenToUse}</p>
          </section>
          
          {/* Common Mistakes */}
          <section className="bg-red-50/50 dark:bg-red-950/10 rounded-2xl p-5 border border-red-100/30 dark:border-red-950/20">
            <h3 className="font-extrabold text-red-700 dark:text-red-400 mb-3 uppercase tracking-widest text-xs flex items-center gap-1">
              <AlertTriangle size={14} /> Common Pitfalls
            </h3>
            <ul className="space-y-3.5">
              {topic.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-sm text-[#475569] dark:text-[#94a3b8] leading-relaxed flex items-start gap-2">
                  <span className="text-red-500 mt-1 shrink-0">•</span>
                  <span><TextWithMath text={mistake} /></span>
                </li>
              ))}
            </ul>
          </section>

          {/* Formulas List for Topic */}
          {topicFormulas.length > 0 && (
            <section className="bg-white dark:bg-[#0f1b2e] rounded-2xl border border-zinc-200 dark:border-[#1e293b] overflow-hidden shadow-sm">
              <div className="bg-zinc-50 dark:bg-[#0f1b2e]/60 px-5 py-3.5 font-bold text-sm text-[#0f172a] dark:text-[#f8fafc] border-b border-zinc-200 dark:border-[#1e293b] uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen size={16} className="text-indigo-600 dark:text-[#22d3ee]" /> Essential Cheat Sheet
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-[#1e293b]/50">
                {topicFormulas.map(f => (
                  <div key={f.id} className="p-5 flex flex-col gap-3 relative group/formula">
                    <div className="absolute top-3 right-3 opacity-0 group-hover/formula:opacity-100 transition-opacity">
                      <CopyButton text={f.expression} />
                    </div>
                    <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-center border border-zinc-200 dark:border-zinc-900 overflow-x-auto w-full">
                      <MathRenderer math={f.expression} className="text-[#22d3ee] font-mono" />
                    </div>
                    <span className="text-xs font-bold text-[#475569] dark:text-[#94a3b8] text-center">{f.title}</span>
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

export const TopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <TopicPageContent key={id} />;
};
